import React, { useEffect, useState } from 'react';
import CurrentlyPlaying from './CurrentlyPlaying';
import PlayListItem from './PlayListItem';
import LoadingSkeleton from './LoadingSkeleton';


const MusicPlayer = () => {
    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);

    // Fetch playlist
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('/api/v1/playlist');
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist');
                }
                const data = await response.json();
                setPlaylist(data);

                // Fetch details for the first song
                if (data.length > 0) {
                    await fetchSongDetails(data[0].id);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching playlist:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaylist();
    }, []);

    // Fetch song details
    const fetchSongDetails = async (songId) => {
        try {
            const response = await fetch(`/api/v1/songs/${songId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch song details');
            }
            const data = await response.json();
            setCurrentSong(data);
        } catch (err) {
            console.error('Error fetching song details:', err);
        }
    };

    // Handle song selection
    const handleSongSelect = async (index) => {
        if (playlist[index]) {
            setCurrentSongIndex(index);
            await fetchSongDetails(playlist[index].id);
            setIsPlaying(false);
        }
    };

    // Play controls
    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleNext = async () => {
        const nextIndex = (currentSongIndex + 1) % playlist.length;
        await handleSongSelect(nextIndex);
        setIsPlaying(true);
    };

    const handlePrevious = async () => {
        const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
        await handleSongSelect(prevIndex);
        setIsPlaying(true);
    };

    const handleShuffle = () => {
        // Shuffle playlist logic can be implemented here
        console.log('Shuffle clicked');
    };

    const handleSpeedChange = () => {
        // Speed change logic can be implemented here
        console.log('Speed change clicked');
    };

    if (isLoading) return <LoadingSkeleton />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <p className="text-red-500">Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-warmYellow text-softBlack rounded-lg hover:bg-yellow-400"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-[900px] mx-auto p-4 sm:p-8">
            {/* Player Column */}
            <div className="w-full md:w-1/2">
                <CurrentlyPlaying
                    title={currentSong?.title || playlist[currentSongIndex]?.title}
                    artist={currentSong?.artist || playlist[currentSongIndex]?.artist}
                    coverUrl={currentSong?.cover}
                    volume={volume}
                    setVolume={setVolume}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onShuffle={handleShuffle}
                    onSpeedChange={handleSpeedChange}
                    isPlaying={isPlaying}
                />
            </div>

            {/* Playlist Column */}
            <div className="w-full md:w-1/2 md:shrink-0">
                <h2 className="text-xl font-inter font-medium text-warmYellow dark:text-warmYellow mb-2">
                    Playlist
                </h2>
                <div className="space-y-2">
                    {playlist.map((song, index) => (
                        <PlayListItem
                            key={song.id}
                            title={song.title}
                            artist={song.artist}
                            length={formatDuration(song.duration)}
                            className={`hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2 ${index === currentSongIndex ? 'bg-warmYellow/20 border-warmYellow' : ''
                                }`}
                            onClick={() => handleSongSelect(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
