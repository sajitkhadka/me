export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-background w-full">
            <div className="container max-w-7xl mx-auto p-8 box-border">
                <h1 className="text-2xl font-semibold mb-2">Projects</h1>
                <p className="mb-6 text-muted-foreground">
                    Things I build for myself, most of them running on my own Kubernetes cluster.
                </p>
                {children}
            </div>
        </main>
    );
}
