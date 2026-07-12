"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  Copy,
  Share2,
  History,
  RotateCcw,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Award,
  ChevronRight,
} from "lucide-react";
import { JNTUK_SYLLABUS, JNTUK_GRADE_POINTS, JNTUK_BRANCHES, Subject } from "../data/syllabus";
import { cn } from "../lib/utils";

interface SGPACalculatorProps {
  onSaveHistory: (item: {
    id: string;
    type: "SGPA";
    regulation: string;
    semester: string;
    score: number;
    details: {
      subjects: Array<{ name: string; credits: number; grade: string }>;
      totalCredits: number;
    };
    date: string;
  }) => void;
}

interface SelectedSubject extends Subject {
  grade: string;
}

function generateId(prefix: string): string {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

export default function SGPACalculator({ onSaveHistory }: SGPACalculatorProps) {
  const [branch, setBranch] = useState<string>("CSE");
  const [regulation, setRegulation] = useState<"R20" | "R23">("R23");
  const [semester, setSemester] = useState<string>("1-1");
  const [subjects, setSubjects] = useState<SelectedSubject[]>(() => {
    const list = JNTUK_SYLLABUS["R23"]["CSE"]["1-1"] || [];
    return list.map((sub) => ({
      ...sub,
      grade: "",
    }));
  });
  const [alertMsg, setAlertMsg] = useState<{ type: "error" | "success" | "info"; text: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Hidden print-optimized element reference
  const reportRef = useRef<HTMLDivElement>(null);

  const semesters = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

  // Handle Regulation Change explicitly
  const handleRegulationChange = (newReg: "R20" | "R23") => {
    setRegulation(newReg);
    const branchSyllabus = JNTUK_SYLLABUS[newReg][branch] || {};
    const list = branchSyllabus[semester] || [];
    setSubjects(
      list.map((sub) => ({
        ...sub,
        grade: "",
      }))
    );
    setAlertMsg(null);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Handle Branch Change explicitly
  const handleBranchChange = (newBranch: string) => {
    setBranch(newBranch);
    const branchSyllabus = JNTUK_SYLLABUS[regulation][newBranch] || {};
    const list = branchSyllabus[semester] || [];
    setSubjects(
      list.map((sub) => ({
        ...sub,
        grade: "",
      }))
    );
    setAlertMsg(null);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Handle Semester Change explicitly
  const handleSemesterChange = (newSem: string) => {
    setSemester(newSem);
    const branchSyllabus = JNTUK_SYLLABUS[regulation][branch] || {};
    const list = branchSyllabus[newSem] || [];
    setSubjects(
      list.map((sub) => ({
        ...sub,
        grade: "",
      }))
    );
    setAlertMsg(null);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Add a new custom subject row
  const handleAddSubject = () => {
    const newSub: SelectedSubject = {
      id: generateId("custom"),
      name: `Custom Subject ${subjects.length + 1}`,
      credits: 3,
      grade: "",
    };
    setSubjects([...subjects, newSub]);
    setIsSaved(false);
    setIsCopied(false);
  };

  // Remove a subject
  const handleRemoveSubject = (id: string) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
    setIsSaved(false);
    setIsCopied(false);
  };

  // Update subject details inline
  const handleUpdateSubject = (id: string, field: "name" | "credits" | "grade", value: any) => {
    setSubjects(
      subjects.map((sub) => {
        if (sub.id === id) {
          if (field === "credits") {
            const numericValue = parseFloat(value) || 0;
            return { ...sub, [field]: numericValue };
          }
          return { ...sub, [field]: value };
        }
        return sub;
      })
    );
    setIsSaved(false);
    setIsCopied(false);
  };

  // Calculations
  const totalCredits = subjects.reduce((sum, sub) => sum + sub.credits, 0);

  // Filter out subjects that don't have a grade selected yet
  const gradedSubjects = subjects.filter((sub) => sub.grade !== "");

  const weightedPoints = gradedSubjects.reduce((sum, sub) => {
    const points = JNTUK_GRADE_POINTS[sub.grade] ?? 0;
    return sum + sub.credits * points;
  }, 0);

  const sgpa = totalCredits > 0 ? parseFloat((weightedPoints / totalCredits).toFixed(2)) : 0;

  // Check if there are any unselected grades
  const hasUnselectedGrades = subjects.some((sub) => sub.grade === "");

  // Reset the form
  const handleReset = () => {
    const branchSyllabus = JNTUK_SYLLABUS[regulation][branch] || {};
    const list = branchSyllabus[semester] || [];
    setSubjects(
      list.map((sub) => ({
        ...sub,
        grade: "",
      }))
    );
    setAlertMsg({ type: "info", text: "Calculator cleared and reset to default syllabus." });
    setIsSaved(false);
    setIsCopied(false);
    setTimeout(() => setAlertMsg(null), 3000);
  };

  // Save to history list
  const handleSaveToHistory = () => {
    if (subjects.length === 0) {
      setAlertMsg({ type: "error", text: "No subjects to calculate. Please add some subjects." });
      return;
    }
    if (hasUnselectedGrades) {
      setAlertMsg({ type: "error", text: "Please select a grade for all subjects before saving." });
      return;
    }

    onSaveHistory({
      id: generateId("sgpa"),
      type: "SGPA",
      regulation: `${regulation} (${branch})`,
      semester,
      score: sgpa,
      details: {
        subjects: subjects.map((sub) => ({
          name: sub.name,
          credits: sub.credits,
          grade: sub.grade,
        })),
        totalCredits,
      },
      date: new Date().toLocaleString(),
    });

    setIsSaved(true);
    setAlertMsg({ type: "success", text: "Calculations saved to history successfully!" });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Copy results as plain text
  const handleCopyResults = () => {
    if (hasUnselectedGrades) {
      setAlertMsg({ type: "error", text: "Please complete all grades before copying." });
      return;
    }

    const subjectText = subjects
      .map((s) => `- ${s.name} (${s.credits} Credits): Grade ${s.grade}`)
      .join("\n");

    const textToCopy = `JNTUK SGPA CALCULATION SUMMARY
---------------------------------
Regulation: ${regulation}
Department: ${branch}
Semester: ${semester}
Total Credits: ${totalCredits}
Calculated SGPA: ${sgpa.toFixed(2)}
---------------------------------
Semester Subjects:
${subjectText}

Generated via JNTUK CGPA Calculator.`;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setAlertMsg({ type: "success", text: "Calculation report copied to clipboard!" });
    setTimeout(() => {
      setIsCopied(false);
      setAlertMsg(null);
    }, 3000);
  };



  const handleShare = () => {
    if (hasUnselectedGrades) {
      setAlertMsg({ type: "error", text: "Please select all grades before sharing." });
      return;
    }

    const shareData = {
      title: "My JNTUK SGPA Result",
      text: `I calculated my JNTUK ${regulation} (${branch}) Sem ${semester} SGPA: ${sgpa.toFixed(2)} using the JNTUK CGPA Calculator! Check it out!`,
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
    <div className="w-full" id="sgpa">
      {/* Tab Header Description */}
      <div className="mb-8">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="p-1.5 bg-blue-500 rounded-lg text-white">
            <Award className="w-5 h-5" />
          </span>
          SGPA Calculator
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
          Select your Regulation & Semester to retrieve official syllabus subjects. Enter your grades to dynamically compute your SGPA.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: inputs and settings (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Regulation, Branch & Semester Selectors */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Regulation Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    1. Regulation
                  </label>
                  <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl">
                    {["R20", "R23"].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => handleRegulationChange(reg as "R20" | "R23")}
                        className={cn(
                          "flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer",
                          regulation === reg
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        )}
                      >
                        {reg} Regulation
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    2. Department / Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => handleBranchChange(e.target.value)}
                    className="w-full py-2 px-3.5 text-xs font-bold rounded-xl border bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all h-[38px]"
                  >
                    {JNTUK_BRANCHES.map((b) => (
                      <option key={b.code} value={b.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                        {b.code} ({b.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Semester Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  3. Select Semester
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {semesters.map((sem) => (
                    <button
                      key={sem}
                      onClick={() => handleSemesterChange(sem)}
                      className={cn(
                        "py-2 text-xs font-bold rounded-lg transition-all duration-200 border cursor-pointer",
                        semester === sem
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-400 font-extrabold"
                          : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      Sem {sem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Table / Form Cards */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                Syllabus & Course Grades ({subjects.length} Subjects)
              </h4>
              <button
                onClick={handleAddSubject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:hover:bg-blue-950/70 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>

            {/* Alert / Notification box inside */}
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

            {subjects.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-slate-400 dark:text-slate-500 font-medium text-sm">
                  No courses listed. Click &quot;Add Course&quot; above to create custom rows.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                {subjects.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    layoutId={`sub-card-${sub.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30 hover:border-slate-200 dark:hover:border-slate-800 transition-colors"
                  >
                    {/* Index */}
                    <span className="hidden sm:inline-flex w-6 h-6 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-extrabold text-slate-500 select-none">
                      {idx + 1}
                    </span>

                    {/* Subject Name Input */}
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => handleUpdateSubject(sub.id, "name", e.target.value)}
                        className="w-full font-semibold text-sm bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none text-slate-800 dark:text-slate-200 py-0.5 truncate transition-all"
                        placeholder="Subject Name"
                      />
                    </div>

                    {/* Credits Input */}
                    <div className="flex items-center gap-2 sm:shrink-0">
                      <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-2.5 py-1">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wide">
                          Credits
                        </span>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="15"
                          value={sub.credits}
                          onChange={(e) => handleUpdateSubject(sub.id, "credits", e.target.value)}
                          className="w-9 text-center bg-transparent focus:outline-none font-bold text-sm text-slate-800 dark:text-white"
                        />
                      </div>

                      {/* Grade Selector */}
                      <select
                        value={sub.grade}
                        onChange={(e) => handleUpdateSubject(sub.id, "grade", e.target.value)}
                        className={cn(
                          "px-3 py-1.5 text-xs font-extrabold rounded-lg border focus:outline-none transition-all cursor-pointer min-w-[100px]",
                          sub.grade === ""
                            ? "bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800"
                            : sub.grade === "F" || sub.grade === "Absent"
                            ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/40 dark:border-red-900/40 dark:text-red-400"
                            : "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-400"
                        )}
                      >
                        <option value="" disabled className="text-slate-400">
                          Grade
                        </option>
                        {Object.keys(JNTUK_GRADE_POINTS).map((g) => (
                          <option key={g} value={g} className="text-slate-800 dark:text-slate-200 font-bold">
                            {g} ({JNTUK_GRADE_POINTS[g]} Pts)
                          </option>
                        ))}
                      </select>

                      {/* Delete Action */}
                      <button
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="p-1.5 rounded-lg border border-slate-100 hover:border-red-200 dark:border-transparent hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-all cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Dashboard: dynamic results display (Span 1) */}
        <div className="space-y-6">
          {/* Animated Results Gauge Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex flex-col items-center transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-bl-full pointer-events-none" />

            <h4 className="font-extrabold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest text-center mb-6">
              Calculated Semester SGPA
            </h4>

            {/* Circular Gauge / Score Circle */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-6">
              {/* Decorative radial rings */}
              <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800" />
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="66"
                  fill="none"
                  stroke={sgpa >= 8.0 ? "#10b981" : sgpa >= 7.0 ? "#3b82f6" : sgpa >= 5.0 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="8"
                  strokeDasharray="415.6"
                  strokeDashoffset={415.6 - (415.6 * (gradedSubjects.length > 0 ? sgpa : 0)) / 10}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="z-10 flex flex-col items-center select-none">
                <span className="text-4xl font-black text-slate-800 dark:text-white leading-none font-mono">
                  {gradedSubjects.length > 0 ? sgpa.toFixed(2) : "0.00"}
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1 tracking-wider">
                  Out of 10.0
                </span>
              </div>
            </div>

            {/* Micro details */}
            <div className="w-full grid grid-cols-2 gap-3 py-3 border-t border-b border-slate-100 dark:border-slate-800 text-center mb-6">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Total Credits
                </span>
                <span className="text-lg font-black text-slate-800 dark:text-white">
                  {totalCredits}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Weighted Pts
                </span>
                <span className="text-lg font-black text-slate-800 dark:text-white">
                  {weightedPoints}
                </span>
              </div>
            </div>

            {/* Progress indicators or classification */}
            {gradedSubjects.length > 0 && (
              <div className="w-full text-center px-2 py-1.5 rounded-lg mb-6 text-xs font-bold uppercase tracking-wider bg-slate-50 dark:bg-slate-950/40">
                {sgpa >= 8.0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                    First Class with Distinction 🌟
                  </span>
                ) : sgpa >= 6.5 ? (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                    First Class 👍
                  </span>
                ) : sgpa >= 5.0 ? (
                  <span className="text-amber-600 dark:text-amber-500 flex items-center justify-center gap-1">
                    Second Class / Pass
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
                    Needs Improvement / Fail
                  </span>
                )}
              </div>
            )}

            {/* Action Panel */}
            <div className="w-full space-y-2.5">
              <button
                onClick={handleSaveToHistory}
                disabled={subjects.length === 0}
                className={cn(
                  "w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm border transition-all",
                  isSaved
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400"
                    : "bg-blue-600 text-white border-transparent hover:bg-blue-700 shadow-blue-500/10 hover:shadow-md"
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

          {/* Quick Guide Sidebar Item */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/50 border border-indigo-100/50 dark:border-slate-800 shadow-sm text-xs space-y-2.5">
            <h5 className="font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0" />
              Syllabus Coverage Info
            </h5>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We cover standard Computer Science and Engineering courses for R20 and R23 Regulations. If you belong to another branch (ECE, EEE, CIVIL, etc.), simply click **&quot;Add Course&quot;** or edit existing rows inline.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
