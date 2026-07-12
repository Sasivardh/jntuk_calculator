export interface Subject {
  id: string;
  name: string;
  credits: number;
}

export interface SyllabusData {
  [regulation: string]: {
    [branch: string]: {
      [semester: string]: Subject[];
    };
  };
}

export const JNTUK_BRANCHES = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "ECE", name: "Electronics & Communication Engineering" },
  { code: "EEE", name: "Electrical & Electronics Engineering" },
  { code: "CIVIL", name: "Civil Engineering" },
];

export const JNTUK_SYLLABUS: SyllabusData = {
  R23: {
    CSE: {
      "1-1": [
        { id: "r23-cse-11-1", name: "Linear Algebra & Calculus", credits: 3 },
        { id: "r23-cse-11-2", name: "Engineering Physics", credits: 3 },
        { id: "r23-cse-11-3", name: "Basic Civil & Mechanical Engineering", credits: 3 },
        { id: "r23-cse-11-4", name: "Introduction to Programming", credits: 3 },
        { id: "r23-cse-11-5", name: "Communicative English", credits: 2 },
        { id: "r23-cse-11-6", name: "Engineering Physics Lab", credits: 1.5 },
        { id: "r23-cse-11-7", name: "Basic Civil & Mechanical Lab", credits: 1.5 },
        { id: "r23-cse-11-8", name: "Computer Programming Lab", credits: 1.5 },
        { id: "r23-cse-11-9", name: "IT Workshop", credits: 1 }
      ],
      "1-2": [
        { id: "r23-cse-12-1", name: "Chemistry", credits: 3 },
        { id: "r23-cse-12-2", name: "Differential Equations & Vector Calculus", credits: 3 },
        { id: "r23-cse-12-3", name: "Basic Electrical & Electronics Engineering", credits: 3 },
        { id: "r23-cse-12-4", name: "Engineering Graphics", credits: 3 },
        { id: "r23-cse-12-5", name: "Data Structures", credits: 3 },
        { id: "r23-cse-12-6", name: "Chemistry Lab", credits: 1.5 },
        { id: "r23-cse-12-7", name: "Basic Electrical & Electronics Lab", credits: 1.5 },
        { id: "r23-cse-12-8", name: "Data Structures Lab", credits: 1.5 },
        { id: "r23-cse-12-9", name: "NSS/NCC/Physical Education", credits: 0.5 }
      ],
      "2-1": [
        { id: "r23-cse-21-1", name: "Discrete Mathematics", credits: 3 },
        { id: "r23-cse-21-2", name: "Mathematical Foundations of Computer Science", credits: 3 },
        { id: "r23-cse-21-3", name: "Object Oriented Programming through Java", credits: 3 },
        { id: "r23-cse-21-4", name: "Computer Organization", credits: 3 },
        { id: "r23-cse-21-5", name: "Database Management Systems", credits: 3 },
        { id: "r23-cse-21-6", name: "OOPs through Java Lab", credits: 1.5 },
        { id: "r23-cse-21-7", name: "Database Management Systems Lab", credits: 1.5 },
        { id: "r23-cse-21-8", name: "Web Application Development (Skill Course)", credits: 2 }
      ],
      "2-2": [
        { id: "r23-cse-22-1", name: "Probability & Statistics", credits: 3 },
        { id: "r23-cse-22-2", name: "Operating Systems", credits: 3 },
        { id: "r23-cse-22-3", name: "Software Engineering", credits: 3 },
        { id: "r23-cse-22-4", name: "Design and Analysis of Algorithms", credits: 3 },
        { id: "r23-cse-22-5", name: "Theory of Computation / Compiler Design", credits: 3 },
        { id: "r23-cse-22-6", name: "Operating Systems Lab", credits: 1.5 },
        { id: "r23-cse-22-7", name: "Algorithms Lab", credits: 1.5 },
        { id: "r23-cse-22-8", name: "Real-time Web App Development (Skill Course)", credits: 2 }
      ],
      "3-1": [
        { id: "r23-cse-31-1", name: "Computer Networks", credits: 3 },
        { id: "r23-cse-31-2", name: "Artificial Intelligence", credits: 3 },
        { id: "r23-cse-31-3", name: "Formal Languages and Automata Theory", credits: 3 },
        { id: "r23-cse-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r23-cse-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r23-cse-31-6", name: "Computer Networks Lab", credits: 1.5 },
        { id: "r23-cse-31-7", name: "AI Lab", credits: 1.5 },
        { id: "r23-cse-31-8", name: "Advanced Communication Skills Lab", credits: 1.5 },
        { id: "r23-cse-31-9", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r23-cse-32-1", name: "Machine Learning", credits: 3 },
        { id: "r23-cse-32-2", name: "Cryptography & Network Security", credits: 3 },
        { id: "r23-cse-32-3", name: "Professional Elective - II", credits: 3 },
        { id: "r23-cse-32-4", name: "Professional Elective - III", credits: 3 },
        { id: "r23-cse-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r23-cse-32-6", name: "Machine Learning Lab", credits: 1.5 },
        { id: "r23-cse-32-7", name: "Security Lab", credits: 1.5 },
        { id: "r23-cse-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r23-cse-41-1", name: "Cloud Computing", credits: 3 },
        { id: "r23-cse-41-2", name: "Professional Elective - IV", credits: 3 },
        { id: "r23-cse-41-3", name: "Professional Elective - V", credits: 3 },
        { id: "r23-cse-41-4", name: "Open Elective - III", credits: 3 },
        { id: "r23-cse-41-5", name: "Open Elective - IV", credits: 3 },
        { id: "r23-cse-41-6", name: "Industry Internship / Skill Course", credits: 3 }
      ],
      "4-2": [
        { id: "r23-cse-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    ECE: {
      "1-1": [
        { id: "r23-ece-11-1", name: "Linear Algebra & Calculus", credits: 3 },
        { id: "r23-ece-11-2", name: "Engineering Physics", credits: 3 },
        { id: "r23-ece-11-3", name: "Basic Civil & Mechanical Engineering", credits: 3 },
        { id: "r23-ece-11-4", name: "Introduction to Programming", credits: 3 },
        { id: "r23-ece-11-5", name: "Communicative English", credits: 2 },
        { id: "r23-ece-11-6", name: "Engineering Physics Lab", credits: 1.5 },
        { id: "r23-ece-11-7", name: "Basic Civil & Mechanical Lab", credits: 1.5 },
        { id: "r23-ece-11-8", name: "Computer Programming Lab", credits: 1.5 },
        { id: "r23-ece-11-9", name: "IT Workshop", credits: 1 }
      ],
      "1-2": [
        { id: "r23-ece-12-1", name: "Chemistry", credits: 3 },
        { id: "r23-ece-12-2", name: "Differential Equations & Vector Calculus", credits: 3 },
        { id: "r23-ece-12-3", name: "Basic Electrical Engineering", credits: 3 },
        { id: "r23-ece-12-4", name: "Engineering Graphics", credits: 3 },
        { id: "r23-ece-12-5", name: "Electronic Devices and Circuits", credits: 3 },
        { id: "r23-ece-12-6", name: "Chemistry Lab", credits: 1.5 },
        { id: "r23-ece-12-7", name: "Basic Electrical Lab", credits: 1.5 },
        { id: "r23-ece-12-8", name: "Electronic Devices Lab", credits: 1.5 },
        { id: "r23-ece-12-9", name: "NSS/NCC/Physical Education", credits: 0.5 }
      ],
      "2-1": [
        { id: "r23-ece-21-1", name: "Network Analysis", credits: 3 },
        { id: "r23-ece-21-2", name: "Signals and Systems", credits: 3 },
        { id: "r23-ece-21-3", name: "Digital Logic Design", credits: 3 },
        { id: "r23-ece-21-4", name: "Random Variables and Stochastic Processes", credits: 3 },
        { id: "r23-ece-21-5", name: "Electrical Technology", credits: 3 },
        { id: "r23-ece-21-6", name: "Signals and Systems Lab", credits: 1.5 },
        { id: "r23-ece-21-7", name: "Electronic Circuits Lab", credits: 1.5 },
        { id: "r23-ece-21-8", name: "Soft Skills (Skill Course)", credits: 2 }
      ],
      "2-2": [
        { id: "r23-ece-22-1", name: "Control Systems", credits: 3 },
        { id: "r23-ece-22-2", name: "Electromagnetic Waves and Transmission Lines", credits: 3 },
        { id: "r23-ece-22-3", name: "Analog Communications", credits: 3 },
        { id: "r23-ece-22-4", name: "Linear IC Applications", credits: 3 },
        { id: "r23-ece-22-5", name: "Computer Architecture and Organization", credits: 3 },
        { id: "r23-ece-22-6", name: "Analog Communications Lab", credits: 1.5 },
        { id: "r23-ece-22-7", name: "Linear IC Applications Lab", credits: 1.5 },
        { id: "r23-ece-22-8", name: "Python Programming Lab", credits: 2 }
      ],
      "3-1": [
        { id: "r23-ece-31-1", name: "Microprocessors and Microcontrollers", credits: 3 },
        { id: "r23-ece-31-2", name: "Digital Communications", credits: 3 },
        { id: "r23-ece-31-3", name: "Antennas and Wave Propagation", credits: 3 },
        { id: "r23-ece-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r23-ece-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r23-ece-31-6", name: "Microprocessors and Microcontrollers Lab", credits: 1.5 },
        { id: "r23-ece-31-7", name: "Digital Communications Lab", credits: 1.5 },
        { id: "r23-ece-31-8", name: "Advanced Communication Skills Lab", credits: 1.5 },
        { id: "r23-ece-31-9", name: "VLSI Design Lab", credits: 2 }
      ],
      "3-2": [
        { id: "r23-ece-32-1", name: "Digital Signal Processing", credits: 3 },
        { id: "r23-ece-32-2", name: "VLSI Design", credits: 3 },
        { id: "r23-ece-32-3", name: "Professional Elective - II", credits: 3 },
        { id: "r23-ece-32-4", name: "Professional Elective - III", credits: 3 },
        { id: "r23-ece-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r23-ece-32-6", name: "Digital Signal Processing Lab", credits: 1.5 },
        { id: "r23-ece-32-7", name: "VLSI Lab", credits: 1.5 },
        { id: "r23-ece-32-8", name: "Technical Seminar", credits: 2 }
      ],
      "4-1": [
        { id: "r23-ece-41-1", name: "Microwave Engineering & Optical Fiber Communications", credits: 3 },
        { id: "r23-ece-41-2", name: "Professional Elective - IV", credits: 3 },
        { id: "r23-ece-41-3", name: "Professional Elective - V", credits: 3 },
        { id: "r23-ece-41-4", name: "Open Elective - III", credits: 3 },
        { id: "r23-ece-41-5", name: "Open Elective - IV", credits: 3 },
        { id: "r23-ece-41-6", name: "Industry Internship", credits: 3 }
      ],
      "4-2": [
        { id: "r23-ece-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    EEE: {
      "1-1": [
        { id: "r23-eee-11-1", name: "Linear Algebra & Calculus", credits: 3 },
        { id: "r23-eee-11-2", name: "Engineering Physics", credits: 3 },
        { id: "r23-eee-11-3", name: "Basic Civil & Mechanical Engineering", credits: 3 },
        { id: "r23-eee-11-4", name: "Introduction to Programming", credits: 3 },
        { id: "r23-eee-11-5", name: "Communicative English", credits: 2 },
        { id: "r23-eee-11-6", name: "Engineering Physics Lab", credits: 1.5 },
        { id: "r23-eee-11-7", name: "Basic Civil & Mechanical Lab", credits: 1.5 },
        { id: "r23-eee-11-8", name: "Computer Programming Lab", credits: 1.5 },
        { id: "r23-eee-11-9", name: "IT Workshop", credits: 1 }
      ],
      "1-2": [
        { id: "r23-eee-12-1", name: "Chemistry", credits: 3 },
        { id: "r23-eee-12-2", name: "Differential Equations & Vector Calculus", credits: 3 },
        { id: "r23-eee-12-3", name: "Electric Circuits - I", credits: 3 },
        { id: "r23-eee-12-4", name: "Engineering Graphics", credits: 3 },
        { id: "r23-eee-12-5", name: "Applied Physics", credits: 3 },
        { id: "r23-eee-12-6", name: "Electric Circuits Lab", credits: 1.5 },
        { id: "r23-eee-12-7", name: "Applied Physics Lab", credits: 1.5 },
        { id: "r23-eee-12-8", name: "Engineering Workshop", credits: 1.5 }
      ],
      "2-1": [
        { id: "r23-eee-21-1", name: "Electrical Circuit Analysis - II", credits: 3 },
        { id: "r23-eee-21-2", name: "Electrical Machines - I", credits: 3 },
        { id: "r23-eee-21-3", name: "Electronic Devices and Circuits", credits: 3 },
        { id: "r23-eee-21-4", name: "Electromagnetic Fields", credits: 3 },
        { id: "r23-eee-21-5", name: "Fluid Mechanics and Hydraulic Machinery", credits: 3 },
        { id: "r23-eee-21-6", name: "Electrical Machines - I Lab", credits: 1.5 },
        { id: "r23-eee-21-7", name: "Electronic Devices Lab", credits: 1.5 },
        { id: "r23-eee-21-8", name: "Skill Course - I", credits: 2 }
      ],
      "2-2": [
        { id: "r23-eee-22-1", name: "Electrical Machines - II", credits: 3 },
        { id: "r23-eee-22-2", name: "Power Systems - I", credits: 3 },
        { id: "r23-eee-22-3", name: "Control Systems", credits: 3 },
        { id: "r23-eee-22-4", name: "Analog Electronics", credits: 3 },
        { id: "r23-eee-22-5", name: "Numerical Methods and Probability", credits: 3 },
        { id: "r23-eee-22-6", name: "Electrical Machines - II Lab", credits: 1.5 },
        { id: "r23-eee-22-7", name: "Control Systems Lab", credits: 1.5 },
        { id: "r23-eee-22-8", name: "Skill Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r23-eee-31-1", name: "Power Systems - II", credits: 3 },
        { id: "r23-eee-31-2", name: "Power Electronics", credits: 3 },
        { id: "r23-eee-31-3", name: "Microprocessors & Microcontrollers", credits: 3 },
        { id: "r23-eee-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r23-eee-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r23-eee-31-6", name: "Power Electronics Lab", credits: 1.5 },
        { id: "r23-eee-31-7", name: "Electrical Measurements Lab", credits: 1.5 },
        { id: "r23-eee-31-8", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r23-eee-32-1", name: "Power System Analysis", credits: 3 },
        { id: "r23-eee-32-2", name: "Signals & Systems", credits: 3 },
        { id: "r23-eee-32-3", name: "Professional Elective - II", credits: 3 },
        { id: "r23-eee-32-4", name: "Professional Elective - III", credits: 3 },
        { id: "r23-eee-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r23-eee-32-6", name: "Power Systems Lab", credits: 1.5 },
        { id: "r23-eee-32-7", name: "Microprocessors Lab", credits: 1.5 },
        { id: "r23-eee-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r23-eee-41-1", name: "Power System Operation & Control", credits: 3 },
        { id: "r23-eee-41-2", name: "Professional Elective - IV", credits: 3 },
        { id: "r23-eee-41-3", name: "Professional Elective - V", credits: 3 },
        { id: "r23-eee-41-4", name: "Open Elective - III", credits: 3 },
        { id: "r23-eee-41-5", name: "Open Elective - IV", credits: 3 },
        { id: "r23-eee-41-6", name: "Internship", credits: 3 }
      ],
      "4-2": [
        { id: "r23-eee-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    CIVIL: {
      "1-1": [
        { id: "r23-civil-11-1", name: "Linear Algebra & Calculus", credits: 3 },
        { id: "r23-civil-11-2", name: "Engineering Physics", credits: 3 },
        { id: "r23-civil-11-3", name: "Basic Civil & Mechanical Engineering", credits: 3 },
        { id: "r23-civil-11-4", name: "Introduction to Programming", credits: 3 },
        { id: "r23-civil-11-5", name: "Communicative English", credits: 2 },
        { id: "r23-civil-11-6", name: "Engineering Physics Lab", credits: 1.5 },
        { id: "r23-civil-11-7", name: "Basic Civil & Mechanical Lab", credits: 1.5 },
        { id: "r23-civil-11-8", name: "Computer Programming Lab", credits: 1.5 },
        { id: "r23-civil-11-9", name: "IT Workshop", credits: 1 }
      ],
      "1-2": [
        { id: "r23-civil-12-1", name: "Chemistry", credits: 3 },
        { id: "r23-civil-12-2", name: "Differential Equations & Vector Calculus", credits: 3 },
        { id: "r23-civil-12-3", name: "Engineering Mechanics", credits: 3 },
        { id: "r23-civil-12-4", name: "Engineering Graphics", credits: 3 },
        { id: "r23-civil-12-5", name: "Basic Electrical and Electronics Engineering", credits: 3 },
        { id: "r23-civil-12-6", name: "Civil Engineering Workshop", credits: 1.5 },
        { id: "r23-civil-12-7", name: "Chemistry Lab", credits: 1.5 },
        { id: "r23-civil-12-8", name: "Basic Electrical Lab", credits: 1.5 }
      ],
      "2-1": [
        { id: "r23-civil-21-1", name: "Strength of Materials - I", credits: 3 },
        { id: "r23-civil-21-2", name: "Fluid Mechanics", credits: 3 },
        { id: "r23-civil-21-3", name: "Surveying and Geomatics", credits: 3 },
        { id: "r23-civil-21-4", name: "Building Materials and Construction", credits: 3 },
        { id: "r23-civil-21-5", name: "Geology", credits: 3 },
        { id: "r23-civil-21-6", name: "Fluid Mechanics Lab", credits: 1.5 },
        { id: "r23-civil-21-7", name: "Surveying Lab", credits: 1.5 },
        { id: "r23-civil-21-8", name: "CAD Lab", credits: 2 }
      ],
      "2-2": [
        { id: "r23-civil-22-1", name: "Strength of Materials - II", credits: 3 },
        { id: "r23-civil-22-2", name: "Hydraulics and Hydraulic Machinery", credits: 3 },
        { id: "r23-civil-22-3", name: "Structural Analysis", credits: 3 },
        { id: "r23-civil-22-4", name: "Concrete Technology", credits: 3 },
        { id: "r23-civil-22-5", name: "Environmental Engineering", credits: 3 },
        { id: "r23-civil-22-6", name: "Strength of Materials Lab", credits: 1.5 },
        { id: "r23-civil-22-7", name: "Concrete Technology Lab", credits: 1.5 },
        { id: "r23-civil-22-8", name: "Skill Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r23-civil-31-1", name: "Geotechnical Engineering - I", credits: 3 },
        { id: "r23-civil-31-2", name: "Water Resources Engineering", credits: 3 },
        { id: "r23-civil-31-3", name: "Transportation Engineering", credits: 3 },
        { id: "r23-civil-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r23-civil-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r23-civil-31-6", name: "Geotechnical Engineering Lab", credits: 1.5 },
        { id: "r23-civil-31-7", name: "Transportation Engineering Lab", credits: 1.5 },
        { id: "r23-civil-31-8", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r23-civil-32-1", name: "Geotechnical Engineering - II", credits: 3 },
        { id: "r23-civil-32-2", name: "Design of Steel Structures", credits: 3 },
        { id: "r23-civil-32-3", name: "Professional Elective - II", credits: 3 },
        { id: "r23-civil-32-4", name: "Professional Elective - III", credits: 3 },
        { id: "r23-civil-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r23-civil-32-6", name: "Environmental Engineering Lab", credits: 1.5 },
        { id: "r23-civil-32-7", name: "Estimation and Costing Lab", credits: 1.5 },
        { id: "r23-civil-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r23-civil-41-1", name: "Design of Reinforced Concrete Structures", credits: 3 },
        { id: "r23-civil-41-2", name: "Professional Elective - IV", credits: 3 },
        { id: "r23-civil-41-3", name: "Professional Elective - V", credits: 3 },
        { id: "r23-civil-41-4", name: "Open Elective - III", credits: 3 },
        { id: "r23-civil-41-5", name: "Open Elective - IV", credits: 3 },
        { id: "r23-civil-41-6", name: "Industry Internship", credits: 3 }
      ],
      "4-2": [
        { id: "r23-civil-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    }
  },
  R20: {
    CSE: {
      "1-1": [
        { id: "r20-cse-11-1", name: "Mathematics - I", credits: 3 },
        { id: "r20-cse-11-2", name: "Applied Chemistry", credits: 3 },
        { id: "r20-cse-11-3", name: "Computer Programming using C", credits: 3 },
        { id: "r20-cse-11-4", name: "Engineering Drawing", credits: 3 },
        { id: "r20-cse-11-5", name: "English", credits: 3 },
        { id: "r20-cse-11-6", name: "Applied Chemistry Lab", credits: 1.5 },
        { id: "r20-cse-11-7", name: "C Programming Lab", credits: 1.5 },
        { id: "r20-cse-11-8", name: "English Communication Skills Lab", credits: 1.5 }
      ],
      "1-2": [
        { id: "r20-cse-12-1", name: "Mathematics - II", credits: 3 },
        { id: "r20-cse-12-2", name: "Applied Physics", credits: 3 },
        { id: "r20-cse-12-3", name: "Digital Logic Design", credits: 3 },
        { id: "r20-cse-12-4", name: "Data Structures", credits: 3 },
        { id: "r20-cse-12-5", name: "Applied Physics Lab", credits: 1.5 },
        { id: "r20-cse-12-6", name: "Data Structures Lab", credits: 1.5 },
        { id: "r20-cse-12-7", name: "IT Workshop", credits: 1.5 },
        { id: "r20-cse-12-8", name: "Environmental Science (Mandatory)", credits: 0 }
      ],
      "2-1": [
        { id: "r20-cse-21-1", name: "Mathematics - III", credits: 3 },
        { id: "r20-cse-21-2", name: "Object Oriented Programming through C++", credits: 3 },
        { id: "r20-cse-21-3", name: "Operating Systems", credits: 3 },
        { id: "r20-cse-21-4", name: "Software Engineering", credits: 3 },
        { id: "r20-cse-21-5", name: "Mathematical Foundations of Computer Science", credits: 3 },
        { id: "r20-cse-21-6", name: "OOP through C++ Lab", credits: 1.5 },
        { id: "r20-cse-21-7", name: "OS Lab", credits: 1.5 },
        { id: "r20-cse-21-8", name: "Software Engineering Lab", credits: 1.5 },
        { id: "r20-cse-21-9", name: "Skill Oriented Course - I", credits: 2 }
      ],
      "2-2": [
        { id: "r20-cse-22-1", name: "Probability & Statistics", credits: 3 },
        { id: "r20-cse-22-2", name: "Database Management Systems", credits: 3 },
        { id: "r20-cse-22-3", name: "Formal Languages & Automata Theory", credits: 3 },
        { id: "r20-cse-22-4", name: "Java Programming", credits: 3 },
        { id: "r20-cse-22-5", name: "Managerial Economics & Financial Accountancy", credits: 3 },
        { id: "r20-cse-22-6", name: "Database Management Systems Lab", credits: 1.5 },
        { id: "r20-cse-22-7", name: "Java Programming Lab", credits: 1.5 },
        { id: "r20-cse-22-8", name: "Skill Oriented Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r20-cse-31-1", name: "Computer Networks", credits: 3 },
        { id: "r20-cse-31-2", name: "Design & Analysis of Algorithms", credits: 3 },
        { id: "r20-cse-31-3", name: "Data Mining", credits: 3 },
        { id: "r20-cse-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r20-cse-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r20-cse-31-6", name: "Computer Networks Lab", credits: 1.5 },
        { id: "r20-cse-31-7", name: "DAA & Data Mining Lab", credits: 1.5 },
        { id: "r20-cse-31-8", name: "Skill Oriented Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r20-cse-32-1", name: "Compiler Design", credits: 3 },
        { id: "r20-cse-32-2", name: "Software Testing Methodologies", credits: 3 },
        { id: "r20-cse-32-3", name: "Artificial Intelligence", credits: 3 },
        { id: "r20-cse-32-4", name: "Professional Elective - II", credits: 3 },
        { id: "r20-cse-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r20-cse-32-6", name: "Compiler Design Lab", credits: 1.5 },
        { id: "r20-cse-32-7", name: "Testing & AI Lab", credits: 1.5 },
        { id: "r20-cse-32-8", name: "Skill Oriented Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r20-cse-41-1", name: "Cryptography & Network Security", credits: 3 },
        { id: "r20-cse-41-2", name: "UML & Design Patterns", credits: 3 },
        { id: "r20-cse-41-3", name: "Machine Learning", credits: 3 },
        { id: "r20-cse-41-4", name: "Professional Elective - III", credits: 3 },
        { id: "r20-cse-41-5", name: "Open Elective - III", credits: 3 },
        { id: "r20-cse-41-6", name: "CNS & UML Lab", credits: 1.5 },
        { id: "r20-cse-41-7", name: "ML Lab", credits: 1.5 },
        { id: "r20-cse-41-8", name: "Skill Oriented Course - V", credits: 2 }
      ],
      "4-2": [
        { id: "r20-cse-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    ECE: {
      "1-1": [
        { id: "r20-ece-11-1", name: "Mathematics - I", credits: 3 },
        { id: "r20-ece-11-2", name: "Applied Chemistry", credits: 3 },
        { id: "r20-ece-11-3", name: "Computer Programming using C", credits: 3 },
        { id: "r20-ece-11-4", name: "Engineering Drawing", credits: 3 },
        { id: "r20-ece-11-5", name: "English", credits: 3 },
        { id: "r20-ece-11-6", name: "Applied Chemistry Lab", credits: 1.5 },
        { id: "r20-ece-11-7", name: "C Programming Lab", credits: 1.5 },
        { id: "r20-ece-11-8", name: "English Communication Lab", credits: 1.5 }
      ],
      "1-2": [
        { id: "r20-ece-12-1", name: "Mathematics - II", credits: 3 },
        { id: "r20-ece-12-2", name: "Applied Physics", credits: 3 },
        { id: "r20-ece-12-3", name: "Network Analysis", credits: 3 },
        { id: "r20-ece-12-4", name: "Basic Electrical Engineering", credits: 3 },
        { id: "r20-ece-12-5", name: "Applied Physics Lab", credits: 1.5 },
        { id: "r20-ece-12-6", name: "Basic Electrical Lab", credits: 1.5 },
        { id: "r20-ece-12-7", name: "Electronic Devices & Circuits", credits: 3 }
      ],
      "2-1": [
        { id: "r20-ece-21-1", name: "Electronic Circuit Analysis", credits: 3 },
        { id: "r20-ece-21-2", name: "Digital Logic Design", credits: 3 },
        { id: "r20-ece-21-3", name: "Signals & Systems", credits: 3 },
        { id: "r20-ece-21-4", name: "Random Variables & Stochastic Processes", credits: 3 },
        { id: "r20-ece-21-5", name: "Managerial Economics & Financial Accountancy", credits: 3 },
        { id: "r20-ece-21-6", name: "Electronic Devices & Circuits Lab", credits: 1.5 },
        { id: "r20-ece-21-7", name: "Basic Simulation Lab", credits: 1.5 },
        { id: "r20-ece-21-8", name: "Skill Course - I", credits: 2 }
      ],
      "2-2": [
        { id: "r20-ece-22-1", name: "Electromagnetic Waves and Transmission Lines", credits: 3 },
        { id: "r20-ece-22-2", name: "Analog Communications", credits: 3 },
        { id: "r20-ece-22-3", name: "Linear IC Applications", credits: 3 },
        { id: "r20-ece-22-4", name: "Digital System Design", credits: 3 },
        { id: "r20-ece-22-5", name: "Management Science", credits: 3 },
        { id: "r20-ece-22-6", name: "Analog Communications Lab", credits: 1.5 },
        { id: "r20-ece-22-7", name: "Linear IC Applications Lab", credits: 1.5 },
        { id: "r20-ece-22-8", name: "Skill Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r20-ece-31-1", name: "Microprocessors & Microcontrollers", credits: 3 },
        { id: "r20-ece-31-2", name: "Digital Communications", credits: 3 },
        { id: "r20-ece-31-3", name: "Antennas & Wave Propagation", credits: 3 },
        { id: "r20-ece-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r20-ece-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r20-ece-31-6", name: "Microprocessors & Microcontrollers Lab", credits: 1.5 },
        { id: "r20-ece-31-7", name: "Digital Communications Lab", credits: 1.5 },
        { id: "r20-ece-31-8", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r20-ece-32-1", name: "VLSI Design", credits: 3 },
        { id: "r20-ece-32-2", name: "Digital Signal Processing", credits: 3 },
        { id: "r20-ece-32-3", name: "Microwave Engineering", credits: 3 },
        { id: "r20-ece-32-4", name: "Professional Elective - II", credits: 3 },
        { id: "r20-ece-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r20-ece-32-6", name: "VLSI Lab", credits: 1.5 },
        { id: "r20-ece-32-7", name: "Digital Signal Processing Lab", credits: 1.5 },
        { id: "r20-ece-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r20-ece-41-1", name: "Optical Communications", credits: 3 },
        { id: "r20-ece-41-2", name: "Digital Image Processing", credits: 3 },
        { id: "r20-ece-41-3", name: "Professional Elective - III", credits: 3 },
        { id: "r20-ece-41-4", name: "Professional Elective - IV", credits: 3 },
        { id: "r20-ece-41-5", name: "Open Elective - III", credits: 3 },
        { id: "r20-ece-41-6", name: "Optical & Microwave Lab", credits: 1.5 },
        { id: "r20-ece-41-7", name: "Skill Course - V", credits: 2 }
      ],
      "4-2": [
        { id: "r20-ece-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    EEE: {
      "1-1": [
        { id: "r20-eee-11-1", name: "Mathematics - I", credits: 3 },
        { id: "r20-eee-11-2", name: "Applied Chemistry", credits: 3 },
        { id: "r20-eee-11-3", name: "Computer Programming using C", credits: 3 },
        { id: "r20-eee-11-4", name: "Engineering Drawing", credits: 3 },
        { id: "r20-eee-11-5", name: "English", credits: 3 },
        { id: "r20-eee-11-6", name: "Applied Chemistry Lab", credits: 1.5 },
        { id: "r20-eee-11-7", name: "C Programming Lab", credits: 1.5 },
        { id: "r20-eee-11-8", name: "English Communication Lab", credits: 1.5 }
      ],
      "1-2": [
        { id: "r20-eee-12-1", name: "Mathematics - II", credits: 3 },
        { id: "r20-eee-12-2", name: "Applied Physics", credits: 3 },
        { id: "r20-eee-12-3", name: "Electric Circuits - I", credits: 3 },
        { id: "r20-eee-12-4", name: "Basic Civil and Mechanical Engineering", credits: 3 },
        { id: "r20-eee-12-5", name: "Applied Physics Lab", credits: 1.5 },
        { id: "r20-eee-12-6", name: "Electric Circuits Lab", credits: 1.5 },
        { id: "r20-eee-12-7", name: "Engineering Workshop", credits: 1.5 }
      ],
      "2-1": [
        { id: "r20-eee-21-1", name: "Mathematics - III", credits: 3 },
        { id: "r20-eee-21-2", name: "Electrical Circuit Analysis - II", credits: 3 },
        { id: "r20-eee-21-3", name: "Electrical Machines - I", credits: 3 },
        { id: "r20-eee-21-4", name: "Electromagnetic Fields", credits: 3 },
        { id: "r20-eee-21-5", name: "Analog Electronics", credits: 3 },
        { id: "r20-eee-21-6", name: "Electrical Machines - I Lab", credits: 1.5 },
        { id: "r20-eee-21-7", name: "Analog Electronics Lab", credits: 1.5 },
        { id: "r20-eee-21-8", name: "Skill Course - I", credits: 2 }
      ],
      "2-2": [
        { id: "r20-eee-22-1", name: "Electrical Machines - II", credits: 3 },
        { id: "r20-eee-22-2", name: "Power Systems - I", credits: 3 },
        { id: "r20-eee-22-3", name: "Control Systems", credits: 3 },
        { id: "r20-eee-22-4", name: "Power Electronics", credits: 3 },
        { id: "r20-eee-22-5", name: "Managerial Economics & Financial Accountancy", credits: 3 },
        { id: "r20-eee-22-6", name: "Electrical Machines - II Lab", credits: 1.5 },
        { id: "r20-eee-22-7", name: "Control Systems Lab", credits: 1.5 },
        { id: "r20-eee-22-8", name: "Skill Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r20-eee-31-1", name: "Power Systems - II", credits: 3 },
        { id: "r20-eee-31-2", name: "Electrical Measurements & Instrumentation", credits: 3 },
        { id: "r20-eee-31-3", name: "Microprocessors & Microcontrollers", credits: 3 },
        { id: "r20-eee-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r20-eee-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r20-eee-31-6", name: "Electrical Measurements Lab", credits: 1.5 },
        { id: "r20-eee-31-7", name: "Power Electronics Lab", credits: 1.5 },
        { id: "r20-eee-31-8", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r20-eee-32-1", name: "Power System Analysis", credits: 3 },
        { id: "r20-eee-32-2", name: "Power Semiconductor Drives", credits: 3 },
        { id: "r20-eee-32-3", name: "Digital Signal Processing", credits: 3 },
        { id: "r20-eee-32-4", name: "Professional Elective - II", credits: 3 },
        { id: "r20-eee-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r20-eee-32-6", name: "Power Systems Lab", credits: 1.5 },
        { id: "r20-eee-32-7", name: "Microprocessors & Microcontrollers Lab", credits: 1.5 },
        { id: "r20-eee-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r20-eee-41-1", name: "Power System Operation & Control", credits: 3 },
        { id: "r20-eee-41-2", name: "Renewable Energy Sources", credits: 3 },
        { id: "r20-eee-41-3", name: "Professional Elective - III", credits: 3 },
        { id: "r20-eee-41-4", name: "Professional Elective - IV", credits: 3 },
        { id: "r20-eee-41-5", name: "Open Elective - III", credits: 3 },
        { id: "r20-eee-41-6", name: "Renewable Energy Systems Lab", credits: 1.5 },
        { id: "r20-eee-41-7", name: "Skill Course - V", credits: 2 }
      ],
      "4-2": [
        { id: "r20-eee-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    },
    CIVIL: {
      "1-1": [
        { id: "r20-civil-11-1", name: "Mathematics - I", credits: 3 },
        { id: "r20-civil-11-2", name: "Engineering Physics", credits: 3 },
        { id: "r20-civil-11-3", name: "Engineering Mechanics", credits: 3 },
        { id: "r20-civil-11-4", name: "Engineering Drawing", credits: 3 },
        { id: "r20-civil-11-5", name: "English", credits: 3 },
        { id: "r20-civil-11-6", name: "Engineering Physics Lab", credits: 1.5 },
        { id: "r20-civil-11-7", name: "Engineering Lab & Workshop", credits: 1.5 },
        { id: "r20-civil-11-8", name: "English Communication Lab", credits: 1.5 }
      ],
      "1-2": [
        { id: "r20-civil-12-1", name: "Mathematics - II", credits: 3 },
        { id: "r20-civil-12-2", name: "Engineering Chemistry", credits: 3 },
        { id: "r20-civil-12-3", name: "Computer Programming using C", credits: 3 },
        { id: "r20-civil-12-4", name: "Building Materials & Construction", credits: 3 },
        { id: "r20-civil-12-5", name: "Engineering Chemistry Lab", credits: 1.5 },
        { id: "r20-civil-12-6", name: "C Programming Lab", credits: 1.5 },
        { id: "r20-civil-12-7", name: "Environmental Science (Mandatory)", credits: 0 }
      ],
      "2-1": [
        { id: "r20-civil-21-1", name: "Mathematics - III", credits: 3 },
        { id: "r20-civil-21-2", name: "Strength of Materials - I", credits: 3 },
        { id: "r20-civil-21-3", name: "Fluid Mechanics", credits: 3 },
        { id: "r20-civil-21-4", name: "Surveying & Geomatics", credits: 3 },
        { id: "r20-civil-21-5", name: "Engineering Geology", credits: 3 },
        { id: "r20-civil-21-6", name: "Strength of Materials Lab", credits: 1.5 },
        { id: "r20-civil-21-7", name: "Fluid Mechanics Lab", credits: 1.5 },
        { id: "r20-civil-21-8", name: "Skill Course - I", credits: 2 }
      ],
      "2-2": [
        { id: "r20-civil-22-1", name: "Strength of Materials - II", credits: 3 },
        { id: "r20-civil-22-2", name: "Hydraulics & Hydraulic Machinery", credits: 3 },
        { id: "r20-civil-22-3", name: "Structural Analysis", credits: 3 },
        { id: "r20-civil-22-4", name: "Concrete Technology", credits: 3 },
        { id: "r20-civil-22-5", name: "Managerial Economics & Financial Accountancy", credits: 3 },
        { id: "r20-civil-22-6", name: "Concrete Technology Lab", credits: 1.5 },
        { id: "r20-civil-22-7", name: "Surveying Lab", credits: 1.5 },
        { id: "r20-civil-22-8", name: "Skill Course - II", credits: 2 }
      ],
      "3-1": [
        { id: "r20-civil-31-1", name: "Design of Reinforced Concrete Structures", credits: 3 },
        { id: "r20-civil-31-2", name: "Geotechnical Engineering - I", credits: 3 },
        { id: "r20-civil-31-3", name: "Transportation Engineering", credits: 3 },
        { id: "r20-civil-31-4", name: "Professional Elective - I", credits: 3 },
        { id: "r20-civil-31-5", name: "Open Elective - I", credits: 3 },
        { id: "r20-civil-31-6", name: "Geotechnical Engineering Lab", credits: 1.5 },
        { id: "r20-civil-31-7", name: "Transportation Engineering Lab", credits: 1.5 },
        { id: "r20-civil-31-8", name: "Skill Course - III", credits: 2 }
      ],
      "3-2": [
        { id: "r20-civil-32-1", name: "Design of Steel Structures", credits: 3 },
        { id: "r20-civil-32-2", name: "Geotechnical Engineering - II", credits: 3 },
        { id: "r20-civil-32-3", name: "Water Resources Engineering", credits: 3 },
        { id: "r20-civil-32-4", name: "Professional Elective - II", credits: 3 },
        { id: "r20-civil-32-5", name: "Open Elective - II", credits: 3 },
        { id: "r20-civil-32-6", name: "Environmental Engineering Lab", credits: 1.5 },
        { id: "r20-civil-32-7", name: "Civil Engineering Drafting Lab", credits: 1.5 },
        { id: "r20-civil-32-8", name: "Skill Course - IV", credits: 2 }
      ],
      "4-1": [
        { id: "r20-civil-41-1", name: "Prestressed Concrete", credits: 3 },
        { id: "r20-civil-41-2", name: "Environmental Engineering", credits: 3 },
        { id: "r20-civil-41-3", name: "Professional Elective - III", credits: 3 },
        { id: "r20-civil-41-4", name: "Professional Elective - IV", credits: 3 },
        { id: "r20-civil-41-5", name: "Open Elective - III", credits: 3 },
        { id: "r20-civil-41-6", name: "Estimation, Specifications & Contracts", credits: 3 },
        { id: "r20-civil-41-7", name: "Skill Course - V", credits: 2 }
      ],
      "4-2": [
        { id: "r20-civil-42-1", name: "Major Project & Seminar", credits: 12 }
      ]
    }
  }
};

export const JNTUK_GRADE_POINTS: { [grade: string]: number } = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 5,
  F: 0,
  Absent: 0
};

export function getSemesterCredits(regulation: string, branch: string, semester: string): number {
  const branchSyllabus = JNTUK_SYLLABUS[regulation]?.[branch] || {};
  const subjects = branchSyllabus[semester] || [];
  if (subjects.length === 0) return 20; // Default fallback
  return subjects.reduce((sum, sub) => sum + sub.credits, 0);
}
