import { Metadata } from 'next';
import { projects } from '@/config/projects';
import { ogImage } from '@/config/site';
import AppGrid from './components/AppGrid';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Apps and tools I have built: a home Kubernetes platform, a shared schedule board, an English speaking trainer and more.',
    keywords: 'projects, Go, Next.js, Kubernetes, side projects',
    openGraph: { type: 'website', title: 'Projects - Sajit Khadka', images: [ogImage('Projects', 'project')] },
}

export default function Home() {
    return <AppGrid projects={projects} />;
}
