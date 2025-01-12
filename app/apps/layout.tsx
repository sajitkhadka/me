import { Suspense } from "react";
import Loading from "./components/loading";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <main className="min-h-screen bg-white w-full">
            <div className="container max-w-7xl mx-auto p-8 box-border">
                <h1 className="text-2xl font-semibold mb-6">My Applications</h1>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
        </main>
    );
}
