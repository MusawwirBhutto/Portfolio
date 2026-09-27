"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Exact mouse coordinates centered on the Flutter logo tip
  // SVG size is 18px x 18px, so subtracting 9px centers the tip exactly
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 9);
      mouseY.set(e.clientY - 9);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center filter drop-shadow-[0_0_8px_#42A5F5]"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flutter Logo SVG Colored #42A5F5 */}
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37z" fill="#42A5F5" />
        <path
          d="M14.314 7.4L7.842 13.87l4.137 4.14 5.99-5.99H21.684L14.314 7.4z"
          fill="#42A5F5"
        />
        <path
          d="M11.979 18.01l3.707 3.69h6l-5.69-5.69-4.017 2z"
          fill="#02569B"
        />
      </svg>
    </motion.div>
  );
}
