"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Box, Navigation } from "lucide-react";
import { getAssetPath } from "@/utils/assetPath";

interface VIPProject {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  badgeIcon: typeof Sparkles;
}

const VIP_PROJECTS: VIPProject[] = [
  {
    id: "groomin",
    number: "01",
    title: "Groomin",
    tagline: "AI Appointment Platform",
    description:
      "AI-assisted salon appointment booking platform featuring conversational search and automated scheduling.",
    image: getAssetPath("/projects/groomin-vip.png"),
    accent: "#3B82F6",
    badgeIcon: Sparkles,
  },
  {
    id: "dinelens",
    number: "02",
    title: "DineLens",
    tagline: "Spatial 3D Food AR & SaaS",
    description:
      "Restaurant SaaS providing digital QR code menus, augmented reality 3D food previews, and integrated ordering systems.",
    image: getAssetPath("/projects/dinelens-vip.png"),
    accent: "#0EA5E9",
    badgeIcon: Box,
  },
  {
    id: "trackshaw",
    number: "03",
    title: "TrackShaw",
    tagline: "Geo-Ad & Fleet Telemetry",
    description:
      "Location-based mobile advertising application connecting advertisers with drivers to display physical ad banners within specific geographical radiuses.",
    image: getAssetPath("/projects/trackshaw-vip.png"),
    accent: "#10B981",
    badgeIcon: Navigation,
  },
];

export default function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress across the pinned 300vh section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative min-h-[300vh] bg-neutral-950"
    >
      {/* ── Sticky Viewport Container ── */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Subtle Cyber Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #42A5F5 1px, transparent 1px),
                              linear-gradient(to bottom, #42A5F5 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="w-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 mb-6 relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                MY FLAGSHIP ARCHITECTURES
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Production Apps I&apos;ve Built
              </h2>
            </div>

            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <span>Scroll to navigate case studies</span>
              <ArrowRight className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* ── Horizontal Scrolling Track ── */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex gap-8 pl-6 lg:pl-16 w-max items-center"
            >
              {VIP_PROJECTS.map((project, index) => {
                const BadgeIcon = project.badgeIcon;
                return (
                  <div
                    key={project.id}
                    className="w-[90vw] md:w-[75vw] h-auto md:h-[70vh] flex flex-col-reverse md:flex-row bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shrink-0 shadow-2xl relative"
                  >
                    {/* Left Side (Content - 40%) */}
                    <div className="w-full md:w-[40%] flex flex-col justify-center p-6 md:p-16 z-10 shrink-0">
                      {/* Index & Badge Indicator */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-mono font-bold tracking-widest text-blue-400">
                          {project.number}
                        </span>
                        <span className="text-neutral-600 font-mono text-xs">
                          /
                        </span>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-800/80 border border-neutral-700/60 text-[11px] font-mono text-neutral-300">
                          <BadgeIcon className="w-3 h-3 text-blue-400" />
                          <span>{project.tagline}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                        {project.description}
                      </p>

                      {/* View Case Study Button */}
                      <div>
                        <a
                          href="#contact"
                          className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)]"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* Right Side (Visual - 60%) */}
                    <div className="relative w-full md:w-[60%] h-[30vh] md:h-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority={index === 0}
                        className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      />
                      {/* Gradient overlay mask for seamless blend */}
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
