# 🎓 JNTUK CGPA Calculator

> A modern, student-focused **SGPA & CGPA Calculator for JNTUK students**, supporting **R20 and R23 regulations** with automatic syllabus loading, customizable credits, calculation history, grading guidance, and percentage conversion.

🌐 **Live Application:** https://jntuk-calculator.vercel.app/

---

## 📌 Overview

**JNTUK CGPA Calculator** is a web-based academic utility designed for students of **Jawaharlal Nehru Technological University, Kakinada (JNTUK)**.

The application simplifies semester and cumulative academic calculations by allowing students to select their regulation, branch, and semester, automatically load relevant subjects, enter grades, and instantly calculate their SGPA or CGPA.

The application currently supports **JNTUK R20 and R23 regulations**.

---

## ✨ Features

### 📊 SGPA Calculator

Calculate your semester SGPA using subject-wise:

* Subject name
* Credits
* Grade
* Grade points

The calculator dynamically computes the weighted SGPA based on the credits and grade points of each course.

### 🎓 CGPA Calculator

Calculate cumulative CGPA by entering semester-wise academic performance.

The CGPA calculation uses the credit-weighted performance across completed semesters.

### 📚 Automatic Syllabus Loading

Select:

1. Regulation
2. Department / Branch
3. Semester

The application can automatically retrieve the corresponding syllabus subjects for supported regulations.

### ✏️ Customizable Courses

Students can modify existing courses or use **Add Course** to include additional subjects.

This makes the calculator adaptable to branches or course structures that may differ from the standard loaded syllabus.

### 💾 Calculation History

Calculated SGPA and CGPA records can be saved to the browser's local storage.

This allows students to revisit their previous calculations without maintaining a separate record manually. The saved history remains on the user's device.

### 📋 Copy & Share

The application provides options to:

* Copy calculation results
* Share results
* Save calculations to history
* Reset the calculator

### 📖 Grading Guide

The application includes a JNTUK grading reference covering:

| Grade  | Grade Point | Marks Range |
| ------ | ----------: | ----------: |
| S      |          10 |     90–100% |
| A      |           9 |      80–89% |
| B      |           8 |      70–79% |
| C      |           7 |      60–69% |
| D      |           6 |      50–59% |
| E      |           5 |      40–49% |
| F      |           0 |   Below 40% |
| Absent |           0 |           — |

---

## 🧮 Calculation Method

### SGPA

The application calculates SGPA using the weighted average of grade points based on course credits:

```text
SGPA = Σ(Course Credits × Grade Points)
       ───────────────────────────────
             Σ(Course Credits)
```

This is the standard credit-weighted SGPA calculation described in JNTUK academic regulations.

### CGPA

CGPA is calculated using the credit-weighted SGPA across semesters:

```text
CGPA = Σ(SGPA × Semester Credits)
       ──────────────────────────
            Σ(Semester Credits)
```

### Percentage Conversion

The application provides the following conversion:

```text
Percentage = (CGPA - 0.75) × 10
```

Always verify the applicable conversion rule against your official JNTUK regulation/grade sheet before using the result for formal purposes.

---

## 🎯 Supported Regulations

Currently supported:

* **R20**
* **R23**

The application provides semester selections from **1-1 through 4-2** for the supported undergraduate structure.

---

## 🔄 How It Works

```text
                ┌───────────────────┐
                │      Student      │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Select Regulation │
                │     R20 / R23     │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Select Branch &   │
                │     Semester      │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Load Subjects &   │
                │      Credits      │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Enter Grades      │
                │ / Edit Courses    │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Calculate SGPA /  │
                │       CGPA        │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │ Save / Copy /     │
                │      Share        │
                └───────────────────┘
```

---

## 🖥️ Application Sections

### 🏠 Landing Section

Introduces the JNTUK CGPA Portal and provides direct access to:

* SGPA Calculator
* CGPA Calculator
* Calculation History
* Grading Guide

