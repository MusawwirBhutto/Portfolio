"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Smartphone,
  Cpu,
  Layers,
  Terminal,
  Wifi,
  Sparkles,
  LucideIcon,
  CheckCircle2,
} from "lucide-react";

interface SkillCardData {
  id: string;
  category: string;
  cardEdition: string;
  icon: LucideIcon;
  index: string;
  skills: string[];
  accentColor: string;
  gradientGlow: string;
}

const SKILL_CARDS: SkillCardData[] = [
  {
    id: "mobile",
    category: "Mobile Architecture",
    cardEdition: "Titanium Mobile Core",
    icon: Smartphone,
    index: "01 / 04",
    skills: [
      "Flutter Development",
      "Dart (OOP & Async)",
      "Firebase Architecture",
      "Supabase Database",
      "Riverpod State Management",
    ],
    accentColor: "#3B82F6",
    gradientGlow: "from-blue-500/10 via-sky-500/5 to-transparent",
  },
  {
    id: "cs",
    category: "Core Computer Science",
    cardEdition: "Foundational Systems",
    icon: Cpu,
    index: "02 / 04",
    skills: [
      "OOP Principles",
      "Data Structures & Algorithms",
      "C / C# / Python",
      "SQL & NoSQL Engines",
      "Memory & Thread Profiling",
    ],
    accentColor: "#0EA5E9",
    gradientGlow: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    id: "design",
    category: "Design & Product",
    cardEdition: "Product & Experience",
    icon: Layers,
    index: "03 / 04",
    skills: [
      "UI/UX Systems Design",
      "Figma Prototyping",
      "Agile & Scrum Execution",
      "Product Strategy",
      "Founder's Growth Mindset",
    ],
    accentColor: "#6366F1",
    gradientGlow: "from-indigo-500/10 via-purple-500/5 to-transparent",
  },
  {
    id: "devops",
    category: "DevOps & Automation",
    cardEdition: "Resilient Infrastructure",
    icon: Terminal,
    index: "04 / 04",
    skills: [
      "Docker (Containerization)",
      "n8n Workflow Automation",
      "Git / GitHub Workflows",
      "CI/CD Pipeline Baselines",
      "Automated Test Suites",
    ],
    accentColor: "#10B981",
    gradientGlow: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
];

export default function SkillsDeck() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress across the 300vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── PHASE 1: Rise & Face Camera (0 -> 0.2) ──
  const deckRotateX = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const deckY = useTransform(scrollYProgress, [0, 0.2], [180, 0]);
  const deckScale = useTransform(scrollYProgress, [0, 0.2], [0.85, 1]);

  // ── PHASE 2: The Fan Out with Responsive Math (0.25 -> 0.8) ──
  // Card 1: Leftmost outer card (-160% X, 10% Y drop, -8deg tilt on desktop)
  const card1X = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? "0%" : `${-160 * t}%`;
  });
  const card1Y = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? `${-60 * t}px` : "0%";
  });
  const card1RotateZ = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return -2;
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    return -2 + -5 * t;
  });

  // Card 2: Inner left card (-55% X, 0% Y, -2deg tilt on desktop)
  const card2X = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? "0%" : `${-55 * t}%`;
  });
  const card2Y = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? `${-20 * t}px` : "0%";
  });
  const card2RotateZ = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return -1;
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    return -1 + -1 * t;
  });

  // Card 3: Inner right card (55% X, 0% Y, 2deg tilt on desktop)
  const card3X = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? "0%" : `${55 * t}%`;
  });
  const card3Y = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? `${20 * t}px` : "0%";
  });
  const card3RotateZ = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return 1;
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    return 1 + 1 * t;
  });

  // Card 4: Rightmost outer card (160% X, 0% Y, 7deg tilt on desktop)
  const card4X = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? "0%" : `${160 * t}%`;
  });
  const card4Y = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return "0%";
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    return isMob ? `${60 * t}px` : "0%";
  });
  const card4RotateZ = useTransform(scrollYProgress, (v) => {
    if (v < 0.25) return 2;
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.55));
    return 2 + 5 * t;
  });

  const cardTransforms = [
    { x: card1X, y: card1Y, rotateZ: card1RotateZ },
    { x: card2X, y: card2Y, rotateZ: card2RotateZ },
    { x: card3X, y: card3Y, rotateZ: card3RotateZ },
    { x: card4X, y: card4Y, rotateZ: card4RotateZ },
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-[300vh] bg-black border-t border-neutral-900 z-10"
    >
      {/* ── Sticky Viewport Shell ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 select-none">
        {/* Subtle Cyber Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #42A5F5 1px, transparent 1px),
                              linear-gradient(to bottom, #42A5F5 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />

        {/* Section Header with generous margin-bottom */}
        <div className="text-center max-w-3xl mx-auto relative z-20 space-y-2 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            3D ARCHITECTURE DECK
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight break-words whitespace-normal">
            Engineering Architecture
          </h2>
        </div>

        {/* ── 3D Card Deck Staging Container (Central Wrapper) ── */}
        <div
          style={{ perspective: "1200px" }}
          className="relative w-full max-w-7xl flex items-center justify-center pt-2 sm:pt-4"
        >
          <motion.div
            style={{
              rotateX: deckRotateX,
              y: deckY,
              scale: deckScale,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[min(85vw,260px)] sm:w-[260px] lg:w-[min(22vw,260px)] h-[345px] sm:h-[355px] flex items-center justify-center"
          >
            {SKILL_CARDS.map((card, i) => {
              const Icon = card.icon;
              const transform = cardTransforms[i];

              return (
                <motion.div
                  key={card.id}
                  style={{
                    x: transform.x,
                    y: transform.y,
                    rotateZ: transform.rotateZ,
                    transformStyle: "preserve-3d",
                    zIndex: i + 10,
                  }}
                  whileHover={{
                    scale: 1.05,
                    zIndex: 60,
                    y: -6,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  className="absolute inset-0 w-[min(85vw,260px)] sm:w-[260px] lg:w-[min(22vw,260px)] h-[345px] sm:h-[355px] bg-gradient-to-b from-neutral-800 to-neutral-950 border-[0.5px] border-white/20 rounded-3xl shadow-2xl flex flex-col p-4 sm:p-4.5 transition-colors duration-300 hover:border-blue-400/50 cursor-pointer group select-none overflow-hidden"
                >
                  {/* Subtle Metallic Brushed Texture & Glass Reflection */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent rounded-3xl" />
                  <div
                    className={`pointer-events-none absolute -top-24 -right-24 w-44 h-44 bg-gradient-to-br ${card.gradientGlow} blur-2xl rounded-full`}
                  />

                  {/* ── Top Row: Smart Chip & Contactless Wave + Category ── */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-6 rounded-md bg-gradient-to-br from-amber-200/60 via-yellow-400/40 to-amber-600/50 border border-amber-300/50 relative overflow-hidden shadow-inner flex items-center justify-center flex-shrink-0">
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[1px] p-[1.5px]">
                          <div className="border border-amber-800/40 rounded-tl-sm" />
                          <div className="border border-amber-800/40 rounded-tr-sm" />
                          <div className="border border-amber-800/40 rounded-bl-sm" />
                          <div className="border border-amber-800/40 rounded-br-sm" />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full border border-amber-800/40 z-10" />
                      </div>

                      <Wifi className="w-3.5 h-3.5 text-white/30 rotate-90" />
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="w-6.5 h-6.5 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-blue-400 shadow-sm group-hover:border-blue-500/40 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[8.5px] font-mono text-neutral-500 mt-0.5">
                        {card.index}
                      </span>
                    </div>
                  </div>

                  {/* ── Card Title & Edition ── */}
                  <div className="relative z-10 mt-2 mb-1.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug break-words whitespace-normal">
                      {card.category}
                    </h3>
                    <p className="text-[9.5px] font-mono text-neutral-400 mt-0.5 tracking-wide break-words whitespace-normal">
                      {card.cardEdition}
                    </p>
                  </div>

                  {/* ── Sleek Vertical List of Skills ── */}
                  <div className="relative z-10 flex flex-col space-y-1 my-auto">
                    {card.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="px-2.5 py-1 rounded-xl bg-neutral-900/80 border border-white/5 group-hover:border-white/10 flex items-center gap-1.5 shadow-sm transition-all hover:bg-neutral-800/80 hover:border-blue-500/30"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        <span className="text-[10.5px] font-medium text-neutral-200 tracking-tight break-words whitespace-normal truncate">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* ── Card Footer: Cardholder Stamp ── */}
                  <div className="relative z-10 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[8.5px] font-mono text-neutral-400">
                    <span className="tracking-wider text-neutral-300 font-semibold uppercase truncate">
                      MUSAWWIR BHUTTO
                    </span>
                    <span className="text-blue-400 flex items-center gap-1 flex-shrink-0">
                      <Sparkles className="w-3 h-3" />
                      ARCHITECT
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
