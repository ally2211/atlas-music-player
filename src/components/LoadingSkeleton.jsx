import React from 'react';

export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-4 p-4 max-w-md mx-auto">
            {/* Simulated title */}
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Simulated media/image block */}
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>

            {/* Simulated text lines */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
        </div>
    );
}