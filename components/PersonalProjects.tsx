"use client";

import Image from "next/image";
import { ExternalLink, Code2, Terminal } from "lucide-react";
import { getAssetPath } from "@/utils/assetPath";

interface PersonalProject {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  githubUrl: string;
}

const PERSONAL_PROJECTS: PersonalProject[] = [
  {
    id: "catalog-app",
    title: "Catalog App",
    tag: "E-Commerce",
    description:
      "Shopping UI with cart, login, and persistent SharedPreferences.",
    image: getAssetPath("/projects/catalog-app.png"),
    githubUrl: "https://github.com/MusawwirBhutto",
  },
  {
    id: "push-game",
    title: "Push Away Game",
    tag: "Game Loop",
    description: "Interactive 2D physics game loop engineered in Flutter.",
    image: getAssetPath("/projects/push-game.png"),
    githubUrl: "https://github.com/MusawwirBhutto",
  },
  {
    id: "sift-news",
    title: "Sift",
    tag: "News Engine",
    description:
      "Authentic news reader with infinite scroll, debunking, and search.",
    image: getAssetPath("/projects/sift-news.png"),
    githubUrl: "https://github.com/MusawwirBhutto",
  },
  {
    id: "secondlife",
    title: "SecondLife",
    tag: "Marketplace",
    description:
      "Full-stack clothing marketplace with Supabase authentication.",
    image: getAssetPath("/projects/secondlife.png"),
    githubUrl: "https://github.com/MusawwirBhutto",
  },
];

export default function PersonalProjects() {
  return (
    <section className="relative py-24 md:py-32 bg-black z-20 overflow-hidden border-t border-neutral-900">
      {/* Background Cyber-Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #42A5F5 1px, transparent 1px),
                            linear-gradient(to bottom, #42A5F5 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-3">
              <Terminal className="w-3.5 h-3.5" />
              INDEPENDENT BUILDS
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              My Personal Projects
            </h2>
          </div>
          <p className="text-neutral-400 text-sm md:text-base max-w-md font-mono">
            Interactive prototypes, physics simulations, and full-stack mobile
            applications I&apos;ve developed independently.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700 rounded-[32px] p-4 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              {/* ── Proper Mobile Device Screen (Realistic 9:18.5 aspect ratio) ── */}
              <div className="relative w-full aspect-[9/18.5] rounded-[24px] overflow-hidden bg-neutral-950 border-[3px] border-neutral-800 group-hover:border-neutral-700/90 shadow-2xl transition-colors flex items-center justify-center">
                {/* Dynamic Island / Speaker Pill */}
                <div className="absolute top-2 w-16 h-3 bg-neutral-950 rounded-full z-20 border border-neutral-800/70 shadow-sm pointer-events-none" />

                {/* Mobile Screen Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* ── Details Box (BELOW the mobile screen - clean and readable) ── */}
              <div className="pt-5 pb-2 px-1 flex flex-col flex-1 justify-between">
                <div>
                  {/* Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-mono text-blue-400 font-medium">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Explore Code Action Button */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-neutral-800/80 hover:bg-blue-600/20 border border-neutral-700 hover:border-blue-500/50 text-neutral-300 hover:text-blue-400 text-xs font-mono font-medium transition-all group/btn"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Explore Code</span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
