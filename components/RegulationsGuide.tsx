"use client";

import React from "react";
import { HelpCircle, FileText, Bookmark, ClipboardList, Info, GraduationCap } from "lucide-react";

export default function RegulationsGuide() {
  const gradesTable = [
    { grade: "S", performance: "Outstanding", points: 10, range: "90% to 100%" },
    { grade: "A", performance: "Excellent", points: 9, range: "80% to 89%" },
    { grade: "B", performance: "Very Good", points: 8, range: "70% to 79%" },
    { grade: "C", performance: "Good", points: 7, range: "60% to 69%" },
    { grade: "D", performance: "Above Average", points: 6, range: "50% to 59%" },
    { grade: "E", performance: "Average", points: 5, range: "40% to 49%" },
    { grade: "F", performance: "Fail", points: 0, range: "Below 40%" },
    { grade: "Absent", performance: "Absent", points: 0, range: "-" },
  ];

  return (
    <div className="w-full space-y-8" id="guide">
      {/* Title */}
      <div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="p-1.5 bg-blue-500 rounded-lg text-white">
            <HelpCircle className="w-5 h-5" />
          </span>
          Grading & Regulations Guide
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">
          Familiarize yourself with Jawaharlal Nehru Technological University Kakinada (JNTUK) official Academic Regulations, Credit Weightings, and Percentage Conversions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Table representation */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h4 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            JNTUK Official Scale
          </h4>
          <p className="text-slate-400 dark:text-slate-500 text-xs mb-4">
            Both R20 and R23 regulations adopt a 10-point absolute letter grading system as per JNTUK academic guidelines.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase">
                  <th className="py-2.5">Letter Grade</th>
                  <th className="py-2.5">Performance</th>
                  <th className="py-2.5 text-center">Grade Points</th>
                  <th className="py-2.5 text-right">Marks Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {gradesTable.map((g) => (
                  <tr key={g.grade} className="text-slate-600 dark:text-slate-300 font-medium">
                    <td className="py-2.5 font-bold text-slate-800 dark:text-white">{g.grade}</td>
                    <td className="py-2.5">{g.performance}</td>
                    <td className="py-2.5 text-center font-bold text-blue-600 dark:text-blue-400">{g.points}</td>
                    <td className="py-2.5 text-right font-mono text-slate-400">{g.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Explainer */}
        <div className="space-y-6">
          {/* Classification Info Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
              Award of Degree Division
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              <div className="flex gap-2 p-2 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-900/30">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">CGPA ≥ 8.0</span>
                <span>Awarded **First Class with Distinction** (provided all subjects cleared in first attempt).</span>
              </div>

              <div className="flex gap-2 p-2 rounded-lg bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30">
                <span className="text-blue-600 dark:text-blue-400 font-bold">CGPA ≥ 6.5</span>
                <span>Awarded **First Class** (cumulative CGPA score is between 6.5 and 7.99).</span>
              </div>

              <div className="flex gap-2 p-2 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30">
                <span className="text-amber-600 dark:text-amber-500 font-bold">CGPA ≥ 5.5</span>
                <span>Awarded **Second Class** (cumulative CGPA score is between 5.5 and 6.49).</span>
              </div>

              <div className="flex gap-2 p-2 rounded-lg bg-slate-100/40 dark:bg-slate-950/20 border border-slate-200/30 dark:border-slate-800/30">
                <span className="text-slate-600 dark:text-slate-400 font-bold">CGPA ≥ 5.0</span>
                <span>Awarded **Pass Class** (cumulative CGPA score is between 5.0 and 5.49).</span>
              </div>
            </div>
          </div>

          {/* Formulas Explanation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900/60 dark:to-slate-900/30 border border-blue-100/40 dark:border-slate-800/80 space-y-4">
            <h4 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Formula Insights
            </h4>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div>
                <span className="font-bold block text-slate-800 dark:text-white uppercase tracking-wider mb-1">
                  SGPA (Semester Grade Point Average)
                </span>
                <p className="leading-relaxed mb-2">
                  Calculated by taking the sum of weighted grade points earned across all courses in that semester and dividing by the sum of corresponding course credits:
                </p>
                <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[10px] text-center font-bold text-indigo-600 dark:text-indigo-400">
                  SGPA = Σ (Course Credits × Grade Points) / Σ (Course Credits)
                </div>
              </div>

              <div>
                <span className="font-bold block text-slate-800 dark:text-white uppercase tracking-wider mb-1">
                  CGPA (Cumulative Grade Point Average)
                </span>
                <p className="leading-relaxed mb-2">
                  Calculated similarly over all completed semesters, representing cumulative weighted performance:
                </p>
                <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[10px] text-center font-bold text-indigo-600 dark:text-indigo-400">
                  CGPA = Σ (SGPA_i × Sem Credits_i) / Σ (Sem Credits_i)
                </div>
              </div>

              <div>
                <span className="font-bold block text-slate-800 dark:text-white uppercase tracking-wider mb-1">
                  Percentage Conversion (Official Formula)
                </span>
                <p className="leading-relaxed mb-2">
                  JNTUK officially utilizes the percentage scaling rule which maps the CGPA minus 0.75 multiplied by 10.
                </p>
                <div className="p-2 rounded bg-white dark:bg-slate-900 font-mono text-[10px] text-center font-bold text-indigo-600 dark:text-indigo-400">
                  Percentage = (CGPA - 0.75) × 10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
