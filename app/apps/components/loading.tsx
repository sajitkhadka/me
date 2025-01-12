export default function Loading() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="aspect-square rounded-lg bg-gray-100 animate-pulse"
                />
            ))}
        </div>
    );
}

