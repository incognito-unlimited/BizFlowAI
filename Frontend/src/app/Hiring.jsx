"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ApplicantCard from "./Components/ApplicantCard";

export default function Hiring() {
    // Generate 100 applicants with descending matchPercentage (100 → 1)
    const applicants = Array.from({ length: 100 }, (_, index) => ({
        name: `Applicant ${index + 1}`,
        experience: {
            React: { years: Math.floor(Math.random() * 5), months: Math.floor(Math.random() * 12) },
            "Next.js": { years: Math.floor(Math.random() * 3), months: Math.floor(Math.random() * 12) },
            Node: { years: Math.floor(Math.random() * 4), months: Math.floor(Math.random() * 12) },
        },
        salaryExpectation: `₹${(Math.floor(Math.random() * 50) + 50) * 1000}/month`,
        matchPercentage: 100 - index, // Descending from 100 to 1
    }));

    const [currentPage, setCurrentPage] = useState(0);
    const applicantsPerPage = 10;
    const totalPages = Math.ceil(applicants.length / applicantsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const currentApplicants = applicants.slice(
        currentPage * applicantsPerPage,
        (currentPage + 1) * applicantsPerPage
    );

    return (
        <div className="w-3/5 mx-auto p-6 border border-white/20 rounded-2xl my-10 mb-20">

            <h1 className="text-4xl font-semibold mt-10 text-center mb-6">Your Perfect Candidates</h1>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mb-4">
                <button
                    className={`p-2 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                >
                    <ChevronLeft size={24} className="text-[#1B1F3B]" />
                </button>
                <span className="text-[#1B1F3B]">Page {currentPage + 1} of {totalPages}</span>
                <button
                    className={`p-2 ${currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                >
                    <ChevronRight size={24} className="text-[#1B1F3B]" />
                </button>
            </div>

            {/* Applicant Cards */}
            {currentApplicants.map((applicant, index) => (
                <ApplicantCard key={index} applicant={applicant} />
            ))}
        </div>
    );
}
