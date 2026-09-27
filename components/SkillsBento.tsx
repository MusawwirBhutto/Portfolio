"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillsBentoProps {
  category: string;
  subtitle?: string;
  icon: LucideIcon;
  skills: string[];
  index?: number;
}

export default function SkillsBento({
  category,
  subtitle,
  icon: Icon,
  skills,
  index = 1,
}: SkillsBentoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5) for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel coordinates within card for the spotlight glow
  const spotX = useMotionValue(150);
  const spotY = useMotionValue(150);

  // Smooth springs for fluid physical tilt
  const springX = useSpring(mouseX, { stiffness: 220, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 20 });

  // Map coordinates to subtle ±6deg tilt
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    // Spotlight position
    spotX.set(xPos);
    spotY.set(yPos);

    // 3D rotation offset (-0.5 to 0.5)
    mouseX.set(xPos / rect.width - 0.5);
    mouseY.set(yPos / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -4 }}
        transition={{ y: { duration: 0.25, ease: "easeOut" } }}
        className="bg-neutral-900/40 backdrop-blur-2xl border border-white/5 hover:border-white/15 rounded-[32px] p-8 relative overflow-hidden transition-colors duration-500 shadow-2xl flex flex-col justify-between min-h-[290px] group"
      >
        {/* ── Dynamic Mouse Spotlight Glow ── */}
        <motion.div
          style={{
            x: spotX,
            y: spotY,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/15 blur-3xl rounded-full pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient Subtle Static Corner Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

        {/* ── Top Header Row ── */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-blue-400 shadow-lg group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {category}
              </h3>
              {subtitle && (
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          {/* Section Index Watermark */}
          <div className="text-3xl font-black text-white/[0.07] font-mono pointer-events-none">
            0{index}
          </div>
        </div>

        {/* ── Skills Floating Chips ── */}
        <div className="relative z-10 flex flex-wrap gap-2.5 mt-auto">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-black/50 rounded-full text-sm font-medium text-gray-300 border border-white/5 flex items-center shadow-sm hover:border-blue-500/30 hover:text-white transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
