"use client";

import { motion } from "framer-motion";
import {
  SiFlutter,
  SiFirebase,
  SiSupabase,
  SiMysql,
  SiDotnet,
  SiPython,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiFigma,
  SiCloudflare,
  SiN8N,
  SiDocker,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const techStack = [
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "C#", icon: TbBrandCSharp, color: "#9B4F96" },
  { name: ".NET", icon: SiDotnet, color: "#512BD4" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "n8n", icon: SiN8N, color: "#FF6D5A" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

export default function TechReactor() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -60,
      rotateX: 45,
      scale: 0.8,
      filter: "grayscale(100%)",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    },
    show: (tech: any) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "grayscale(0%)",
      boxShadow: `0px 10px 20px -5px ${tech.color}80`,
      transition: { type: "spring" as const, stiffness: 250, damping: 20 },
    }),
  };

  return (
    <section className="relative bg-neutral-950 border-t border-neutral-900 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-20">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            NEURAL REACTOR
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 tracking-tight">
            Arsenal & Core Technologies
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 pt-10 pb-16"
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="relative z-10"
                style={{ perspective: "1000px" }}
              >
                {/* ── Seamless 3D Shelf Segment ── */}
                <div className="absolute top-full -left-4 -right-4 md:-left-5 md:-right-5 h-6 md:h-8 pointer-events-none z-0 flex flex-col">
                  {/* Top Surface (Highlight) */}
                  <div className="w-full h-2 md:h-3 bg-neutral-800 border-t border-b border-neutral-600/50" />
                  {/* Front Face (Shadowed) */}
                  <div className="w-full flex-1 bg-gradient-to-b from-neutral-900 to-black shadow-[0_20px_30px_rgba(0,0,0,0.9)]" />
                </div>

                {/* ── Dropping Tech Cube ── */}
                <motion.div
                  variants={itemVariants}
                  custom={tech}
                  whileHover={{
                    y: -10,
                    boxShadow: `0px 15px 40px -5px ${tech.color}AA`,
                  }}
                  className="bg-neutral-900/80 border border-white/10 rounded-2xl aspect-square flex flex-col items-center justify-center gap-3 relative overflow-hidden group cursor-pointer z-10 origin-bottom"
                >
                  {/* Background Glow that intensifies on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl rounded-full scale-150"
                    style={{ backgroundColor: tech.color }}
                  />

                  <Icon
                    className="text-4xl md:text-5xl transition-colors duration-500 relative z-10 drop-shadow-md"
                    style={{ color: tech.color }}
                  />

                  <span className="text-[10px] md:text-xs font-mono text-neutral-300 font-semibold tracking-wide relative z-10 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>

                  {/* Subtle border reflection */}
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
