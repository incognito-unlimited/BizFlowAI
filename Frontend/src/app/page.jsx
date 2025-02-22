"use client"

import Image from "next/image";
import ProductForm from "./Components/ProductForm";
import AnalysisContainer from "./AnalysisContainer";


export default function Home() {
  return (
    <div>
    <div className="home_container p-10">
    <h1 className="text-center text-3xl font-montserrat font-bold text-white/70">New Product Analysis</h1>
    <ProductForm/>
    </div>
    </div>
  );
}
