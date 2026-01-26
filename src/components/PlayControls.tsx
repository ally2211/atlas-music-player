import { useState } from 'react';

interface PlayControlsProps {
    song?: string;
    onPrevious?: () => void;
    onNext?: () => void;
    onShuffle?: () => void;
    isShuffleOn?: boolean;
    volume?: number;
    isPlaying?: boolean;
    onPlayPause?: () => void;
    onSpeedChange?: (speed: number) => void;
    onPlayStateChange?: (isPlaying: boolean) => void;
    onEnded?: () => void;
}

const iconClass = "w-6 h-6 text-black dark:text-warmWhite hover:text-yellow-400 transition";

const PlayControls = ({
    song,
    onPrevious,
    onNext,
    onShuffle,
    isShuffleOn = false,
    isPlaying = false,
    onPlayPause,
    onSpeedChange,
}: PlayControlsProps) => {

    const handlePlayPause = () => {
        console.log('PlayControls handlePlayPause called');
        console.log('song:', song);
        console.log('isPlaying:', isPlaying);

        if (!song) {
            console.log('No song URL provided');
            return;
        }

        if (onPlayPause) {
            onPlayPause();
        }
    };

    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const handleSpeed = () => {
        const speeds = [0.5, 1, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        const newSpeed = speeds[nextIndex];

        setPlaybackSpeed(newSpeed);
        if (onSpeedChange) {
            onSpeedChange(newSpeed);
        }
        console.log('Speed changed to:', newSpeed);
    };

    const handlePrevious = () => {
        if (onPrevious) {
            onPrevious();
        }
    };

    const handleNext = () => {
        if (onNext) {
            onNext();
        }
    };

    const handleShuffle = () => {
        if (onShuffle) {
            onShuffle();
        }
    };

    return (
        <div className="flex justify-between gap-4 mt-4 w-full max-w-[400px]">
            {/* Speed */}
            <button className="p-2" onClick={handleSpeed}>
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4h2v16H4zM18 4l-8.5 8L18 20V4z" />
                </svg>
            </button>

            {/* Back */}
            <button className="p-2" onClick={handlePrevious}>
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 19L2 12L11 5V19Z" />
                    <path d="M22 19L13 12L22 5V19Z" />
                </svg>
            </button>

            {/* Play/Pause - Bigger */}
            <button
                className="p-2"
                onClick={() => {
                    console.log('Play button clicked!');
                    handlePlayPause();
                }}
            >
                <svg
                    className="w-10 h-10 text-black dark:text-warmWhite hover:text-yellow-400 transition"
                    viewBox="0 0 48 48"
                    fill="currentColor"
                >
                    <rect x="1" y="1" width="46" height="46" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    {isPlaying ? (
                        // Pause icon
                        <>
                            <rect x="16" y="15" width="4" height="18" fill="currentColor" />
                            <rect x="28" y="15" width="4" height="18" fill="currentColor" />
                        </>
                    ) : (
                        // Play icon
                        <path d="M18 15L32 24L18 33V15Z" />
                    )}
                </svg>
            </button>

            {/* Forward */}
            <button className="p-2" onClick={handleNext}>
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 19L21 12L12 5V19Z" />
                    <path d="M1 19L10 12L1 5V19Z" />
                </svg>
            </button>

            {/* Shuffle */}
            <button className="p-2" onClick={handleShuffle}>
                <svg className={`${iconClass} ${isShuffleOn ? '!text-yellow-400 dark:!text-yellow-400' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 14L22 18L18 22" />
                    <path d="M18 2L22 6L18 10" />
                    <path d="M2 18H3.973C4.619 18.004 5.257 17.852 5.832 17.556C6.407 17.26 6.901 16.829 7.273 16.3L12.727 7.7C13.099 7.171 13.593 6.74 14.168 6.444C14.743 6.148 15.38 5.996 16.027 6H22" />
                    <path d="M2 6H3.972C4.717 5.995 5.45 6.198 6.086 6.587C6.722 6.975 7.237 7.534 7.572 8.2" />
                    <path d="M22 18H15.959C15.304 17.993 14.66 17.826 14.084 17.512C13.509 17.198 13.02 16.747 12.659 16.2L12.3 15.75" />
                </svg>
            </button>
        </div>
    );
};

export default PlayControls;
