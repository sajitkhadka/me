'use client'
import { siteConfig } from "@/config/site";
// import { Mail } from "lucide-react";
import { Linkedin, Mail, X } from 'lucide-react';
import { motion } from "framer-motion";
import { Icons } from "../custom-ui/icons";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Separator } from "../ui/separator";

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
            <Icons.linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/sajitkhadka" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gray-600 transition-colors duration-200">
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="mailto:sajitkhadka@gmail.com" className="font-bold hover:text-gray-600 transition-colors duration-200">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <div className="flex text-sm text-muted-foreground space-x-4">
          <span>&copy; {new Date().getFullYear()} Sajit Khadka</span> <span>|</span>  <Link href={absoluteUrl("/privacy-policy")}>Privacy Policy</Link> <span>|</span> <Link href={absoluteUrl("/about")}>About Me</Link>
        </div>
      </div>
    </motion.footer>
  );
}
