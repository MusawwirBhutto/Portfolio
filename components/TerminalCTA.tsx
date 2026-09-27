"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Terminal as TerminalIcon,
  CheckCircle2,
  Zap,
  AlertCircle,
  RotateCcw,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function TerminalCTA() {
  const [phase, setPhase] = useState<"idle" | "compiling" | "form">("idle");
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenForm = () => {
    if (phase === "form") return;
    setPhase("compiling");
    setTimeout(() => {
      setPhase("form");
    }, 450);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        const result = await response.json().catch(() => ({}));
        setErrorMessage(
          result?.errors?.[0]?.message ||
            "Transmission failed. Please verify your fields or try again.",
        );
        setFormStatus("error");
      }
    } catch {
      setErrorMessage("Network error occurred while compiling message.");
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-neutral-950 py-24 sm:py-32 flex flex-col justify-center items-center px-4 sm:px-6 relative z-30 border-t border-neutral-900 overflow-hidden"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
          <TerminalIcon className="w-3.5 h-3.5" />
          INTERACTIVE TERMINAL
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Let’s Architect Something Iconic
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Targeting high-impact Flutter applications, mobile architecture
          consulting, and enterprise builds.
        </p>
      </div>

      {/* ── The macOS Terminal Window ── */}
      <div className="w-full max-w-3xl bg-black/90 backdrop-blur-xl border border-neutral-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden relative z-10">
        {/* Terminal Header Bar */}
        <div className="h-11 px-4 flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/70 select-none">
          {/* Classic macOS Window Control Dots */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] block" />
          </div>

          {/* Centered Window Title */}
          <div className="text-xs font-mono text-neutral-300 truncate max-w-[200px] sm:max-w-md">
            musawwir.softengr@gmail.com: ~/contact
          </div>

          {/* Header Action: Highlighted Contact Me button */}
          <div className="flex items-center gap-2">
            {phase !== "form" ? (
              <button
                type="button"
                onClick={handleOpenForm}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.8)] border border-blue-400/80 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 animate-pulse"
                title="Contact Me"
              >
                <Zap className="w-3.5 h-3.5 fill-current text-white" />
                <span>Contact Me</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPhase("idle");
                  setFormStatus("idle");
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-xs font-mono text-blue-300 transition-colors cursor-pointer"
                title="Return to Terminal Prompt"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Terminal CLI</span>
              </button>
            )}
          </div>
        </div>

        {/* Terminal Body: Aligned on top (justify-start) */}
        <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {/* ── PHASE 1 & 2: Command & Compilation Logs ── */}
            {phase !== "form" && (
              <motion.div
                key="terminal-logs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm space-y-4 w-full"
              >
                {/* CLI Prompt Line: Authentic trigger string with clickable action prompt */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-neutral-300 w-full pb-2 border-b border-neutral-800/40">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-emerald-400 font-semibold">
                      musawwir.softengr@gmail.com
                    </span>
                    <span className="text-blue-400 font-bold">~ %</span>
                    <span className="text-neutral-200 font-mono tracking-tight">
                      &gt; flutter run contact_form.dart --release
                    </span>
                  </div>

                  {/* Highly visible, clickable action prompt in cyan with subtle pulse & hover highlight */}
                  <button
                    type="button"
                    onClick={handleOpenForm}
                    className="text-cyan-400 hover:text-cyan-300 font-mono font-semibold text-xs tracking-wide animate-pulse hover:bg-cyan-500/15 px-3 py-1.5 rounded-lg border border-cyan-400/50 transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 self-start sm:self-auto"
                    title="Click to Execute"
                  >
                    <span>[Click to Execute]</span>
                    <span className="w-1.5 h-3.5 bg-cyan-400 inline-block animate-pulse ml-0.5" />
                  </button>
                </div>

                {/* Compilation Output when user clicks */}
                {phase === "compiling" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1.5 pt-3 text-xs"
                  >
                    <div className="text-neutral-400 font-mono">
                      Running Gradle task &apos;assembleRelease&apos;...
                    </div>
                    <div className="text-emerald-400 font-semibold font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        ✓ Built build/app/outputs/flutter-apk/app-release.apk
                        (60 FPS Locked).
                      </span>
                    </div>
                    <div className="text-cyan-400 text-[11px] font-mono animate-pulse">
                      Initializing contact viewport...
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── PHASE 3: The Morph (Interactive Form with Formspree) ── */}
            {phase === "form" && (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full space-y-5"
              >
                {/* Terminal context breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                    <span className="text-neutral-400">
                      <span className="text-emerald-400">
                        musawwir.softengr@gmail.com
                      </span>{" "}
                      ~ % contact_form.dart --release
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/90">
                    Port 8080 • Formspree Pipeline Active
                  </span>
                </div>

                {/* Formspree Submission Success Feedback */}
                {formStatus === "success" ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>✓ Message Compiled &amp; Dispatched (200 OK)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Your payload was successfully transmitted to{" "}
                      <span className="text-white font-bold">
                        musawwir.softengr@gmail.com
                      </span>
                      . I review all inquiries directly and will follow up with
                      architecture notes shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors cursor-pointer pt-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                ) : (
                  <form
                    action="https://formspree.io/f/mzezkpyj"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {formStatus === "error" && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span>{errorMessage || "Failed to send message."}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                          Name / Organization
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Alex (Engineering Director)"
                          className="bg-neutral-900 border border-neutral-700 focus:border-blue-500 text-white rounded-lg p-3 w-full outline-none transition-colors font-mono text-sm placeholder:text-neutral-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                          Work Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="alex@company.com"
                          className="bg-neutral-900 border border-neutral-700 focus:border-blue-500 text-white rounded-lg p-3 w-full outline-none transition-colors font-mono text-sm placeholder:text-neutral-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Message / Project Scope
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        placeholder="Hi Musawwir, we are building a high-performance Flutter mobile application and would like to collaborate..."
                        className="bg-neutral-900 border border-neutral-700 focus:border-blue-500 text-white rounded-lg p-3 w-full outline-none transition-colors font-mono text-sm placeholder:text-neutral-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Compiling &amp; Transmitting Payload...</span>
                        </>
                      ) : (
                        <>
                          <span>Compile &amp; Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Social Icon Dock & Footer Copyright ── */}
      <div className="mt-14 flex flex-col items-center justify-center gap-6 relative z-10">
        {/* Centered Icon Dock with Hover Physics */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://linkedin.com/in/musawwirbhutto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:musawwir.softengr@gmail.com"
            aria-label="Email"
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://wa.me/923272765501"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/MusawwirBhutto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>

        {/* Clean Copyright Text */}
        <p className="text-xs font-mono text-neutral-500 text-center">
          © 2026 Musawwir Bhutto • Mobile Architect &amp; Flutter Specialist
        </p>
      </div>
    </section>
  );
}

function GithubIcon({
  className = "w-5 h-5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({
  className = "w-5 h-5",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
