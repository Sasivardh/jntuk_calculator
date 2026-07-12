import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function triggerPrint(type: "sgpa" | "cgpa" | "history") {
  if (typeof window === "undefined") return;
  // Clear any existing printing classes
  document.body.classList.remove("printing-sgpa", "printing-cgpa", "printing-history");
  
  // Add the specific printing class
  document.body.classList.add(`printing-${type}`);
  
  // Trigger print
  window.print();
  
  // When print dialog closes, we clean up
  setTimeout(() => {
    document.body.classList.remove(`printing-${type}`);
  }, 500);
}
