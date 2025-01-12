'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MyApp } from '@prisma/client';
import { ImageApi } from '@/lib/api/ImageApi';

interface AppIconProps {
    app: MyApp;
}

export default function AppIcon({ app }: AppIconProps) {
    const color = app.color || ['#ff6347', '#4682b4', '#0891b2', '#ca8a04'][Math.floor(Math.random() * 4)]
    return (
        <Link href={app.url}>
            <motion.div
                className="group relative aspect-square rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                    <div
                        className="relative w-14 h-14 rounded-lg overflow-hidden"
                        style={{ backgroundColor: color }}
                    >
                        <Image
                            src={ImageApi.getUrl(app.icon) || '/images/bug.svg'}
                            alt={app.name}
                            className="p-3"
                            width={56}
                            height={56}
                        />
                    </div>
                    <span className="text-sm font-medium text-center text-gray-700 group-hover:text-gray-900">
                        {app.name}
                    </span>
                </div>
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent"
                    whileHover={{ borderColor: color }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>
        </Link>
    );
}

