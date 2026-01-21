import React from 'react';
import volumeIcon from '../assets/VolumeIcon.svg';

const VolumeControls = ({ volume, setVolume }) => (
    <div className="mt-4 w-full">
        <div className="flex items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-softBlack dark:text-warmWhite hover:text-yellow-400 transition"
            >
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-.77-3.29-2-4.3v8.59c1.23-1.01 2-2.53 2-4.29zM14 3.23v2.06c3.39 1.05 6 4.15 6 7.71s-2.61 6.66-6 7.71v2.06c4.45-1.17 8-5.28 8-9.77s-3.55-8.6-8-9.77z" />
            </svg>

            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full"
            />
        </div>
    </div>
);

export default VolumeControls;
