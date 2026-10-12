export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <header className="mb-10 space-y-2">
                <p className="eyebrow">Selected work</p>
                <h1 className="text-3xl font-bold sm:text-4xl">Projects</h1>
                <p className="max-w-2xl text-muted-foreground">
                    Things I build for myself, most of them running on my own Kubernetes cluster.
                </p>
            </header>
            {children}
        </div>
    );
}
