"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Trash2,
  Calendar,
  Award,
  GraduationCap,
  Calculator,
  HelpCircle,
  ArchiveX,
  AlertCircle,
} from "lucide-react";
import { cn } from "../lib/utils";
import { JNTUK_GRADE_POINTS } from "../data/syllabus";

interface HistoryItem {
  id: string;
  type: "SGPA" | "CGPA";
  regulation: string;
  semester: string;
  score: number;
  date: string;
  details?: any;
}

interface HistorySectionProps {
  history: HistoryItem[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function HistorySection({ history, onDelete, onClearAll }: HistorySectionProps) {
  const [mounted, setMounted] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const logoUrl = mounted ? `${window.location.origin}/jntuk_logo.png` : "/jntuk_logo.png";

  return (
    <div className="w-full" id="history">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500 rounded-lg text-white">
              <Trash2 className="w-5 h-5" />
            </span>
            Saved Calculations History
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
            View recently calculated SGPA and CGPA records saved to your local web storage. Calculations are stored only on your device.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex flex-wrap gap-2.5 self-start sm:self-center">
            <button
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-950/40 transition-all cursor-pointer"
            >
              <ArchiveX className="w-4 h-4 shrink-0" /> Clear All History
            </button>
          </div>
        )}
      </div>

      {/* Alert / Notification banner */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border",
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

      {history.length === 0 ? (
        <div className="p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center bg-white dark:bg-slate-900 transition-colors">
          <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h4 className="font-extrabold text-slate-700 dark:text-slate-300 text-base">No history records found</h4>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-1.5 max-w-sm mx-auto">
            Calculate your SGPA or CGPA above and click **&quot;Save to History&quot;** to preserve your grades and transcripts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              {/* Type Badge Background Accent */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-20 h-20 rounded-bl-full pointer-events-none opacity-10",
                  item.type === "SGPA" ? "bg-blue-500" : "bg-indigo-500"
                )}
              />

              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-1",
                      item.type === "SGPA"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                        : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                    )}
                  >
                    {item.type === "SGPA" ? <Calculator className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                    {item.type}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" />
                    {item.date.split(",")[0]}
                  </span>
                </div>

                {/* Score & Regulation details */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-800 dark:text-white leading-none font-mono">
                    {item.score.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    GPA
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium py-2.5 border-t border-b border-slate-50 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Reg: <strong className="text-slate-700 dark:text-slate-200">{item.regulation}</strong></span>
                  </div>
                  <div>
                    <span>Scope: <strong className="text-slate-700 dark:text-slate-200">{item.semester}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.date.split(",")[1]?.trim() || ""}
                </span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

