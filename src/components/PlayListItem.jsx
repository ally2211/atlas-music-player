import React from 'react';

const PlayListItem = ({ 
  title, 
  artist, 
  length, 
  loading = false,
  className = "",
  onClick
}) => {
  if (loading) {
    return (
      <div className={`p-2 border-b w-full max-w-[400px] animate-pulse ${className}`}>
        <div className="flex justify-between mb-1">
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div
      className={`border border-warmYellow rounded-lg p-3 transition duration-200
         hover:bg-warmYellow hover:text-darkBlue cursor-pointer
         text-softBlack dark:text-warmWhite ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="font-inter font-medium text-base leading-none tracking-normal">
          {title}
        </div>
        <div className="text-sm opacity-70">{length}</div>
      </div>
      <div className="text-sm opacity-60">{artist}</div>
    </div>
  );
};

export default PlayListItem;
