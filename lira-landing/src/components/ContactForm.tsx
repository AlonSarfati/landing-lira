import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type FormStatus = "idle" | "sending" | "sent" | "error";

const emailConfig = {
  serviceId: "service_3aish2d",
  templateId: "template_pduuduo",
  publicKey: "PA6ywWxNZCJrOZDhn",
};

const submissionLimits = {
  maxPerWindow: 3,
  windowMs: 24 * 60 * 60 * 1000,
  cooldownMs: 60 * 1000,
  storageKey: "lira-contact-submissions",
};

const inputClass =
  "border border-white/10 bg-[#063443] px-4 py-3 text-white outline-none transition placeholder:text-[#8dd5df]/45 focus:border-[#62c7b2]";

function getRecentSubmissions() {
  try {
    const raw = window.localStorage.getItem(submissionLimits.storageKey);
    if (!raw) return [];

    const values = JSON.parse(raw);
    if (!Array.isArray(values)) return [];

    const now = Date.now();
    return values
      .filter((value): value is number => typeof value === "number")
      .filter((timestamp) => now - timestamp < submissionLimits.windowMs);
  } catch {
    return [];
  }
}

function saveRecentSubmissions(submissions: number[]) {
  window.localStorage.setItem(
    submissionLimits.storageKey,
    JSON.stringify(submissions),
  );
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [limitMessage, setLimitMessage] = useState("");

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const now = Date.now();
    const submissions = getRecentSubmissions();
    const lastSubmission = submissions.at(-1);

    if (
      lastSubmission &&
      now - lastSubmission < submissionLimits.cooldownMs
    ) {
      setLimitMessage("Please wait a minute before sending another request.");
      return;
    }

    if (submissions.length >= submissionLimits.maxPerWindow) {
      setLimitMessage(
        "Request limit reached for this browser. Please try again tomorrow.",
      );
      return;
    }

    setLimitMessage("");
    setStatus("sending");

    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        formRef.current,
        {
          publicKey: emailConfig.publicKey,
        },
      );
      setStatus("sent");
      saveRecentSubmissions([...submissions, now]);
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="border border-white/10 bg-[#052f3d] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.18)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-[#d8f0f2]">
          Name
          <input name="name" placeholder="Your name" className={inputClass} required />
        </label>
        <label className="grid gap-2 text-sm text-[#d8f0f2]">
          Work email
          <input
            type="email"
            name="reply_to"
            placeholder="you@company.com"
            className={inputClass}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-[#d8f0f2]">
          Company <span className="text-[#8dd5df]/70">(optional)</span>
          <input name="company" placeholder="Company name" className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm text-[#d8f0f2]">
          Team size
          <select name="team_size" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select range
            </option>
            <option>1-50 employees</option>
            <option>51-250 employees</option>
            <option>251-1,000 employees</option>
            <option>1,000+ employees</option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-[#d8f0f2]">
        What do you want to understand before payroll?
        <textarea
          name="message"
          placeholder="Tell us what you want to test or validate."
          rows={5}
          className={`${inputClass} resize-none`}
          required
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full bg-[#62c7b2] px-6 py-3 text-sm font-semibold text-[#073642] transition hover:bg-[#7cd6c3] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Request a pilot"}
      </button>

      {status === "sent" && (
        <p className="mt-4 border border-[#62c7b2]/30 bg-[#62c7b2]/10 px-4 py-3 text-sm text-[#d8f0f2]">
          Sent. We will get back to you.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          Failed to send. Please try again.
        </p>
      )}
      {limitMessage && (
        <p className="mt-4 border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          {limitMessage}
        </p>
      )}
    </form>
  );
}
