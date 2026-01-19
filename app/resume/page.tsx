import React, { useState, useEffect } from "react";
import { getResumeData } from "./actions";
import InteractiveResume from "./interactive-resume";

export const metadata = {
  title: "Resume of Sajit Khadka",
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

export default async function ResumePage() {
  const resumeData = await getResumeData();
  return <InteractiveResume resumeData={resumeData} />;
}
