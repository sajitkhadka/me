'use client'
import { siteConfig } from "@/config/site";
// import { Mail } from "lucide-react";
import { Linkedin, Mail, X } from 'lucide-react';
import { motion } from "framer-motion";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-4 px-4 sm:px-6 lg:px-8 border-t border-border bg-background/95"
    >
      <div className="max-w-3xl mx-auto flex justify-center items-center flex-col gap-3">
        <div className="flex space-x-5">
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-600 transition-colors duration-200">
            <Linkedin size={18} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href={siteConfig.links.x} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-600 transition-colors duration-200">
            <Icons.twitter />
            <span className="sr-only">X</span>
          </a>
          <a href="mailto:sajitkhadka@gmail.com" className="font-bold hover:text-gray-600 transition-colors duration-200">
            <Mail size={18} />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          Sajit Khadka
        </p>
      </div>
    </motion.footer>
  );
}
