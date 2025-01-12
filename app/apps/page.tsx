import { Suspense } from 'react';
import { getApps } from './actions';
import AppGrid from './components/AppGrid';
import Loading from './components/loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Applications',
    description: 'List of web applications and projects I built!',
    keywords: "Applications, Development, Portfolio!"
}

export default async function Home() {
    const apps = await getApps();

    return (
        <main className="min-h-screen bg-white w-full">
            <div className="container max-w-7xl mx-auto p-8 box-border">
                <h1 className="text-2xl font-semibold mb-6">My Applications</h1>
                <Suspense fallback={<Loading />}>
                    <AppGrid apps={apps} />
                </Suspense>
            </div>
        </main>
    );
}