### 🧮 SGPA Calculator

Students can select their regulation, branch, and semester and enter grades for individual courses.

The system displays:

* Calculated SGPA
* Total credits
* Weighted points

### 📈 CGPA Calculator

Students can calculate their cumulative academic performance using semester-wise results and credit information.

### 🗃️ Calculation History

Previously saved calculations are stored using browser local storage, keeping the information on the user's device rather than requiring a centralized account.

### 📚 Grading & Regulations Guide

Provides students with:

* Grade-point reference
* Marks ranges
* Degree classification
* SGPA formula
* CGPA formula
* Percentage conversion

---

## 🛠️ Technology

### Frontend

The application is deployed as a modern web application on **Vercel**.

Recommended project-stack documentation should be kept synchronized with the actual source repository, e.g.:

```text
Frontend
├── HTML
├── CSS
├── JavaScript / TypeScript
└── UI Components
```

### Data Storage

Calculation history uses:

```text
Browser Local Storage
```

Therefore, saved calculations are maintained locally on the user's device.

### Deployment

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Production Deployment
   │
   ▼
jntuk-calculator.vercel.app
```

---

## 📂 Suggested Project Structure

```text
jntuk-calculator/
│
├── public/
│   ├── images/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── utils/
│   └── styles/
│
├── package.json
├── README.md
├── .gitignore
└── ...
```

> Update this section with your exact repository structure if your implementation differs.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### Navigate to the Project

```bash
cd jntuk-calculator
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will then be available through the local development URL provided by your framework.

---

## 🌐 Live Demo

### 🚀 Production

**https://jntuk-calculator.vercel.app/**

The application is currently deployed and accessible online.

---

## 📱 Use Cases

This calculator is useful for:

* 🎓 JNTUK B.Tech students
* 📊 Semester SGPA calculation
* 📈 Overall CGPA tracking
* 📝 Academic performance tracking
* 🎯 Target CGPA planning
* 📚 Understanding JNTUK grading
* 📋 Maintaining previous calculations

---

## 🔐 Privacy

The application's calculation history is stored using **local browser storage**.

This means saved calculations are kept on the user's device and are not dependent on a centralized history account.

---

## ⚠️ Disclaimer

> This project is an **independent educational tool** and is not affiliated with, authorized by, or endorsed by Jawaharlal Nehru Technological University, Kakinada.

The application itself displays this disclaimer and recommends checking official JNTUK grade sheets and university/college information for authoritative academic results.

For official academic information, refer to the [JNTUK official website](https://www.jntuk.edu.in/?utm_source=chatgpt.com).

---

## 🔮 Future Enhancements

Potential improvements include:

* 📱 Progressive Web App support
* 📄 PDF result generation
* 📊 Academic performance charts
* 🎯 Target CGPA calculator
* 📈 Semester performance trends
* 🔄 Support for additional JNTUK regulations
* 🏫 Support for more branches
* ☁️ Optional cloud synchronization
* 📤 Export calculation history
* 🌙 Dark/light theme
* 📱 Improved mobile experience
* 🔗 Shareable calculation links

---

## ⭐ Project Highlights

```text
✓ JNTUK-focused academic calculator
✓ R20 & R23 support
✓ SGPA calculation
✓ CGPA calculation
✓ Automatic syllabus loading
✓ Editable course structure
✓ Credit-based calculation
✓ Calculation history
✓ Local browser storage
✓ Copy & Share functionality
✓ Grading reference
✓ Percentage conversion
✓ Responsive web application
✓ Vercel deployment
```

---

## 🎯 Project Goal

The goal of the **JNTUK CGPA Calculator** is to eliminate manual academic calculations and provide JNTUK students with a simple, fast, and accessible tool for understanding and tracking their academic performance.

> **Calculate. Track. Understand your academic performance. 🎓**

---

## 👨‍💻 Developer

**ANDE SASI VARDHAN**

Computer Science & Engineering

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub and sharing it with other JNTUK students.

