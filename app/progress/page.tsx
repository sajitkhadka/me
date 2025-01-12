import { Metadata } from 'next'
import ProgressBar from './ProgressBar'

export const metadata: Metadata = {
    title: 'Work in Progress | My Awesome App',
    description: 'I am working hard to bring something amazing. Stay tuned!',
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-slate-500 via-cyan-200  to-slate-700 text-gray-800">
            <h1 className="text-5xl font-bold mb-8 text-center">Work in Progress</h1>
            <p className="text-xl mb-12 text-center max-w-2xl">
                I am working hard to bring something amazing. Stay tuned for updates!
            </p>
            <ProgressBar />
            <p className="mt-8 text-sm opacity-75">
                Expected completion: Coming Soon
            </p>
        </div>
    )
}

