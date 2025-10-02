// src/components/WaitlistForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(7, "Phone is required"),
  consent: z.boolean().refine((v) => v === true, "Consent is required"),
});

type FormValues = z.infer<typeof schema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkwzdzn"; // ← your endpoint

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", fullName: "", phone: "", consent: false },
  });

  async function onSubmit(values: FormValues) {
    const body = new FormData();
    body.set("email", values.email);
    body.set("fullName", values.fullName);
    body.set("phone", values.phone);
    body.set("consent", String(values.consent));
    // optional extras Formspree will store:
    body.set("_subject", "CTG Waitlist Signup");
    // body.set("_redirect", "https://waitlist.cloudtopg.store/thank-you"); // if you have a thank-you page

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Honeypot to reduce spam */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} name="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} name="fullName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} name="phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  name="consent"
                  className="mt-1"
                />
                <FormLabel htmlFor="consent" className="font-normal">
                  I agree to receive emails about Cloud Top G admissions, assessments, and program updates. *
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Join Waitlist →</Button>

        {status === "ok" && <p className="text-green-600 text-sm">Thanks! You’re on the waitlist.</p>}
        {status === "error" && <p className="text-red-600 text-sm">Submission failed. Please try again.</p>}
      </form>
    </Form>
  );
}
