import React, { useEffect, useState, useRef } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';
import LoadingSkeleton from './LoadingSkeleton';

// TypeScript interfaces
interface Song {
    id: string;
    title: string;
    artist: string;
    genre: string;
    duration: number;
    cover?: string;  // Optional cover image URL
    song?: string;   // Optional song audio URL
}

const MusicPlayer: React.FC = () => {
    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isShuffleOn, setIsShuffleOn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Helper function to format duration from seconds to MM:SS
    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Update audio source when currentSong changes
    useEffect(() => {
        if (audioRef.current && currentSong?.song) {
            audioRef.current.src = currentSong.song;
            audioRef.current.volume = volume / 100;
            console.log('Audio source updated, volume set to:', volume / 100);
        }
    }, [currentSong?.song]);

    // Update volume separately to avoid interrupting playback
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
            console.log('Volume updated to:', volume, 'Audio volume set to:', volume / 100);
        }
    }, [volume]);

    // Update playback speed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
            console.log('Playback speed updated to:', playbackSpeed);
        }
    }, [playbackSpeed]);

    const handlePlayPause = () => {
        if (!audioRef.current || !currentSong?.song) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await fetch('/api/v1/playlist');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const playlistData: Song[] = await response.json();
                setPlaylist(playlistData);
                setIsLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch playlist');
                setIsLoading(false);
            }
        };

        fetchPlaylist();
    }, []);

    const handleSongClick = async (song: Song) => {
        try {
            const response = await fetch(`/api/v1/songs/${song.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const songData: Song = await response.json();
            setCurrentSong(songData);
            // Auto-play the new song
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100); // Small delay to ensure audio source is set
        } catch (error) {
            console.error('Failed to fetch song details:', error);
            // Fallback to the basic song data if API call fails
            setCurrentSong(song);
            // Auto-play the fallback song
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
        }
    };

    const handlePrevious = async () => {
        if (!currentSong || playlist.length === 0) return;

        const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
        if (currentIndex <= 0) return; // Already at first song

        const previousSong = playlist[currentIndex - 1];
        await handleSongClick(previousSong);
    };

    const handleNext = async () => {
        if (!currentSong || playlist.length === 0) return;

        if (isShuffleOn) {
            // Shuffle mode: play random song
            const randomSong = playlist[Math.floor(Math.random() * playlist.length)];
            await handleSongClick(randomSong);
        } else {
            // Normal mode: play next song
            const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
            if (currentIndex >= playlist.length - 1) return; // Already at last song

            const nextSong = playlist[currentIndex + 1];
            await handleSongClick(nextSong);
        }
    };

    const handleShuffle = async () => {
        if (!currentSong || playlist.length === 0) return;

        // Toggle shuffle state
        setIsShuffleOn(!isShuffleOn);

        // If turning shuffle on, play a random song
        if (!isShuffleOn) {
            const randomSong = playlist[Math.floor(Math.random() * playlist.length)];
            await handleSongClick(randomSong);
        }
    };

    if (isLoading) return <LoadingSkeleton />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center max-w-[900px] mx-auto p-8">
                <div className="text-red-500 text-center">
                    <h2 className="text-xl font-inter font-bold mb-2">Error Loading Playlist</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row gap-8 max-w-[900px] mx-auto p-8">
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                    setIsPlaying(false);
                    // Auto-play next song when current song ends
                    if (isShuffleOn) {
                        const randomSong = playlist[Math.floor(Math.random() * playlist.length)];
                        handleSongClick(randomSong);
                    } else {
                        handleNext();
                    }
                }}
                preload="auto"
            />

            {/* Player Column */}
            <div className="sm:w-1/2">
                <div className="w-full">
                    <CoverArt
                        cover={currentSong?.cover || ""}
                        loading={!currentSong}
                    />
                    <SongTitle
                        title={currentSong?.title || "No song selected"}
                        author={currentSong?.artist || "Unknown Artist"}
                        className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal"
                    />
                    <PlayControls
                        song={currentSong?.song || ""}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onShuffle={handleShuffle}
                        isShuffleOn={isShuffleOn}
                        volume={volume}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onSpeedChange={setPlaybackSpeed}
                    />
                    <VolumeControls volume={volume} setVolume={setVolume} />
                </div>
            </div>

            {/* Playlist Column */}
            <div className="sm:w-1/2 shrink-0">
                <div className="w-full">
                    <h2 className="text-xl font-inter font-medium text-warmYellow mb-2">Playlist</h2>
                    {playlist.map((song) => (
                        <PlayListItem
                            key={song.id}
                            title={song.title}
                            artist={song.artist}
                            length={formatDuration(song.duration)}
                            className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
                            onClick={() => handleSongClick(song)}
                            isSelected={currentSong?.id === song.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
