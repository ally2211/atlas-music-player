import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

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
}) => {
    return (
        <div className="w-full">
            <CoverArt cover={cover} loading={loading} />
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
