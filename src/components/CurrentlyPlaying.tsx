import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

interface CurrentlyPlayingProps {
    title?: string;
    artist?: string;
    cover?: string;
    loading?: boolean;
    volume: number;
    setVolume: (volume: number) => void;
    onPlayPause?: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    onShuffle?: () => void;
    onSpeedChange?: (speed: number) => void;
    isPlaying?: boolean;
    song?: string;
    isShuffleOn?: boolean;
}

const CurrentlyPlaying = ({
    title,
    artist,
    cover,
    loading = false,
    volume,
    setVolume,
    onPlayPause,
    onNext,
    onPrevious,
    onShuffle,
    onSpeedChange,
    isPlaying,
    song,
    isShuffleOn = false
}: CurrentlyPlayingProps) => {
    return (
        <div className="w-full">
            <CoverArt cover={cover || ""} loading={loading} />
            <SongTitle
                title={title || "No song selected"}
                author={artist || "Unknown Artist"}
                className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal"
            />
            <PlayControls
                song={song}
                onPlayPause={onPlayPause}
                onNext={onNext}
                onPrevious={onPrevious}
                onShuffle={onShuffle}
                onSpeedChange={onSpeedChange}
                isPlaying={isPlaying}
                isShuffleOn={isShuffleOn}
            />
            <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
    );
};

export default CurrentlyPlaying;
