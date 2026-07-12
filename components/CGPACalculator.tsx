"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Share2,
  History,
  RotateCcw,
  Check,
  AlertCircle,
  GraduationCap,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { JNTUK_BRANCHES, getSemesterCredits } from "../data/syllabus";

interface CGPACalculatorProps {
  onSaveHistory: (item: {
    id: string;
    type: "CGPA";
    regulation: string;
    semester: string; // e.g. "Overall" or last completed
    score: number;
    details: {
      semesters: Array<{ name: string; sgpa: number; credits: number; completed: boolean }>;
      percentage: number;
      method: string;
    };
    date: string;
  }) => void;
}

interface SemesterInput {
  name: string;
  sgpa: number;
  credits: number;
  completed: boolean;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

export default function CGPACalculator({ onSaveHistory }: CGPACalculatorProps) {
  const [branch, setBranch] = useState<string>("CSE");
  const [regulation, setRegulation] = useState<"R20" | "R23">("R23");
  const [useWeighted, setUseWeighted] = useState<boolean>(true);
  const [semesters, setSemesters] = useState<SemesterInput[]>(() => {
    const list = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
    return list.map((name, idx) => ({
      name,
      sgpa: 0,
      credits: getSemesterCredits("R23", "CSE", name),
      completed: idx === 0,
    }));
  });
  const [alertMsg, setAlertMsg] = useState<{ type: "error" | "success" | "info"; text: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const reportRef = useRef<HTMLDivElement>(null);

  // Explicitly handle regulation change to avoid useEffect
  const handleRegulationChange = (newReg: "R20" | "R23") => {
    setRegulation(newReg);
    setSemesters(
      semesters.map((sem) => ({
        ...sem,
        credits: getSemesterCredits(newReg, branch, sem.name),
      }))
    );
    setAlertMsg(null);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Explicitly handle branch change
  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    setSemesters(
      semesters.map((sem) => ({
        ...sem,
        credits: getSemesterCredits(regulation, newBranch, sem.name),
      }))
    );
    setAlertMsg(null);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Update specific semester values
  const handleUpdateSemester = (name: string, field: "sgpa" | "credits" | "completed", value: any) => {
    setSemesters(
      semesters.map((sem) => {
        if (sem.name === name) {
          if (field === "sgpa") {
            let val = parseFloat(value) || 0;
            if (val > 10) val = 10;
            if (val < 0) val = 0;
            return { ...sem, [field]: val };
          }
          if (field === "credits") {
            const val = parseFloat(value) || 0;
            return { ...sem, [field]: val };
          }
          return { ...sem, [field]: value };
        }
        return sem;
      })
    );
    setIsSaved(false);
    setIsCopied(false);
  };

  // Calculations
  const completedSemesters = semesters.filter((sem) => sem.completed && sem.sgpa > 0);
  const totalCompleted = completedSemesters.length;

  let cgpa = 0;
  let totalCredits = 0;

  if (totalCompleted > 0) {
    if (useWeighted) {
      const sumWeighted = completedSemesters.reduce((sum, s) => sum + s.sgpa * s.credits, 0);
      const sumCredits = completedSemesters.reduce((sum, s) => sum + s.credits, 0);
      cgpa = sumCredits > 0 ? sumWeighted / sumCredits : 0;
      totalCredits = sumCredits;
    } else {
      const sumSgpa = completedSemesters.reduce((sum, s) => sum + s.sgpa, 0);
      cgpa = sumSgpa / totalCompleted;
    }
  }

  // JNTUK official Percentage Formula: (CGPA - 0.75) * 10
  const percentage = cgpa > 0.75 ? (cgpa - 0.75) * 10 : 0;

  // Reset Form
  const handleReset = () => {
    setSemesters(
      semesters.map((sem, idx) => ({
        ...sem,
        sgpa: 0,
        credits: getSemesterCredits(regulation, branch, sem.name),
        completed: idx === 0,
      }))
    );
    setAlertMsg({ type: "info", text: "CGPA Calculator reset successfully." });
    setIsSaved(false);
    setIsCopied(false);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  // Save to History
  const handleSaveToHistory = () => {
    if (totalCompleted === 0) {
      setAlertMsg({
        type: "error",
        text: "Please enter your SGPA for at least one semester to calculate CGPA.",
      });
      return;
    }

    onSaveHistory({
      id: generateId("cgpa"),
      type: "CGPA",
      regulation: `${regulation} (${branch})`,
      semester: `Completed: ${totalCompleted} Sem`,
      score: parseFloat(cgpa.toFixed(2)),
      details: {
        semesters: semesters.map((sem) => ({ ...sem })),
        percentage: parseFloat(percentage.toFixed(1)),
        method: useWeighted ? "Credit Weighted" : "Direct Average",
      },
      date: new Date().toLocaleString(),
    });

    setIsSaved(true);
    setAlertMsg({ type: "success", text: "CGPA calculation saved to history successfully!" });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Copy plain text summary
  const handleCopyResults = () => {
    if (totalCompleted === 0) {
      setAlertMsg({ type: "error", text: "No semester records found to copy." });
      return;
    }

    const semesterSummary = completedSemesters
      .map((s) => `- Semester ${s.name}: SGPA ${s.sgpa.toFixed(2)} (${s.credits} Credits)`)
      .join("\n");

    const textToCopy = `JNTUK CGPA CALCULATION SUMMARY
---------------------------------
Regulation: ${regulation}
Department: ${branch}
Calculation Method: ${useWeighted ? "Credit-Weighted Average" : "Simple Direct Average"}
Total Completed Semesters: ${totalCompleted}
Overall CGPA: ${cgpa.toFixed(2)}
Equivalent JNTUK Percentage: ${percentage.toFixed(1)}%
Formula: (CGPA - 0.75) × 10
---------------------------------
Semester Breakdown:
${semesterSummary}

Generated via JNTUK CGPA Calculator.`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setAlertMsg({ type: "success", text: "CGPA report copied to clipboard!" });
    setTimeout(() => {
      setIsCopied(false);
      setAlertMsg(null);
    }, 3000);
  };



  const handleShare = () => {
    if (totalCompleted === 0) {
      setAlertMsg({ type: "error", text: "Please enter scores before sharing." });
      return;
    }

    const shareData = {
      title: "My JNTUK CGPA Report",
      text: `I completed ${totalCompleted} semesters in JNTUK ${regulation} (${branch}) with an overall CGPA of ${cgpa.toFixed(2)} (${percentage.toFixed(1)}% equivalent)! Check yours today!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        handleCopyResults();
      });
    } else {
      handleCopyResults();
    }
  };

  const logoUrl = mounted ? `${window.location.origin}/jntuk_logo.png` : "/jntuk_logo.png";

  return (
    <div className="w-full" id="cgpa">
      {/* Title Details */}
      <div className="mb-8">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="p-1.5 bg-indigo-600 rounded-lg text-white">
            <GraduationCap className="w-5 h-5" />
          </span>
          CGPA Calculator
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
          Mark semesters you have completed, input your SGPA scores, and see your cumulative overall CGPA alongside official JNTUK percentage conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Input Fields (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Settings Panel */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {/* Regulation choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Select Regulation
                </label>
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl h-[38px]">
                  {["R20", "R23"].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => handleRegulationChange(reg as "R20" | "R23")}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer h-full",
                        regulation === reg
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Department selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Department / Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => handleBranchChange(e.target.value)}
                  className="w-full py-2 px-3 text-xs font-bold rounded-xl border bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all h-[38px]"
                >
                  {JNTUK_BRANCHES.map((b) => (
                    <option key={b.code} value={b.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {b.code} ({b.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Weighted Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Calculation Method
                </label>
                <button
                  onClick={() => setUseWeighted(!useWeighted)}
                  className="flex items-center justify-between w-full px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer text-left h-[38px] bg-slate-100 dark:bg-slate-950"
                >
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate">
                    {useWeighted ? "Weighted Avg" : "Simple Avg"}
                  </span>
                  <div className="text-blue-600 dark:text-blue-400 shrink-0">
                    {useWeighted ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Semesters Input Matrix */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h4 className="font-extrabold text-slate-800 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              Semester SGPA Matrix
            </h4>

            {/* Alert Box inside form */}
            <AnimatePresence>
              {alertMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "mb-4 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 border",
                    alertMsg.type === "error"
                      ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400"
                      : alertMsg.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/30 text-blue-600 dark:text-blue-400"
                  )}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{alertMsg.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semesters.map((sem) => (
                <div
                  key={sem.name}
                  className={cn(
                    "p-4 rounded-xl border flex items-center justify-between transition-all duration-300",
                    sem.completed
                      ? "bg-indigo-50/20 border-indigo-100 dark:bg-slate-950/30 dark:border-slate-800"
                      : "bg-slate-50/50 border-slate-100 dark:bg-slate-950/10 dark:border-transparent opacity-60 hover:opacity-80"
                  )}
                >
                  {/* Left completed checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`completed-${sem.name}`}
                      checked={sem.completed}
                      onChange={(e) => handleUpdateSemester(sem.name, "completed", e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-800 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`completed-${sem.name}`}
                      className="text-sm font-extrabold text-slate-700 dark:text-slate-200 cursor-pointer select-none"
                    >
                      Semester {sem.name}
                    </label>
                  </div>

                  {/* Input fields */}
                  <div className="flex items-center gap-2">
                    {/* SGPA Input */}
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                        SGPA Score
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        placeholder="0.00"
                        disabled={!sem.completed}
                        value={sem.sgpa || ""}
                        onChange={(e) => handleUpdateSemester(sem.name, "sgpa", e.target.value)}
                        className={cn(
                          "w-16 px-2 py-1 text-center font-bold text-sm rounded-lg border focus:outline-none transition-all font-mono",
                          sem.completed
                            ? "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-white focus:border-blue-500"
                            : "bg-slate-100 dark:bg-slate-900 border-transparent text-slate-400 select-none"
                        )}
                      />
                    </div>

                    {/* Credits Input if weighted is checked */}
                    {useWeighted && (
                      <div className="flex flex-col items-end w-14">
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                          Credits
                        </span>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          disabled={!sem.completed}
                          value={sem.credits || ""}
                          onChange={(e) => handleUpdateSemester(sem.name, "credits", e.target.value)}
                          className={cn(
                            "w-full px-1 py-1 text-center font-semibold text-xs rounded-lg border focus:outline-none transition-all font-mono",
                            sem.completed
                              ? "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-500 dark:text-slate-400 focus:border-blue-500"
                              : "bg-slate-100 dark:bg-slate-900 border-transparent text-slate-400 select-none"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Dashboard Gauge and metrics */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col items-center relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 rounded-bl-full pointer-events-none" />

            <h4 className="font-extrabold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest text-center mb-6">
              Cumulative Overall CGPA
            </h4>

            {/* Circular Gauge / Score Circle */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800" />
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="66"
                  fill="none"
                  stroke={cgpa >= 8.0 ? "#6366f1" : cgpa >= 7.0 ? "#3b82f6" : cgpa >= 5.0 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="8"
                  strokeDasharray="415.6"
                  strokeDashoffset={415.6 - (415.6 * (totalCompleted > 0 ? cgpa : 0)) / 10}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="z-10 flex flex-col items-center select-none">
                <span className="text-4xl font-black text-slate-800 dark:text-white leading-none font-mono">
                  {totalCompleted > 0 ? cgpa.toFixed(2) : "0.00"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1 tracking-wider">
                  Cumulative GPA
                </span>
              </div>
            </div>

            {/* Micro Metrics Percentage and Semesters */}
            <div className="w-full grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 dark:border-slate-800 text-center mb-6">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Equivalent %
                </span>
                <span className="text-lg font-black text-slate-800 dark:text-white font-mono">
                  {totalCompleted > 0 ? `${percentage.toFixed(1)}%` : "0.0%"}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Completed Sems
                </span>
                <span className="text-lg font-black text-slate-800 dark:text-white font-mono">
                  {totalCompleted} / 8
                </span>
              </div>
            </div>

            {/* Formula explanation indicator */}
            {totalCompleted > 0 && (
              <div className="w-full text-center p-3 rounded-xl mb-6 bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80">
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  JNTUK CONVERSION FORMULA
                </div>
                <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-1 font-mono">
                  Percentage = (CGPA - 0.75) × 10
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  According to official JNTUK guidelines, 0.75 is subtracted from CGPA and then multiplied by 10 to obtain final equivalent percentage.
                </p>
              </div>
            )}

            {/* Actions Panel */}
            <div className="w-full space-y-2.5">
              <button
                onClick={handleSaveToHistory}
                disabled={totalCompleted === 0}
                className={cn(
                  "w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border transition-all",
                  isSaved
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-indigo-600 text-white border-transparent hover:bg-indigo-700 shadow-indigo-500/10 hover:shadow-md"
                )}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <History className="w-4 h-4" />}
                {isSaved ? "Saved to History" : "Save to History"}
              </button>



              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyResults}
                  className={cn(
                    "py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all",
                    isCopied
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {isCopied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={handleShare}
                  className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Calculator
              </button>
            </div>
          </div>

          {/* Target GPA Planner card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900/60 dark:to-slate-900/30 border border-indigo-100/40 dark:border-slate-800/80 shadow-sm space-y-3">
            <h5 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Target CGPA Guide
            </h5>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">
              Want to cross **8.0 CGPA (Distinction)**? Check which semesters are below average and recalculate with target SGPAs to plan your upcoming semesters!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
