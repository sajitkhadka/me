"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Download,
  TrendingUp,
} from "lucide-react";

const InteractiveResume = ({ resumeData }: { resumeData: any }) => {
  const [activeTab, setActiveTab] = useState("experience");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Use provided data or default data
  const data = resumeData;
  const { personal, skills, experiences, education } = data;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coreExpertise = data.coreExpertise;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        {/* Minimal Header */}
        <div
          className={`border-b transition-all duration-300 ${scrolled ? "shadow-sm bg-background/80 backdrop-blur-md z-50" : "bg-background/60 backdrop-blur-sm"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8">
              <div className="flex-1 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">
                  {personal?.name || "Your Name"}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4">
                  {personal?.title || "Your Title"}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  {personal?.summary || "Your professional summary"}
                </p>
              </div>
              <a
                href="/resume.pdf"
                download="Sajit-Khadka-Resume.pdf"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-foreground text-foreground rounded-lg font-medium hover:bg-foreground hover:text-background transition-all hover:shadow-lg hover:scale-105"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground">
              {personal?.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
                >
                  <Mail
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>{personal.email}</span>
                </a>
              )}
              {personal?.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal?.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
                >
                  <Linkedin
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>LinkedIn</span>
                </a>
              )}
              {personal?.website && (
                <a
                  href={personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
                >
                  <Globe
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>{personal.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 sm:mb-8 overflow-x-auto">
              <TabsTrigger
                value="experience"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                <Briefcase size={16} className="mr-1.5 sm:mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                <Code size={16} className="mr-1.5 sm:mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                <GraduationCap size={18} className="mr-2" />
                Education
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="space-y-8 mt-8">
              {experiences && experiences.length > 0 ? (
                experiences.map((exp: any, idx: number) => (
                  <div
                    key={exp.id || idx}
                    className="border-l-2 border-border pl-8 pb-8 relative group hover:border-primary transition-colors"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-primary group-hover:scale-125 transition-all" />

                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-muted-foreground mb-1">
                        <span className="font-medium">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {exp.period}
                      </p>
                    </div>

                    {exp.description && (
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((achievement: any, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 group/item hover:bg-accent p-2 -ml-2 rounded transition-colors"
                          >
                            <TrendingUp
                              size={16}
                              className="text-muted-foreground mt-0.5 flex-shrink-0 group-hover/item:text-primary transition-colors"
                            />
                            <div className="flex-1">
                              <span className="text-sm sm:text-base text-foreground">
                                {achievement.text}
                              </span>
                              {achievement.impact && (
                                <span className="ml-2 text-xs sm:text-sm font-medium text-foreground">
                                  → {achievement.impact}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {exp.tech && exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-muted text-foreground text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No experience data available
                </p>
              )}
            </TabsContent>

            <TabsContent value="skills" className="mt-8">
              {skills && Object.keys(skills).length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(skills).map(
                      ([category, items]: [string, any]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground pb-2 border-b border-border">
                            {category}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(items) &&
                              items.map((skill: string) => (
                                <span
                                  key={skill}
                                  onMouseEnter={() =>
                                    setHoveredSkill(skill as any)
                                  }
                                  onMouseLeave={() => setHoveredSkill(null)}
                                  className={`px-4 py-2 text-sm rounded-lg cursor-default transition-all duration-200 ${
                                    hoveredSkill === skill
                                      ? "bg-primary text-primary-foreground scale-105 shadow-md"
                                      : "bg-muted text-foreground hover:bg-accent"
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-10 p-6 bg-accent/50 rounded-lg border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Core Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {coreExpertise.map((expertise: string) => (
                        <span
                          key={expertise}
                          className="px-4 py-2 border-2 border-foreground text-foreground rounded-lg font-medium hover:bg-foreground hover:text-background transition-colors cursor-default"
                        >
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No skills data available
                </p>
              )}
            </TabsContent>

            <TabsContent value="education" className="mt-8 space-y-6">
              {education && education.length > 0 ? (
                education.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 border border-border rounded-lg hover:border-primary hover:shadow-sm bg-background/60 backdrop-blur-sm transition-all"
                  >
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-2">{edu.field}</p>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="font-medium">{edu.school}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No education data available
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-background/60 backdrop-blur-sm py-6 sm:py-8 mt-12 sm:mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              {data.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveResume;
