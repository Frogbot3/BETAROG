"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import {
  budgetRanges,
  contactSchema,
  projectTypes,
  type ContactInput,
} from "@/lib/contact-schema";
import { services } from "@/lib/content";
import { Turnstile } from "./turnstile";
export function ContactForm({
  configured,
  initialService,
}: {
  configured: boolean;
  initialService?: string;
}) {
  const [status, setStatus] = useState<{
    kind: "error" | "success";
    message: string;
    reference?: string;
  } | null>(null);
  const [tokenVersion, setTokenVersion] = useState(0);
  const reference = useRef("");
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: services.find((service) => service.id === initialService)
        ?.title as ContactInput["projectType"] | undefined,
      budget: "Let’s discuss",
      message: "",
      consent: false,
      website: "",
      turnstileToken: "",
      startedAt: 0,
      submissionId: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;
  useEffect(() => {
    reference.current = crypto.randomUUID();
    setValue("submissionId", reference.current);
    setValue("startedAt", Date.now());
  }, [setValue]);
  const onToken = useCallback(
    (token: string) => setValue("turnstileToken", token),
    [setValue],
  );
  async function submit(values: ContactInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(30_000),
      });
      const result = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      if (!response.ok) {
        if (result.errors)
          for (const [key, messages] of Object.entries(result.errors))
            form.setError(key as keyof ContactInput, { message: messages[0] });
        setStatus({
          kind: "error",
          message:
            result.message || "Your inquiry was not sent. Please try again.",
        });
      } else {
        setStatus({
          kind: "success",
          message: result.message || "Your inquiry was accepted for delivery.",
          reference: values.submissionId.slice(0, 8).toUpperCase(),
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not confirm delivery. Please check your connection and try again. Your text is still here.",
      });
    } finally {
      setValue("turnstileToken", "");
      setTokenVersion((version) => version + 1);
    }
  }
  if (status?.kind === "success")
    return (
      <div className="contact-success" role="status">
        <CheckCircle2 size={42} />
        <h3>A new conversation begins.</h3>
        <p>{status.message}</p>
        <p className="mono">Reference: {status.reference}</p>
        <button
          className="button button-outline"
          onClick={() => {
            form.reset();
            reference.current = crypto.randomUUID();
            setValue("submissionId", reference.current);
            setValue("startedAt", Date.now());
            setStatus(null);
          }}
        >
          Start another inquiry
          <ArrowUpRight size={18} />
        </button>
      </div>
    );
  const error = (field: keyof ContactInput) =>
    errors[field] ? (
      <span className="field-error" id={`${field}-error`}>
        {errors[field]?.message}
      </span>
    ) : null;
  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit(submit)}
      aria-label="Project inquiry"
    >
      {!configured && (
        <p className="form-notice" role="note">
          Inquiry delivery is not connected yet. Nothing will be sent.
        </p>
      )}
      <div className="form-row">
        <label htmlFor="name">
          Your name
          <input
            id="name"
            autoComplete="name"
            placeholder="What should we call you?"
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {error("name")}
        </label>
        <label htmlFor="email">
          Email address
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {error("email")}
        </label>
      </div>
      <div className="form-row">
        <label htmlFor="projectType">
          Project type
          <select
            id="projectType"
            aria-invalid={!!errors.projectType}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            {...register("projectType")}
          >
            <option value="">What are we building?</option>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {error("projectType")}
        </label>
        <label htmlFor="budget">
          Budget range
          <select id="budget" {...register("budget")}>
            {budgetRanges.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
          {error("budget")}
        </label>
      </div>
      <label htmlFor="message">
        Tell us about your idea
        <textarea
          id="message"
          rows={5}
          placeholder="The idea, the challenge, the possibilities…"
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {error("message")}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">
          Website
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>
      <label className="consent-label">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          {...register("consent")}
        />
        <span>
          I’ve read the <Link href="/privacy">privacy notice</Link> and
          understand how my inquiry is handled.
        </span>
      </label>
      {error("consent")}
      {configured && <Turnstile key={tokenVersion} onToken={onToken} />}
      {status?.kind === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}
      <button
        className="button button-primary submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            Submitting inquiry
            <LoaderCircle className="spinner" size={18} />
          </>
        ) : (
          <>
            Send inquiry
            <ArrowUpRight size={20} />
          </>
        )}
      </button>
      <noscript>
        <p>
          This form requires JavaScript to validate and submit your inquiry.
        </p>
      </noscript>
    </form>
  );
}
