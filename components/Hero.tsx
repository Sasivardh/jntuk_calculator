"use client";

import React from "react";
import { motion } from "motion/react";
import { Calculator, GraduationCap, ChevronDown, Award } from "lucide-react";

interface HeroProps {
  onSelectSection: (id: string) => void;
}

export default function Hero({ onSelectSection }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const scrollToSection = (id: string) => {
    onSelectSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a10_1px,transparent_1px),linear-gradient(to_bottom,#0f172a10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Banner Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Regulation Pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm border border-blue-200/50 dark:border-blue-800/30"
          >
            <Award className="w-4 h-4 text-amber-500" />
            Supports R20 & R23 Regulations
          </motion.div>

          {/* Main Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Calculate your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              JNTUK CGPA
            </span>{" "}
            instantly
          </motion.h2>

          {/* Short Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-medium leading-relaxed"
          >
            Designed for JNTUK students to calculate SGPA and CGPA accurately. Load syllabus automatically, customize credits, and save calculations to your device.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none"
          >
            <button
              onClick={() => scrollToSection("sgpa")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 dark:shadow-blue-900/30 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              Calculate SGPA
            </button>

            <button
              onClick={() => scrollToSection("cgpa")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-slate-800 dark:text-white font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Calculate CGPA
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center gap-1.5 cursor-pointer group text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            onClick={() => scrollToSection("sgpa")}
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
