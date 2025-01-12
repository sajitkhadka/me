import { Metadata } from 'next';
import { getApps } from './actions';
import AppGrid from './components/AppGrid';

export const metadata: Metadata = {
    title: 'My Applications',
    description: 'List of web applications and projects I built!',
    keywords: "Applications, Development, Portfolio!"
}

export default async function Home() {
    const apps = await getApps();

    return (
        <AppGrid apps={apps} />
    );
}

