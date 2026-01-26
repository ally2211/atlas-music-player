import React, { useEffect, useState } from 'react';
import CurrentlyPlaying from './CurrentlyPlaying';
import PlayListItem from './PlayListItem';
import LoadingSkeleton from './LoadingSkeleton';

const MusicPlayer = () => {
    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        // Simulate async data load
        setTimeout(() => {
            setPlaylist([
                { title: 'Painted in Blue', artist: 'Soul Canvas', length: '3:45' },
                { title: 'Title Drift', artist: 'Echos of Seas', length: '4:12' },
                { title: 'Fading Shadow', artist: 'The Emberight', length: '2:58' },
            ]);
            setIsLoading(false);
        }, 1500);
    }, []);

    if (isLoading) return <LoadingSkeleton />;


    return (
        <div className="flex flex-col md:flex-row gap-8 max-w-[900px] mx-auto p-4 sm:p-8">
            {/* Player Column */}
            <div className="w-full md:w-1/2">
                <CurrentlyPlaying
                    title={playlist[0]?.title}
                    artist={playlist[0]?.artist}
                    length={playlist[0]?.length}
                    volume={volume}
                    setVolume={setVolume}
                />
            </div>

            {/* Playlist Column */}
            <div className="w-full md:w-1/2 md:shrink-0">
                <h2 className="text-xl font-inter font-medium text-warmYellow dark:text-warmYellow mb-2">Playlist</h2>
                <PlayListItem
                    title="Painted in Blue"
                    artist="Soul Canvas"
                    length="3:45"
                    className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
                />
                <PlayListItem
                    title="Title Drift"
                    artist="Echos of Seas"
                    length="4:12"
                    className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
                />
                <PlayListItem
                    title="Fading Shadow"
                    artist="The Emberight"
                    length="2:58"
                    className="hover:bg-warmYellow hover:text-softBlack transition rounded-xl p-2"
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
