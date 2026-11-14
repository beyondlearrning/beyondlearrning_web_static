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
  "mt-2 w-full border border-border bg-surface px-4 py-3 text-sm text-brand outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const labelClass = "text-xs font-semibold tracking-[0.18em] text-muted uppercase";

export function ClatLiveForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [mockScore, setMockScore] = useState<MockScoreValue | "">("");
  const [question, setQuestion] = useState<QuestionValue | "">("");
  const [questionOther, setQuestionOther] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !whatsapp.trim() || !city.trim() || !mockScore || !question) {
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
        whatsapp: whatsapp.trim(),
        city: city.trim(),
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
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="clat-whatsapp" className={labelClass}>
          WhatsApp number
        </label>
        <input
          id="clat-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="10-digit mobile number"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="clat-city" className={labelClass}>
          City
        </label>
        <input
          id="clat-city"
          name="city"
          autoComplete="address-level2"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className={fieldClass}
          required
        />
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
          className={cn(fieldClass, "appearance-none bg-[length:1rem] pr-10")}
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
              className={cn(fieldClass, "resize-y")}
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
