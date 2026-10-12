'use client'

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import type { Project } from '@/config/projects';

export default function AppGrid({ projects }: { projects: Project[] }) {
    return (
        <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {projects.map((project, index) => (
                <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </motion.div>
    );
}
