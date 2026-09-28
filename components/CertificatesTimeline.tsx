"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { getAssetPath } from "@/utils/assetPath";

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
    image: getAssetPath("/certificates/git.png"),
    badge: "Engineering Core",
  },
  {
    id: "google-ai",
    title: "Google AI Essentials",
    issuer: "Google Career Certificates",
    credentialDate: "AI & ML Foundations",
    image: getAssetPath("/certificates/google-ai.png"),
    badge: "GenAI Specialist",
  },
  {
    id: "ux-design",
    title: "UX Design Specialization",
    issuer: "Google • Coursera",
    credentialDate: "User Centered Architecture",
    image: getAssetPath("/certificates/ux-design.png"),
    badge: "Product & UI/UX",
  },
  {
    id: "codestorm",
    title: "Hackathon Winner (CodeStorm '26)",
    issuer: "National Tech Hackathon",
    credentialDate: "1st Place Mobile Innovation",
    image: getAssetPath("/certificates/codestorm.png"),
    badge: "Champion",
  },
  {
    id: "entrepreneur",
    title: "Young Entrepreneur Award",
    issuer: "Innovation & Startup Summit",
    credentialDate: "Venture Excellence",
    image: getAssetPath("/certificates/entrepreneur.png"),
    badge: "Leadership",
  },
  {
    id: "techpreneur",
    title: "Techpreneur Summit Delegate",
    issuer: "Global Technology Forum",
    credentialDate: "Mobile Architecture Speaker",
    image: getAssetPath("/certificates/techpreneur.png"),
    badge: "Delegate",
  },
  {
    id: "genai-analytics",
    title: "GenAI Data Analytics",
    issuer: "Tata Group • Forage",
    credentialDate: "Enterprise Intelligence",
    image: getAssetPath("/certificates/genai-analytics.png"),
    badge: "Data & AI",
  },
];

export default function CertificatesTimeline() {
  return (
    <section
      id="certifications"
      className="relative z-20 bg-black py-28 border-t border-neutral-900 overflow-hidden"
    >
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-20 relative z-20 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
          <Award className="w-3.5 h-3.5 text-blue-400" />
          MILESTONES & RECOGNITION
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Certified Excellence
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          Verified industry achievements, hackathon championships, and
          specialized engineering credentials.
        </p>
      </div>

      {/* ── Main Timeline Container ── */}
      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Glowing Central Vertical Line */}
        <div className="absolute left-1/2 w-[2px] h-full bg-gradient-to-b from-blue-500/50 via-cyan-400/20 to-transparent -translate-x-1/2 top-0 pointer-events-none hidden sm:block" />

        {/* ── Alternating Rows ── */}
        <div className="space-y-12 sm:space-y-16">
          {CERTIFICATES.map((cert, index) => {
            const isLeft = index % 2 === 0;

            const cardContent = (
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="w-full sm:w-[45%] bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group"
              >
                {/* Certificate Image Frame */}
                <div className="aspect-video relative w-full rounded-xl overflow-hidden bg-black/60 border border-white/5 mb-4">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                      {cert.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 flex-shrink-0">
                      {cert.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 font-mono flex items-center gap-1.5 pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{cert.issuer}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500">
                      {cert.credentialDate}
                    </span>
                  </p>
                </div>
              </motion.div>
            );

            return (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row justify-between items-center w-full relative"
              >
                {/* Central Glowing Node with Scale Pop */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 hidden sm:block"
                />

                {/* Left Card or Empty Spacer */}
                {isLeft ? (
                  cardContent
                ) : (
                  <div className="hidden sm:block w-[45%]" />
                )}

                {/* Right Card or Empty Spacer */}
                {!isLeft ? (
                  cardContent
                ) : (
                  <div className="hidden sm:block w-[45%]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Stamp */}
        <div className="mt-20 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-400 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>7 Industry & Hackathon Certifications Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
