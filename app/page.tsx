"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SGPACalculator from "../components/SGPACalculator";
import CGPACalculator from "../components/CGPACalculator";
import HistorySection from "../components/HistorySection";
import RegulationsGuide from "../components/RegulationsGuide";
import Footer from "../components/Footer";
import { Calculator, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface HistoryItem {
  id: string;
  type: "SGPA" | "CGPA";
  regulation: string;
  semester: string;
  score: number;
  date: string;
}

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState<string>("sgpa");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"sgpa" | "cgpa">("sgpa");

  // Load theme and history preference on mount safely
  useEffect(() => {
    const savedTheme = localStorage.getItem("jntuk_calculator_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    const savedHistory = localStorage.getItem("jntuk_calculation_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error("Failed to load calculation history:", err);
      }
    }
  }, []);

  // Update DOM class on theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("jntuk_calculator_theme", theme);
  }, [theme]);

  // Sync scroll positioning with navigation bar
  useEffect(() => {
    const handleScrollSync = () => {
      const sections = ["sgpa", "cgpa", "history", "guide"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSync);
    return () => window.removeEventListener("scroll", handleScrollSync);
  }, []);

  // Sync print events to prepare proper stylesheet targeting
  useEffect(() => {
    const handleBeforePrint = () => {
      const hasAny = document.body.classList.contains("printing-sgpa") ||
                     document.body.classList.contains("printing-cgpa") ||
                     document.body.classList.contains("printing-history");
                     
      if (!hasAny) {
        const historyEl = document.getElementById("history");
        const historyRect = historyEl?.getBoundingClientRect();
        const isHistoryVisible = historyRect && historyRect.top < window.innerHeight && historyRect.bottom > 0;
        
        if (isHistoryVisible && history.length > 0) {
          document.body.classList.add("printing-history");
        } else {
          document.body.classList.add(`printing-${activeTab}`);
        }
      }
    };

    const handleAfterPrint = () => {
      document.body.classList.remove("printing-sgpa", "printing-cgpa", "printing-history");
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [activeTab, history]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // History callbacks
  const handleSaveHistory = (item: any) => {
    const updated = [item, ...history];
    setHistory(updated);
    localStorage.setItem("jntuk_calculation_history", JSON.stringify(updated));
  };

  const handleDeleteHistory = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("jntuk_calculation_history", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("jntuk_calculation_history");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300 no-print-content">
      {/* Universal Header with Branding & Theme Toggle */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Container */}
      <main className="flex-grow pb-16">
        {/* Immersive Hero Section */}
        <Hero onSelectSection={setActiveSection} />

        {/* Central Switch Dashboard */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl max-w-xl mx-auto transition-colors duration-300">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveTab("sgpa");
                  const el = document.getElementById("sgpa");
                  if (el) {
                    window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer",
                  activeTab === "sgpa"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
              >
                <Calculator className="w-4 h-4" />
                SGPA Calculator
              </button>

              <button
                onClick={() => {
                  setActiveTab("cgpa");
                  const el = document.getElementById("cgpa");
                  if (el) {
                    window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "flex-1 py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer",
                  activeTab === "cgpa"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
              >
                <GraduationCap className="w-4 h-4" />
                CGPA Calculator
              </button>
            </div>
          </div>
        </div>

        {/* Core Calculation Sections Wrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
          {/* Active Calculator Component (renders inside standard beautiful wrappers) */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-slate-200/50 via-white to-slate-100 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-900/20 shadow-sm border border-slate-200/50 dark:border-slate-800/30">
            <div className="bg-white/40 dark:bg-slate-950/20 backdrop-blur-3xl rounded-[22px] p-6 sm:p-8">
              {activeTab === "sgpa" ? (
                <SGPACalculator onSaveHistory={handleSaveHistory} />
              ) : (
                <CGPACalculator onSaveHistory={handleSaveHistory} />
              )}
            </div>
          </div>

          {/* Quick link button to swap between SGPA and CGPA calculators */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setActiveTab(activeTab === "sgpa" ? "cgpa" : "sgpa");
                const nextId = activeTab === "sgpa" ? "cgpa" : "sgpa";
                const el = document.getElementById(nextId);
                if (el) {
                  window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest cursor-pointer shadow-sm hover:shadow transition-all group"
            >
              Switch to {activeTab === "sgpa" ? "CGPA" : "SGPA"} Mode
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <hr className="border-slate-200/60 dark:border-slate-800/60" />

          {/* Calculation History Module */}
          <div className="scroll-mt-24">
            <HistorySection
              history={history}
              onDelete={handleDeleteHistory}
              onClearAll={handleClearHistory}
            />
          </div>

          <hr className="border-slate-200/60 dark:border-slate-800/60" />

          {/* Regulations and Guide Section */}
          <div className="scroll-mt-24">
            <RegulationsGuide />
          </div>
        </div>
      </main>

      {/* Footer with Disclaimer and University theme */}
      <Footer />
    </div>
  );
}
