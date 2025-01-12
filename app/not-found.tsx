import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center w-full bg-gradient-to-r from-slate-500 via-cyan-200 to-slate-700">
            <div className="text-center text-slate-700">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-4xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 text-lg font-semibold text-slate-600 bg-white rounded-full hover:bg-purple-100 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

