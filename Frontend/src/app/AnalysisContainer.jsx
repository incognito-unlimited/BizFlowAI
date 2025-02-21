"use client"

import TechStack from "./Components/TechStack";
import PaidFeature from "./Components/PaidFeatures";
import PriceRange from "./PriceRange";
import ApplicantCard from "./Components/ApplicantCard";

export default function AnalysisContainer() {
    return (
        <div>
            <PaidFeature/>
            <TechStack/>
            <PriceRange/>
            <ApplicantCard/>
        </div>
    );
}