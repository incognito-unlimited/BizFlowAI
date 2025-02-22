import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TechStack from "./Components/TechStack";
import PaidFeature from "./Components/PaidFeatures";
import PriceRange from "./Components/PriceRange";

export default function AnalysisContainer() {
    const router = useRouter();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [productName, setProductName] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("productName");
        if (name) {
            setProductName(name);
        }
    }, []);

    const handleFileUpload = (event) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            // Filter to allow only PDFs and Docs
            const validFiles = selectedFiles.filter(file =>
                file.type === "application/pdf" ||
                file.type === "application/msword" ||
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );
            setFiles(validFiles);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            const droppedFiles = Array.from(event.dataTransfer.files);
            const validFiles = droppedFiles.filter(file =>
                file.type === "application/pdf" ||
                file.type === "application/msword" ||
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            );
            setFiles(validFiles);
        }
    };

    const handleSubmit = () => {
        if (files.length > 0) {
            setIsOverlayOpen(false);
            router.push("/hiring");
        } else {
            alert("Please upload at least one PDF or DOC file.");
        }
    };

    return (
        <div className="mb-10">
            <h1 className="text-4xl text-white/70 font-semibold mt-10 text-center mb-6">
                {productName || "Product Name"}
            </h1>
            <div className="w-3/6 mx-auto p-6 mt-10 shadow-lg rounded-2xl 
                bg-white/10 border border-white/20 
                backdrop-blur-lg backdrop-saturate-150">
                {/* Main Content */}
                <div className="flex-grow">
                    <PaidFeature />
                    <TechStack />
                    <PriceRange />
                </div>

                {/* Bottom Right Button */}
                <div className="mt-6">
                    <button
                        onClick={() => setIsOverlayOpen(true)}
                        className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-blue-700 transition"
                    >
                        Start Hiring
                    </button>
                </div>
            </div>

            {/* File Upload Overlay */}
            {isOverlayOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        className="bg-white w-2/3 max-w-lg p-6 rounded-lg shadow-xl relative"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-center text-[#274C77]">
                            Upload All Resumes
                        </h2>
                        <p className="text-gray-600 text-center mb-4">
                            Drag & drop or select files to upload (PDFs, Docs only)
                        </p>
                        <div
                            className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500 cursor-pointer"
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            Click to browse or drag files here
                        </div>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            accept=".pdf, .doc, .docx"
                            className="hidden"
                            onChange={handleFileUpload}
                        />

                        {/* Selected Files Preview */}
                        <div className="mt-4 max-h-40 overflow-y-auto">
                            {files.length > 0 ? (
                                <ul className="text-sm text-gray-700">
                                    {files.map((file, index) => (
                                        <li key={index} className="py-1">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-400">No valid files selected.</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsOverlayOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#274C77] text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={handleSubmit}
                            >
                                Submit & Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
