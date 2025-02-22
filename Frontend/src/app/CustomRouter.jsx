"use client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page";
import Hiring from "./Hiring";
import AnalysisContainer from "./AnalysisContainer";
export default function CustomRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<AnalysisContainer />} />
        <Route path="/hiring" element={<Hiring />} />
      </Routes>
    </Router>
  );
}
