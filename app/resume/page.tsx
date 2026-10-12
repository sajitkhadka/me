import { ogImage } from "@/config/site";
import { resume } from "@/config/resume";
import InteractiveResume from "./interactive-resume";

export const metadata = {
  alternates: { canonical: "/resume" },
  title: { absolute: "Resume of Sajit Khadka | Software Engineer" },
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

export default function ResumePage() {
  return <InteractiveResume resumeData={resume} />;
}
