"use client";

import { useState } from "react";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [companyHistoryFile, setCompanyHistoryFile] = useState("");

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
      } else if (file.type === "application/pdf") {
        alert("PDF preview is not available, but you can submit it.");
      }
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
    alert("Form Submitted!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Product Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Product/Feature Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Description Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Enter Product Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description or upload a file"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* File Upload for Product Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Product Description (.txt or .pdf)
          </label>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFileUpload}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {fileName && <p className="text-gray-600 text-sm mt-2">Uploaded: {fileName}</p>}
        </div>

        {/* File Upload for Company History */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Add Company History (CSV or Excel)
          </label>
          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleCompanyHistoryUpload}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          {companyHistoryFile && (
            <p className="text-gray-600 text-sm mt-2">Uploaded: {companyHistoryFile}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
