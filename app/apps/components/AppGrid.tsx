'use client'

import { motion } from 'framer-motion';
import AppIcon from './AppIcon';
import { MyApp } from '@prisma/client';

interface AppGridProps {
    apps: MyApp[];
}

export default function AppGrid({ apps }: AppGridProps) {
    return (
        <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {apps.map((app, index) => (
                <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    <AppIcon app={app} />
                </motion.div>
            ))}
        </motion.div>
    );
}

