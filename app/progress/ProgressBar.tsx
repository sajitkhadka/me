'use client'

import { useState, useEffect } from 'react'

export default function ProgressBar() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                const newProgress = Math.min(oldProgress + Math.random() * 10, 90)
                return Math.round(newProgress * 100) / 100
            })
        }, 500)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full max-w-md bg-white rounded-full h-4 dark:bg-gray-700">
            <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            >
            </div>
            <p className="text-center mt-2">{progress.toFixed(2)}% Complete</p>
        </div>
    )
}

