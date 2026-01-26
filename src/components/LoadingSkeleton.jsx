export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-[900px] mx-auto p-4 sm:p-8 animate-pulse">
            {/* Player Column Skeleton */}
            <div className="w-full md:w-1/2 space-y-6">
                {/* Cover Art Skeleton */}
                <div className="w-full aspect-square bg-gray-300 dark:bg-gray-700 rounded"></div>

                {/* Song Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>

                {/* Play Controls Skeleton */}
                <div className="flex justify-between gap-4">
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>

                {/* Volume Control Skeleton */}
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </div>

            {/* Playlist Column Skeleton */}
            <div className="w-full md:w-1/2 space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div className="space-y-3">
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
