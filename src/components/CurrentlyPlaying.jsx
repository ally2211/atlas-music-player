import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

const CurrentlyPlaying = ({
    title,
    artist,
    coverUrl,
    volume,
    setVolume,
    onPlay,
    onPause,
    onNext,
    onPrevious,
    onShuffle,
    onSpeedChange,
    isPlaying
}) => {
    return (
        <div className="w-full">
            <CoverArt coverUrl={coverUrl} />
            <SongTitle
                title={title || "My Song"}
                author={artist || "Artist Name"}
                className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal"
            />
            <PlayControls
                onPlay={onPlay}
                onPause={onPause}
                onNext={onNext}
                onPrevious={onPrevious}
                onShuffle={onShuffle}
                onSpeedChange={onSpeedChange}
                isPlaying={isPlaying}
            />
            <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
    );
};

export default CurrentlyPlaying;
