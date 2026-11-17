"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  clatLive,
  mockScoreOptions,
  questionOptions,
  type MockScoreValue,
  type QuestionValue,
} from "@/content/clat-live";
import { submitClatRegistration } from "@/lib/clat-live-api";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-2 w-full border bg-surface px-4 py-3 text-sm text-brand outline-none transition-colors placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const labelClass = "text-xs font-semibold tracking-[0.18em] text-muted uppercase";

const countryCodes = [
  { value: "91", label: "+91 India" },
  { value: "971", label: "+971 UAE" },
  { value: "977", label: "+977 Nepal" },
  { value: "1", label: "+1 US/CA" },
  { value: "44", label: "+44 UK" },
] as const;

type CountryCode = (typeof countryCodes)[number]["value"];

function digitsOnlyMax10(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 10);
}

function isValidLocalMobile(countryCode: CountryCode, mobile: string): boolean {
  if (mobile.length !== 10) return false;
  if (countryCode === "91") return /^[6-9]\d{9}$/.test(mobile);
  return /^\d{10}$/.test(mobile);
}

function isValidEmail(value: string): boolean {
  if (value.length < 5 || value.length > 200) return false;
  if (value.includes("..") || value.includes(" ")) return false;
  return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(
    value,
  );
}

type FieldErrors = {
  whatsapp?: string;
  email?: string;
};

export function ClatLiveForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("91");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [mockScore, setMockScore] = useState<MockScoreValue | "">("");
  const [question, setQuestion] = useState<QuestionValue | "">("");
  const [questionOther, setQuestionOther] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const mobile = digitsOnlyMax10(whatsapp);
    const nextFieldErrors: FieldErrors = {};

    if (!isValidLocalMobile(countryCode, mobile)) {
      nextFieldErrors.whatsapp =
        countryCode === "91"
          ? "Enter a valid 10-digit Indian mobile number (starts with 6–9)."
          : "Enter a valid 10-digit mobile number.";
    }
    if (!trimmedEmail) {
      nextFieldErrors.email = "Email is required.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextFieldErrors.email = "Enter a valid email address (e.g. name@gmail.com).";
    }

    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      setError("Please fix the highlighted fields.");
      return;
    }
    if (!name.trim() || !mockScore || !question) {
      setError("Please fill in every field.");
      return;
    }
    if (question === "other" && !questionOther.trim()) {
      setError("Please write your question, or pick one of the options.");
      return;
    }

    setPending(true);
    try {
      await submitClatRegistration({
        name: name.trim(),
        whatsapp: `+${countryCode}${mobile}`,
        email: trimmedEmail.toLowerCase(),
        mockScore,
        question,
        questionOther: question === "other" ? questionOther.trim() : "",
      });
      router.push("/clat-live/thanks");
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="clat-name" className={labelClass}>
          Name
        </label>
        <input
          id="clat-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={cn(fieldClass, "border-border focus:border-accent")}
          required
        />
      </div>

      <div>
        <label htmlFor="clat-whatsapp" className={labelClass}>
          WhatsApp number
        </label>
        <div className="mt-2 flex gap-2">
          <label className="sr-only" htmlFor="clat-country-code">
            Country code
          </label>
          <select
            id="clat-country-code"
            name="countryCode"
            value={countryCode}
            onChange={(event) =>
              setCountryCode(event.target.value as CountryCode)
            }
            className={cn(
              "w-[8.5rem] shrink-0 border bg-surface px-2 py-3 text-sm text-brand outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              fieldErrors.whatsapp
                ? "border-red-700"
                : "border-border focus:border-accent",
            )}
          >
            {countryCodes.map((code) => (
              <option key={code.value} value={code.value}>
                {code.label}
              </option>
            ))}
          </select>
          <input
            id="clat-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="10-digit number"
            maxLength={10}
            value={whatsapp}
            onChange={(event) => {
              setWhatsapp(digitsOnlyMax10(event.target.value));
              if (fieldErrors.whatsapp) {
                setFieldErrors((current) => ({
                  ...current,
                  whatsapp: undefined,
                }));
              }
            }}
            aria-invalid={Boolean(fieldErrors.whatsapp)}
            aria-describedby={
              fieldErrors.whatsapp ? "clat-whatsapp-error" : "clat-whatsapp-help"
            }
            className={cn(
              "min-w-0 flex-1 border bg-surface px-4 py-3 text-sm text-brand outline-none transition-colors placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              fieldErrors.whatsapp
                ? "border-red-700 focus:border-red-700"
                : "border-border focus:border-accent",
            )}
            required
          />
        </div>
        {fieldErrors.whatsapp ? (
          <p id="clat-whatsapp-error" className="mt-2 text-sm text-red-800" role="alert">
            {fieldErrors.whatsapp}
          </p>
        ) : (
          <p id="clat-whatsapp-help" className="mt-2 text-xs text-muted">
            Exactly 10 digits. Country code is selected separately.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="clat-email" className={labelClass}>
          Email
        </label>
        <input
          id="clat-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (fieldErrors.email) {
              setFieldErrors((current) => ({ ...current, email: undefined }));
            }
          }}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "clat-email-error" : undefined}
          className={cn(
            fieldClass,
            fieldErrors.email
              ? "border-red-700 focus:border-red-700"
              : "border-border focus:border-accent",
          )}
          required
        />
        {fieldErrors.email ? (
          <p id="clat-email-error" className="mt-2 text-sm text-red-800" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="clat-mock" className={labelClass}>
          Your latest mock score
        </label>
        <select
          id="clat-mock"
          name="mockScore"
          value={mockScore}
          onChange={(event) =>
            setMockScore(event.target.value as MockScoreValue | "")
          }
          className={cn(
            fieldClass,
            "appearance-none border-border bg-[length:1rem] pr-10 focus:border-accent",
          )}
          required
        >
          <option value="" disabled>
            Select a range
          </option>
          {mockScoreOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelClass}>
          Your biggest question before CLAT
        </legend>
        <div className="mt-3 space-y-2">
          {questionOptions.map((option) => {
            const selected = question === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 border px-4 py-3 text-sm transition-colors",
                  selected
                    ? "border-accent bg-accent/10 text-brand"
                    : "border-border bg-surface text-brand/90 hover:border-brand/25",
                )}
              >
                <input
                  type="radio"
                  name="question"
                  value={option.value}
                  checked={selected}
                  onChange={() => setQuestion(option.value)}
                  className="mt-1 size-4 accent-brand"
                  required
                />
                <span className="leading-snug">{option.label}</span>
              </label>
            );
          })}
        </div>
        {question === "other" ? (
          <div className="mt-3">
            <label htmlFor="clat-question-other" className="sr-only">
              Your question
            </label>
            <textarea
              id="clat-question-other"
              name="questionOther"
              rows={3}
              value={questionOther}
              onChange={(event) => setQuestionOther(event.target.value)}
              placeholder="Type your question here"
              className={cn(
                fieldClass,
                "resize-y border-border focus:border-accent",
              )}
              required
            />
          </div>
        ) : null}
      </fieldset>

      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center bg-brand px-6 py-3.5 text-sm font-medium tracking-wide text-background transition-colors hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Saving…" : clatLive.submitLabel}
      </button>
    </form>
  );
}
