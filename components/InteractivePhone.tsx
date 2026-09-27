"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Wifi,
  Battery,
  Sparkles,
  Box,
  MapPin,
  ChevronRight,
  Layers,
  Zap,
  ArrowDownRight,
  Cpu,
  Smartphone,
  Navigation,
} from "lucide-react";

type AppId = "groomin" | "dinelens" | "trackshaw";

interface AppData {
  id: AppId;
  name: string;
  category: string;
  headline: string;
  stats: { label: string; value: string }[];
  tags: string[];
  icon: typeof Sparkles;
  accent: string;
}

const APPS: AppData[] = [
  {
    id: "groomin",
    name: "Groomin AI",
    category: "Salon Scheduling Engine",
    headline: "AI-Powered Barber Booking & CRM",
    stats: [
      { label: "AI Match", value: "99.2%" },
      { label: "Frame Rate", value: "60 FPS" },
    ],
    tags: ["Flutter 3.29", "Riverpod", "Firebase", "Stripe"],
    icon: Sparkles,
    accent: "from-blue-500 to-indigo-600",
  },
  {
    id: "dinelens",
    name: "DineLens",
    category: "AR Menu Platform",
    headline: "Spatial 3D Food Visualization",
    stats: [
      { label: "AR Tracking", value: "<12ms" },
      { label: "Model Scale", value: "1:1 Real" },
    ],
    tags: ["Flutter", "ARKit / ARCore", "Platform Channels"],
    icon: Box,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "trackshaw",
    name: "TrackShaw",
    category: "Geo-Ad Network",
    headline: "Live Telemetry & Fleet Dispatch",
    stats: [
      { label: "Fleet Latency", value: "<45ms" },
      { label: "Daily Routes", value: "12k+" },
    ],
    tags: ["Flutter", "Bloc Architecture", "Mapbox", "WebSockets"],
    icon: Navigation,
    accent: "from-sky-400 to-emerald-500",
  },
];

