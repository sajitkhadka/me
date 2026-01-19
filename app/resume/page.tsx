"use client";

import React, { useState, useEffect } from "react";
import { getResumeData } from "./actions";
import InteractiveResume from "./interactive-resume";

export const metadata = {
  title: "Sajit Khadka",
  description:
    "Resume of Sajit Khadka, a software engineer and web developer. Explore his skills, experience, education, and projects.",
  openGraph: {
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajit Khadka - Resume of a software engineer and web developer",
    description:
      "Resume of Sajit Khadka, a software engineer and web developer. Explore his skills, experience, education, and projects.",
    images: ["https://sajitkhadka.com/avatar.png"],
    creator: "@sajitkhadka",
  },
};

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResumeData().then((data) => {
      setResumeData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading resume...</div>
      </div>
    );
  }

  return <InteractiveResume resumeData={resumeData} />;
}
