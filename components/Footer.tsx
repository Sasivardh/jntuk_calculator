"use client";

import React from "react";
import { GraduationCap, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Crest representation */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 text-blue-600 dark:text-blue-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-sm font-bold tracking-widest text-slate-800 dark:text-slate-200 block uppercase">
              JNTUK CGPA Calculator
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider block uppercase">
              Unofficial Academic Portal
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed italic">
          <strong>Disclaimer:</strong> This calculator is created for educational purposes only and is not affiliated with, authorized, or endorsed by Jawaharlal Nehru Technological University Kakinada (JNTUK). All syllabi, course catalogs, grading systems, and formulas are compiled based on publicly available university catalogs and student reports. Always check with your respective college departments for official grade sheets and transcripts.
        </div>

        {/* Links bar */}
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-400 dark:text-slate-500">
          <a
            href="https://www.jntuk.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1"
          >
            Official JNTUK Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Copyrights & Developer credits */}
        <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <span>
            © {currentYear} JNTUK CGPA Calculator. Designed & built for engineering students.
          </span>
          <span className="flex items-center gap-1">
            Developed with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for JNTUK Students
          </span>
        </div>
      </div>
    </footer>
  );
}
