"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Sparkles,
  ExternalLink,
  Download,
} from "lucide-react";
import SplashScreen from "@/components/SplashScreen";
import InteractivePhone from "@/components/InteractivePhone";
import ProjectShowcase from "@/components/ProjectShowcase";
import PersonalProjects from "@/components/PersonalProjects";
import SkillsDeck from "@/components/SkillsDeck";
import TechReactor from "@/components/TechReactor";
import CertificatesTimeline from "@/components/CertificatesTimeline";
import TerminalCTA from "@/components/TerminalCTA";
import { getAssetPath } from "@/utils/assetPath";

const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Home() {
  const [splashComplete, setSplashComplete] = useState(false);

  // Mouse tracking for animated radial glow bloom and 3D portrait tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized mouse coordinates (-0.5 to 0.5) for parallax rotation
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseNormX, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(mouseNormY, { stiffness: 180, damping: 22 });

  // 3D parallax tilt for portrait card
  const portraitRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const portraitRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Spring glow positioning
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 24 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - 250);
    mouseY.set(clientY - 250);

    const { innerWidth, innerHeight } = window;
    mouseNormX.set(clientX / innerWidth - 0.5);
    mouseNormY.set(clientY / innerHeight - 0.5);
  };

  const handleMouseLeave = () => {
    mouseNormX.set(0);
    mouseNormY.set(0);
  };

  return (
    <>
      {/* ── Splash overlay ── */}
      {!splashComplete && (
        <SplashScreen onComplete={() => setSplashComplete(true)} />
      )}

      {/* ── Main Hero Section ── */}
      <main
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center selection:bg-blue-500 selection:text-white"
      >
        {/* ── Subtle Cyber-Grid Background (40px squares, opacity 0.05, radial vignette) ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #42A5F5 1px, transparent 1px),
                              linear-gradient(to bottom, #42A5F5 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(circle at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 40%, transparent 80%)",
          }}
        />

        {/* ── Animated Mouse-Following Radial Glow (Cyan/Blue Bloom) ── */}
        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-sky-500/15 to-cyan-400/20 rounded-full blur-[120px] pointer-events-none z-0"
        />

        {/* Fixed Ambient Glow for Depth */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* ── Main Content Grid ── */}
        <div className="max-w-7xl mx-auto min-h-screen px-6 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 w-full">
          {/* ── Left Column: Profile & Typography ── */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={splashComplete ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_PREMIUM }}
          >
            {/* ── Executive 3D Cursor-Tracking Portrait Card & Status Pill ── */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div style={{ perspective: "1000px" }}>
                <motion.div
                  style={{
                    rotateX: portraitRotateX,
                    rotateY: portraitRotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-3xl border border-blue-500/30 overflow-hidden relative shadow-2xl bg-neutral-900/60 backdrop-blur-xl group cursor-pointer transition-shadow hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)] flex-shrink-0"
                >
                  <Image
                    src={getAssetPath("/musawwir-portrait.jpg")}
                    alt="Musawwir Bhutto"
                    fill
                    priority
                    sizes="(max-width: 768px) 144px, 160px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle glass reflection overlay on photo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>

              {/* Status Pill & Badge */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Open to Opportunities</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 pl-0.5">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  High-Impact Mobile Engineering
                </div>
              </div>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-2.5">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] [text-shadow:0_0_35px_rgba(59,130,246,0.25)]">
                Musawwir Bhutto
              </h1>

              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-400 via-blue-300 to-sky-500 bg-clip-text text-transparent tracking-tight">
                Mobile Architect & Flutter Specialist
              </h2>
            </div>

            {/* Description */}
            <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
              Engineering enterprise mobile systems with Clean Architecture,
              declarative Riverpod state management, and butter-smooth 60 FPS
              rendering engines.
            </p>

            {/* Quick Metric Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
                ⚡ 60 FPS Fluid
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
                🧱 Clean Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-sm hover:border-neutral-700 transition-colors">
                🌊 Riverpod / Bloc
              </span>
            </div>

            {/* Interactive Action Row */}
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 pt-2">
              {/* Primary Button */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide transition-all border border-blue-400/50 shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_40px_rgba(37,99,235,0.8)] w-full md:w-auto text-center"
              >
                <span>View Case Studies</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              {/* Secondary Glass Button */}
              <motion.a
                href="https://github.com/MusawwirBhutto"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl backdrop-blur-md bg-white/[0.05] border border-white/10 hover:border-white/25 text-neutral-200 hover:text-white font-semibold text-sm tracking-wide transition-all shadow-lg hover:bg-white/[0.08] w-full md:w-auto text-center"
              >
                <Code2 className="w-4 h-4 text-blue-400" />
                <span>Inspect Code / GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href={getAssetPath("/Musawwir_Bhutto_Resume.pdf")}
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl font-medium border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 text-sm tracking-wide w-full md:w-auto text-center"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* ── Right Column: Architect Hub Phone ── */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={splashComplete ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.25, ease: EASE_PREMIUM }}
          >
            {/* Ambient Radial Blur behind phone */}
            <div className="absolute w-80 h-[480px] bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />

            {/* Architect Hub 3D Phone Stage */}
            <InteractivePhone />
          </motion.div>
        </div>
      </main>

      {/* ── 3D Card Deck Spread: Engineering Architecture ── */}
      <SkillsDeck />

      {/* ── Arsenal & Core Technologies (Neural Reactor) ── */}
      <TechReactor />

      {/* ── Glowing Vertical Timeline: Milestones & Recognition ── */}
      <CertificatesTimeline />

      {/* ── Pinned-Scroll Project Showcase ── */}
      <ProjectShowcase />

      {/* ── Experiments & Utilities (Personal Projects Grid) ── */}
      <PersonalProjects />

      {/* ── Interactive Terminal CTA (Footer) ── */}
      <TerminalCTA />
    </>
  );
}
