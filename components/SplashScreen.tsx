"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

type Phase = "blackout" | "line" | "glow" | "doors" | "done";

interface SplashScreenProps {
  onComplete: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SAFETY_TIMEOUT_MS = 4500;

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>("blackout");
  const completedRef = useRef(false);

  // Helper to call onComplete exactly once
  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Beat 1 — Blackout hold (0.5s), then advance to line-draw
  useEffect(() => {
    const timer = setTimeout(() => setPhase("line"), 500);
    return () => clearTimeout(timer);
  }, []);

  // Lock scroll while splash is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Safety fallback — guarantee the user is never stuck
  useEffect(() => {
    const timer = setTimeout(finish, SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [finish]);

  // Phase progression callbacks
  const handleLineComplete = useCallback(() => {
    setPhase("glow");
  }, []);

  const handleGlowComplete = useCallback(() => {
    setPhase("doors");
  }, []);

  const handleDoorsComplete = useCallback(() => {
    setPhase("done");
    finish();
  }, [finish]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* ── Top door ── */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-black"
        style={
          phase === "doors" || phase === "done"
            ? { boxShadow: "0 4px 20px #42A5F5, 0 2px 60px #02569B" }
            : undefined
        }
        animate={
          phase === "doors" || phase === "done" ? { y: "-100vh" } : { y: 0 }
        }
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        onAnimationComplete={
          phase === "doors" ? handleDoorsComplete : undefined
        }
      />

      {/* ── Bottom door ── */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black"
        style={
          phase === "doors" || phase === "done"
            ? { boxShadow: "0 -4px 20px #42A5F5, 0 -2px 60px #02569B" }
            : undefined
        }
        animate={
          phase === "doors" || phase === "done" ? { y: "100vh" } : { y: 0 }
        }
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      />

      {/* ── Center line ── */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2"
        style={{ background: "#42A5F5", transformOrigin: "center" }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={
          phase === "blackout"
            ? { scaleX: 0, opacity: 1 }
            : phase === "line"
              ? { scaleX: 1, opacity: 1 }
              : phase === "glow"
                ? {
                    scaleX: 1,
                    opacity: 1,
                    boxShadow: [
                      "0 0 10px #42A5F5, 0 0 40px #02569B",
                      "0 0 20px #42A5F5, 0 0 80px #02569B, 0 0 120px #02569B",
                      "0 0 15px #42A5F5, 0 0 60px #02569B",
                    ],
                  }
                : { scaleX: 1, opacity: 0 }
        }
        transition={
          phase === "line"
            ? { duration: 0.6, ease: EASE_OUT_EXPO }
            : phase === "glow"
              ? { duration: 0.3 }
              : phase === "doors" || phase === "done"
                ? { duration: 0.3 }
                : { duration: 0 }
        }
        onAnimationComplete={
          phase === "line"
            ? handleLineComplete
            : phase === "glow"
              ? handleGlowComplete
              : undefined
        }
      />
    </div>
  );
}
