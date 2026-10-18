import { Download } from "lucide-react";
import type { Resume } from "@/config/resume";

// A plain, single-column resume: header, summary, experience, skills, education.
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-8 print:mt-4">
    <h2 className="mb-3 border-b pb-1 text-sm font-bold uppercase tracking-wider">{title}</h2>
    {children}
  </section>
);

const InteractiveResume = ({ resumeData }: { resumeData: Resume }) => {
  const { personal, skills, experiences, education, coreExpertise } = resumeData;
  const site = personal?.website?.replace(/^https?:\/\//, "");
  const linkedin = personal?.linkedin?.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 print:max-w-none print:p-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{personal?.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{personal?.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {[
              personal?.email && (
                <a key="e" href={`mailto:${personal.email}`} className="hover:text-foreground hover:underline">
                  {personal.email}
                </a>
              ),
              site && (
                <a key="w" href={personal.website} className="hover:text-foreground hover:underline">
                  {site}
                </a>
              ),
              linkedin && (
                <a key="l" href={personal.linkedin} className="hover:text-foreground hover:underline">
                  {linkedin}
                </a>
              ),
            ]
              .filter(Boolean)
              .map((item, i) => (
                <span key={i}>
                  {i > 0 && " · "}
                  {item}
                </span>
              ))}
          </p>
        </div>
        <a
          href="/resume.pdf"
          download="Sajit-Khadka-Resume.pdf"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-secondary print:hidden"
        >
          <Download size={16} /> PDF
        </a>
      </header>

      {personal?.summary && (
        <Section title="Summary">
          <p className="text-sm leading-relaxed sm:text-base">{personal.summary}</p>
        </Section>
      )}

      <Section title="Experience">
        <div className="space-y-6">
          {experiences?.map((exp, idx) => (
            <div key={exp.id ?? idx} className="break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-semibold">
                  {exp.title}, {exp.company}
                </h3>
                <p className="text-sm text-muted-foreground">{exp.period}</p>
              </div>
              {exp.description && <p className="mt-1 text-sm sm:text-base">{exp.description}</p>}
              {exp.achievements?.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm sm:text-base">
                  {exp.achievements.map((a, i) => (
                    <li key={i}>
                      {a.text}
                      {a.impact ? ` (${a.impact})` : ""}
                    </li>
                  ))}
                </ul>
              )}
              {exp.tech?.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tech:</span> {exp.tech.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <dl className="space-y-1 text-sm sm:text-base">
          {Object.entries(skills ?? {}).map(([group, items]) => (
            <div key={group}>
              <dt className="inline font-semibold">{group}: </dt>
              <dd className="inline">{Array.isArray(items) ? items.join(", ") : null}</dd>
            </div>
          ))}
          {coreExpertise?.length > 0 && (
            <div>
              <dt className="inline font-semibold">Core expertise: </dt>
              <dd className="inline">{coreExpertise.join(", ")}</dd>
            </div>
          )}
        </dl>
      </Section>

      <Section title="Education">
        <div className="space-y-2">
          {education?.map((edu, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p>
                <span className="font-semibold">
                  {edu.degree}, {edu.field}
                </span>
                , {edu.school}
              </p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default InteractiveResume;
