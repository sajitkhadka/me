import { ogImage } from "@/config/site";
import { getResumeData } from "./actions";
import InteractiveResume from "./interactive-resume";

export const metadata = {
  title: "Resume of Sajit Khadka",
  description:
    "Resume of Sajit Khadka, a software engineer working on integrations and event-driven backend systems: experience, skills and education.",
  openGraph: {
    type: "profile",
    title: "Resume of Sajit Khadka",
    images: [ogImage("Resume of Sajit Khadka", "resume")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume of Sajit Khadka",
    description:
      "Resume of Sajit Khadka, a software engineer working on integrations and event-driven backend systems: experience, skills and education.",
    images: [ogImage("Resume of Sajit Khadka", "resume")],
    creator: "@sajitkhadka",
  },
};

export default async function ResumePage() {
  const resumeData = await getResumeData();
  return <InteractiveResume resumeData={resumeData} />;
}
