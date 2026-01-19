"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Download,
  TrendingUp,
} from "lucide-react";
import { getResumeData } from "./actions";

const InteractiveResume = ({ resumeData }: { resumeData: any }) => {
  const [activeTab, setActiveTab] = useState("experience");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // Use provided data or default data
  const data = resumeData;
  const { personal, stats, skills, experiences, education } = data;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    try {
      const resumeUrl = process.env.NEXT_PUBLIC_RESUME_API_URL;
      if (!resumeUrl) {
        alert("Resume download URL is not configured.");
        return;
      }

      // Open the resume URL in a new tab to download
      window.open(resumeUrl, "_blank");
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    }
  };

  const coreExpertise = data.coreExpertise;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-100/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Minimal Header */}
        <div
          className={`border-b transition-all duration-300 ${scrolled ? "shadow-sm bg-white/80 backdrop-blur-md sticky top-0 z-50" : "bg-white/60 backdrop-blur-sm"}`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8">
              <div className="flex-1 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                  {personal?.name || "Your Name"}
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-3 sm:mb-4">
                  {personal?.title || "Your Title"}
                </p>
                <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
                  {personal?.summary || "Your professional summary"}
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-slate-900 text-slate-900 rounded-lg font-medium hover:bg-slate-900 hover:text-white transition-all hover:shadow-lg hover:scale-105"
              >
                <Download size={18} />
                Resume
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mt-4 sm:mt-6 text-xs sm:text-sm text-slate-600">
              {personal?.email && (
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors group"
                >
                  <Mail
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>{personal.email}</span>
                </a>
              )}
              {personal?.phone && (
                <a
                  href={`tel:${personal.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors group"
                >
                  <Phone
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>{personal.phone}</span>
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
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors group"
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
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors group"
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

        {/* Stats Bar */}
        {stats && stats.length > 0 && (
          <div className="border-b bg-white/60 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat: any, idx: number) => (
                  <div
                    key={idx}
                    className={`text-center transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${stat.delay}ms` }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                <Briefcase size={16} className="mr-1.5 sm:mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                <Code size={16} className="mr-1.5 sm:mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium whitespace-nowrap"
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
                    className="border-l-2 border-slate-200 pl-8 pb-8 relative group hover:border-blue-400 transition-colors"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-blue-500 group-hover:scale-125 transition-all" />

                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-slate-600 mb-1">
                        <span className="font-medium">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {exp.period}
                      </p>
                    </div>

                    {exp.description && (
                      <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((achievement: any, i: number) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 group/item hover:bg-blue-50/50 p-2 -ml-2 rounded transition-colors"
                          >
                            <TrendingUp
                              size={16}
                              className="text-slate-400 mt-0.5 flex-shrink-0 group-hover/item:text-blue-600 transition-colors"
                            />
                            <div className="flex-1">
                              <span className="text-sm sm:text-base text-slate-700">
                                {achievement.text}
                              </span>
                              {achievement.impact && (
                                <span className="ml-2 text-xs sm:text-sm font-medium text-slate-900">
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
                            className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">
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
                          <h3 className="text-lg font-semibold text-slate-900 pb-2 border-b border-slate-200">
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
                                      ? "bg-blue-600 text-white scale-105 shadow-md"
                                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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

                  <div className="mt-10 p-6 bg-gradient-to-br from-blue-50/50 to-slate-50/50 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      Core Expertise
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {coreExpertise.map((expertise: string) => (
                        <span
                          key={expertise}
                          className="px-4 py-2 border-2 border-slate-900 text-slate-900 rounded-lg font-medium hover:bg-slate-900 hover:text-white transition-colors cursor-default"
                        >
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-slate-500 text-center py-8">
                  No skills data available
                </p>
              )}
            </TabsContent>

            <TabsContent value="education" className="mt-8 space-y-6">
              {education && education.length > 0 ? (
                education.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm bg-white/60 backdrop-blur-sm transition-all"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-slate-600 mb-2">{edu.field}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <span className="font-medium">{edu.school}</span>
                      <span>•</span>
                      <span>{edu.location}</span>
                      <span>•</span>
                      <span>{edu.period}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">
                  No education data available
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="border-t bg-white/60 backdrop-blur-sm py-6 sm:py-8 mt-12 sm:mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm sm:text-base text-slate-600">
              {data.footer ||
                "Open to exciting opportunities in backend engineering and distributed systems"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveResume;
