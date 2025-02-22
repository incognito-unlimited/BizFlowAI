"use client";

import { useState } from "react";

export default function PaidFeature() {
  const [featureText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor nisi ut nunc dictum, nec sagittis eros suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  );

  return (
    <div className="w-full p-6">
      <div className="flex flex-col space-y-2">
        {/* Product Features Label */}
        <h2 className="text-white font-medium text-base">
          Product Features
        </h2>

        {/* Feature Text Box */}
        <div className="p-4 bg-black/40 text-sm text-justify rounded-md text-white/70">
          <p>The College ERP (Enterprise Resource Planning) system is designed to streamline and enhance the management of various administrative and academic functions within educational institutions. This comprehensive software solution integrates multiple modules, including:</p>
          <ul>
            <li><strong>Student Information Management:</strong> Efficiently manage student records, including personal details, enrollment status, and academic history.</li><br />
            <li><strong>Attendance Tracking:</strong> Monitor student attendance and generate reports for faculty and administration.</li><br />
            <li><strong>Examination Management:</strong> Streamline the process of scheduling exams, managing grading, and generating report cards.</li><br />
            <li><strong>Course Scheduling:</strong> Facilitate the creation and management of course schedules for different programs and semesters.</li><br />
            <li><strong>Financial Management:</strong> Manage fee collections, scholarships, and financial aid, with reporting capabilities.</li>
          </ul>
          <br />
          <p>Key Features:</p>
          <ul>
            <li><strong>Administrative Efficiency:</strong> Centralize information to reduce paperwork and enhance workflow.</li><br />
            <li><strong>Faculty Management:</strong> Allow faculty members to manage course materials, track student progress, and communicate effectively with students.</li><br />
            <li><strong>Student Portal:</strong> Provide a user-friendly portal for students to access grades, pay fees, and register for courses online.</li><br />
            <li><strong>Reporting and Analytics:</strong> Generate detailed reports and analytics for better decision-making and performance tracking.</li><br />
            <li><strong>Communication Tools:</strong> Enhance communication between students, faculty, and administration through integrated messaging features.</li>
          </ul>
          <br />
          <p>By centralizing information and automating processes, the College ERP system improves operational efficiency, enhances communication, and ultimately supports better decision-making within the institution.</p>
        </div>

      </div>
    </div>
  );
}

