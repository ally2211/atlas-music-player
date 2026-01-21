import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

const CurrentlyPlaying = ({ title, artist, length, volume, setVolume }) => {
    return (
        <div className="w-full">
            <CoverArt />
            <SongTitle title={title || "My Song"} author={artist || "Artist Name"} className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal" />
            <PlayControls />
            <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
    )
}

export default CurrentlyPlaying;
