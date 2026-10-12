import type { Metadata } from "next";
import { resume } from "@/config/resume";
import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Resume of Sajit Khadka (print)",
  robots: { index: false },
};

export default function PrintResumePage() {
  const { personal, experiences, skills, education } = resume;

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 text-sm leading-snug print:max-w-none print:p-0">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <p className="text-muted-foreground">
          Use your browser&apos;s print dialog and choose &quot;Save as PDF&quot;.
        </p>
        <PrintButton />
      </div>

      <header className="mb-4 border-b pb-3">
        <h1 className="text-2xl font-bold">{personal.name}</h1>
        <p className="text-base">{personal.title}</p>
        <p className="mt-1 text-muted-foreground">
          {personal.email} · {personal.website?.replace(/^https?:\/\//, "")} ·{" "}
          {personal.linkedin?.replace(/^https?:\/\//, "")}
        </p>
        <p className="mt-2">{personal.summary}</p>
      </header>

      <section className="mb-4">
        <h2 className="mb-2 text-base font-bold uppercase tracking-wide">Experience</h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="mb-3 break-inside-avoid">
            <div className="flex justify-between gap-4">
              <p className="font-semibold">
                {exp.title}, {exp.company}
              </p>
              <p className="shrink-0 text-muted-foreground">{exp.period}</p>
            </div>
            <ul className="mt-1 list-disc pl-5">
              {exp.achievements.map((item) => (
                <li key={item.text}>
                  {item.text}
                  {item.impact ? ` (${item.impact})` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-4 break-inside-avoid">
        <h2 className="mb-2 text-base font-bold uppercase tracking-wide">Skills</h2>
        {Object.entries(skills).map(([group, items]) => (
          <p key={group}>
            <span className="font-semibold">{group}:</span> {items.join(", ")}
          </p>
        ))}
      </section>

      <section className="break-inside-avoid">
        <h2 className="mb-2 text-base font-bold uppercase tracking-wide">Education</h2>
        {education.map((edu) => (
          <p key={edu.school}>
            <span className="font-semibold">{edu.degree}, {edu.field}</span>, {edu.school} ({edu.period})
          </p>
        ))}
      </section>
    </div>
  );
}