export default function InteractivePhone() {
  const [activeAppId, setActiveAppId] = useState<AppId>("groomin");
  const activeApp = APPS.find((a) => a.id === activeAppId) || APPS[0];

  // Mouse coordinate motion values for 3D parallax tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid physical tilt
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 22 });

  // Default Isometric Angle: rotateY(-14deg) rotateX(6deg)
  // Parallax adjustment: ±8 degrees smoothly on mouse move
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6 + 8, 6 - 8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-14 - 8, -14 + 8]);

  // Parallax translations for floating holographic cards
  const card1X = useTransform(mouseXSpring, [-0.5, 0.5], [-24, 24]);
  const card1Y = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const card2X = useTransform(mouseXSpring, [-0.5, 0.5], [22, -22]);
  const card2Y = useTransform(mouseYSpring, [-0.5, 0.5], [18, -18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center py-6 select-none"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Floating Holographic Card 1: Top-Left (⚡ 60 FPS Locked) ── */}
      <motion.div
        style={{
          x: card1X,
          y: card1Y,
        }}
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
        className="absolute -top-3 -left-8 sm:-left-16 z-30 bg-black/70 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-xl shadow-black/50 flex items-center gap-3 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Zap className="w-4 h-4 fill-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white tracking-tight">
              60 FPS Locked
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            Raster: 16.6ms • Zero Jitter
          </div>
        </div>
      </motion.div>

      {/* ── Floating Holographic Card 2: Bottom-Right (📱 Clean Arch + Riverpod) ── */}
      <motion.div
        style={{
          x: card2X,
          y: card2Y,
        }}
        animate={{
          y: [4, -4, 4],
        }}
        transition={{
          y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
        }}
        className="absolute -bottom-3 -right-6 sm:-right-14 z-30 bg-black/70 backdrop-blur-md border border-blue-500/20 p-3 rounded-2xl shadow-xl shadow-black/50 flex items-center gap-3 pointer-events-none"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
            <span>Clean Arch + Riverpod</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 font-mono">
              v3.0
            </span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono">
            Enterprise Flutter Core
          </div>
        </div>
      </motion.div>

      {/* ── 3D Tilting Phone Chassis ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          },
        }}
        className="w-[290px] h-[580px] rounded-[52px] p-3 bg-neutral-900 border-[4px] border-neutral-700 shadow-2xl relative transition-shadow hover:shadow-[0_30px_70px_-15px_rgba(59,130,246,0.3)] z-20"
      >
        {/* Hardware Side Buttons */}
        <div className="w-[3px] h-6 bg-neutral-600 rounded-l absolute -left-[7px] top-24" />
        <div className="w-[3px] h-12 bg-neutral-600 rounded-l absolute -left-[7px] top-34" />
        <div className="w-[3px] h-12 bg-neutral-600 rounded-l absolute -left-[7px] top-48" />
        <div className="w-[3px] h-16 bg-neutral-600 rounded-r absolute -right-[7px] top-36" />

        {/* Screen Bezel */}
        <div className="rounded-[42px] overflow-hidden bg-neutral-950 h-full w-full relative flex flex-col justify-between p-3.5 border border-neutral-800/80">
          {/* Glass Reflection Overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent z-30 rounded-[42px]" />
          <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl z-20" />

          {/* ── Top Header: iOS Bar + Glowing "Flutter Hub" ── */}
          <div className="relative z-20">
            <div className="flex items-center justify-between text-[10px] text-neutral-400 px-2 pt-0.5 pb-1 font-semibold tracking-wider">
              <span>9:41</span>
              <div className="flex items-center space-x-1.5">
                <Wifi className="w-3 h-3 text-neutral-300" />
                <Battery className="w-3.5 h-3.5 text-neutral-300" />
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="w-24 h-6 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-2 border border-neutral-800/70 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-500/60" />
              </div>
            </div>

            {/* Glowing "Flutter Hub" Header Badge */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1 shadow-[0_0_12px_rgba(59,130,246,0.25)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60A5FA]" />
                <span className="text-[11px] font-bold text-blue-200 tracking-wide">
                  Architect Hub
                </span>
              </div>
              <span className="text-[9px] text-blue-400 font-mono">
                Portfolio OS v2.4
              </span>
            </div>
          </div>

          {/* ── Interactive App Drawer (3 Clickable Mini App Cards) ── */}
          <div className="grid grid-cols-3 gap-1.5 my-2 relative z-20">
            {APPS.map((app) => {
              const Icon = app.icon;
              const isSelected = app.id === activeAppId;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveAppId(app.id)}
                  className={`p-2 rounded-xl text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-blue-600/20 border border-blue-400/50 shadow-md shadow-blue-500/20 scale-[1.02]"
                      : "bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60A5FA]" />
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-white truncate">
                    {app.name}
                  </div>
                  <div className="text-[8px] text-neutral-400 truncate">
                    {app.category.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Active App Preview Area ── */}
          <div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeApp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="space-y-2 h-full flex flex-col justify-between"
              >
                {/* Active App Showcase Card */}
                <div className="p-3 bg-neutral-900/90 border border-neutral-800 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-semibold text-blue-400 uppercase tracking-wider font-mono">
                      {activeApp.category}
                    </span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                      Production
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
                    {activeApp.headline}
                  </h3>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-neutral-800">
                    {activeApp.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="bg-neutral-950/60 p-1.5 rounded-lg border border-neutral-800/80"
                      >
                        <div className="text-[8px] text-neutral-400">
                          {stat.label}
                        </div>
                        <div className="text-[11px] font-bold text-white font-mono">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {activeApp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[8px] px-1.5 py-0.5 bg-neutral-800/80 text-neutral-300 rounded border border-neutral-700/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Case Study Prompt */}
                <a
                  href="#projects"
                  className="group flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-blue-600/30 to-sky-600/30 border border-blue-500/30 hover:border-blue-400/60 transition-all text-white text-[10px] font-semibold tracking-wide shadow-sm"
                >
                  <span className="flex items-center gap-1.5 text-blue-200 group-hover:text-white">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    Explore Case Study
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-blue-300 font-mono group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowDownRight className="w-3 h-3 text-blue-400" />
                  </div>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="w-24 h-1 bg-neutral-600 rounded-full mx-auto mt-2 opacity-60" />
        </div>
      </motion.div>

      {/* ── Soft Ground Shadow ── */}
      <div className="w-48 h-6 bg-blue-500/20 blur-xl rounded-full mx-auto mt-4 pointer-events-none" />
    </div>
  );
}
