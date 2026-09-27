"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowDown,
} from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  credentialDate: string;
  image: string;
  badge: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "git",
    title: "Version Control with Git",
    issuer: "Meta • Coursera",
    credentialDate: "Verified Credential",
    image: "/certificates/git.png",
    badge: "Engineering Core",
  },
  {
    id: "google-ai",
    title: "Google AI Essentials",
    issuer: "Google Career Certificates",
    credentialDate: "AI & ML Foundations",
    image: "/certificates/google-ai.png",
    badge: "GenAI Specialist",
  },
  {
    id: "ux-design",
    title: "UX Design Specialization",
    issuer: "Google • Coursera",
    credentialDate: "User Centered Architecture",
    image: "/certificates/ux-design.png",
    badge: "Product & UI/UX",
  },
  {
    id: "flutter-intern",
    title: "Flutter Mobile Internship",
    issuer: "Mobile Systems Engineering",
    credentialDate: "Production App Delivery",
    image: "/certificates/flutter-intern.png",
    badge: "Mobile Architecture",
  },
  {
    id: "codestorm",
    title: "Hackathon Winner (CodeStorm '26)",
    issuer: "National Tech Hackathon",
    credentialDate: "1st Place Mobile Innovation",
    image: "/certificates/codestorm.png",
    badge: "Champion",
  },
  {
    id: "entrepreneur",
    title: "Young Entrepreneur Award",
    issuer: "Innovation & Startup Summit",
    credentialDate: "Venture Excellence",
    image: "/certificates/entrepreneur.png",
    badge: "Leadership",
  },
  {
    id: "techpreneur",
    title: "Techpreneur Summit Delegate",
    issuer: "Global Technology Forum",
    credentialDate: "Mobile Architecture Speaker",
    image: "/certificates/techpreneur.png",
    badge: "Delegate",
  },
  {
    id: "genai-analytics",
    title: "GenAI Data Analytics",
    issuer: "Tata Group • Forage",
    credentialDate: "Enterprise Intelligence",
    image: "/certificates/genai-analytics.png",
    badge: "Data & AI",
  },
];

interface PlaqueProps {
  cert: CertificateItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function CertificatePlaque({ cert, index, total, progress }: PlaqueProps) {
  // Stagger each plaque across the scroll progress runway [0, 1]
  const segment = 1 / total;
  const start = Math.max(0, (index - 0.3) * segment);
  const peak = (index + 0.4) * segment;
  const end = Math.min(1, (index + 1.2) * segment);

  // 3D Z-Axis translation: -4000px (deep background) -> 0px (in front of camera) -> 800px (flies past)
  const z = useTransform(progress, [start, peak, end], [-3800, 0, 850]);

  // Opacity: fades in as it approaches -1000px, peaks at z: 0, fades out as it zooms past
  const opacity = useTransform(
    progress,
    [start, start + 0.35 * (peak - start), peak, end - 0.2 * (end - peak), end],
    [0, 0.9, 1, 0.4, 0],
  );

  // Scale: expands naturally as it comes closer to camera
  const scale = useTransform(progress, [start, peak, end], [0.35, 1, 1.25]);

  return (
    <motion.div
      style={{
        z,
        scale,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute w-[min(90vw,600px)] aspect-video bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-400/40 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] transition-colors select-none"
    >
      {/* ── Top Half: Certificate Image ── */}
      <div className="relative w-full h-[68%] rounded-xl overflow-hidden bg-black/60 border border-white/5">
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          sizes="(max-width: 768px) 90vw, 600px"
          className="object-contain p-1.5"
          priority={index < 2}
        />
        {/* Subtle glass reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>

      {/* ── Bottom Half: Minimal Text & Badge ── */}
      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate max-w-[280px] sm:max-w-md">
              {cert.title}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 flex-shrink-0">
              {cert.badge}
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>{cert.issuer}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-500">{cert.credentialDate}</span>
          </p>
        </div>

        {/* Index Watermark */}
        <div className="text-xl sm:text-2xl font-black text-white/[0.08] font-mono flex-shrink-0">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificatesTunnel() {
  const tunnelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: tunnelRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="certifications"
      ref={tunnelRef}
      className="relative min-h-[500vh] bg-black border-t border-neutral-900"
    >
      {/* ── Sticky Viewport 3D Stage ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6 py-10 sm:py-14 select-none">
        {/* Subtle Cyber Grid Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #42A5F5 1px, transparent 1px),
                              linear-gradient(to bottom, #42A5F5 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center Tunnel Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto relative z-20 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            MILESTONES & RECOGNITION
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Certified Excellence
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-mono flex items-center justify-center gap-1.5">
            <span>Scroll to navigate through the 3D recognition tunnel</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
          </p>
        </div>

        {/* ── 3D Z-Axis Depth Stage Container ── */}
        <div
          style={{ perspective: "1200px" }}
          className="relative w-full max-w-7xl flex items-center justify-center my-auto h-[450px]"
        >
          <div
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {CERTIFICATES.map((cert, index) => (
              <CertificatePlaque
                key={cert.id}
                cert={cert}
                index={index}
                total={CERTIFICATES.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Footer Prompt */}
        <div className="relative z-20 text-center text-xs font-mono text-neutral-500 pb-2 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>8 Verified Industry & Hackathon Credentials</span>
        </div>
      </div>
    </section>
  );
}
