"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, GraduationCap, History, Calculator, HelpCircle } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({
  theme,
  toggleTheme,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const navItems = [
    { id: "sgpa", label: "SGPA Calculator", icon: Calculator },
    { id: "cgpa", label: "CGPA Calculator", icon: GraduationCap },
    { id: "history", label: "Calculation History", icon: History },
    { id: "guide", label: "Grading Guide", icon: HelpCircle },
  ];

  const handleScroll = (id: string) => {
    setActiveSection(id);
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
      {/* Top University Branding Bar */}
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-3 px-6 sm:px-8 select-none border-b border-slate-100 dark:border-slate-800 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4 flex-col sm:flex-row text-center sm:text-left">
            {/* Real Official JNTUK Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/jntuk_logo.png" 
              alt="JNTUK Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 filter dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
            />
            <div className="flex flex-col">
              <h1 className="text-blue-700 dark:text-blue-400 font-black text-base sm:text-lg md:text-xl tracking-wide uppercase leading-none">
                JNTUK KAKINADA
              </h1>
              <h2 className="text-amber-600 dark:text-amber-500 font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-tight mt-1">
                Jawaharlal Nehru Technological University, Kakinada.
              </h2>
              <div className="text-emerald-600 dark:text-emerald-500 font-bold text-xs sm:text-sm md:text-base tracking-tight leading-normal mt-0.5">
                జవహర్‌లాల్ నెహ్రూ సాంకేతిక విశ్వవిద్యాలయం, కాకినాడ.
              </div>
              <p className="text-red-800 dark:text-red-400 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase mt-1 italic leading-none">
                Effective People Effective Culture
              </p>
            </div>
          </div>
          {/* Subtle Right Portal Info */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span>R20 & R23 Regulations Active</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Title */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                JNTUK
              </span>
              <span className="text-xs font-bold block text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
                CGPA Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Toggle Theme"
            >
              {!mounted ? (
                <div className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
              ) : theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
