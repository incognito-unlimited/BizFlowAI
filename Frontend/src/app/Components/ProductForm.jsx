"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [companyHistoryFile, setCompanyHistoryFile] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "text/plain" || file.type === "application/pdf") {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (event) => {
        setProductDescription(event.target.result);
      };

      if (file.type === "text/plain") {
        reader.readAsText(file);
      } 
      // else if (file.type === "application/pdf") {
      //   alert("PDF preview is not available, but you can submit it.");
      // }
    } else {
      alert("Only .txt and .pdf files are allowed.");
    }
  };

  const handleCompanyHistoryUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      file.type === "text/csv" ||
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setCompanyHistoryFile(file.name);
    } else {
      alert("Only CSV or Excel files are allowed.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Name:", productName);
    console.log("Product Description:", productDescription);
    console.log("Uploaded File:", fileName);
    console.log("Company History File:", companyHistoryFile);
    router.push(`/analysis?productName=${encodeURIComponent(productName)}`);
  };
  

  return (
<div className="w-4/5 mx-auto p-6 bg-white/10 backdrop-blur-lg  border-white/30 shadow-lg rounded-2xl mt-10">
<form className="space-y-4" onSubmit={handleSubmit}>
        {/* Product Name Field */}
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-[#ffffff] font-medium">Product/Feature Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-3/4 p-2 bg-black/20 rounded-md text-white placeholder-gray-400"
            required
          />
        </div>

        {/* Product Description Field */}
        <div className="flex items-start space-x-4">
          <label className="w-1/4 text-white font-medium">Product Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description or upload a file"
            className="w-3/4 h-[40vh] p-2 bg-black/20 rounded-md text-white placeholder-gray-400 placeholder-[12px]"
            rows="4"
            required
          ></textarea>
        </div>

        {/* File Upload for Product Description */}
        <div className="flex items-center space-x-4">
          <label className="w-1/4 text-[#ffffff] font-medium">Upload Description</label>
          <div className="relative w-3/4">
            <input
              type="file"
              accept=".txt,.pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button type="button" className="bg-white/50 text-black text-[12px] py-1 px-3 rounded-sm">
              Choose File
            </button>
            <span className="ml-2 text-gray-400">{fileName ? fileName : "No file chosen"}</span>
          </div>
        </div>

        {/* File Upload for Company History */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="w-1/4 text-[#ffffff] font-medium">Company History</label>
          <div className="relative w-3/4">
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleCompanyHistoryUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button type="button" className="bg-white/50 text-black text-[12px] py-1 px-3 rounded-sm">
              Choose File
            </button>
            <span className="ml-2 text-gray-400">
              {companyHistoryFile ? companyHistoryFile : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
        <button
          type="submit"
          className="w-fit px-10 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

