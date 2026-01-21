import React, { useEffect, useState } from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';
import PlayListItem from './PlayListItem';


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
    <div className="flex flex-col sm:flex-row gap-8 max-w-[900px] mx-auto p-8">
      {/* Player Column */}
      <div className="sm:w-1/2 ">
        <div className="w-full">
          <CoverArt />
          <SongTitle title="My Song" author="Artist Name" className="mt-6 font-inter font-bold text-2xl leading-none tracking-normal" />
          <PlayControls />
          <VolumeControls volume={volume} setVolume={setVolume} />
        </div>
      </div>


      {/* Playlist Column */}
      <div className="sm:w-1/2 shrink-0">
        <div className="w-full">
          <h2 className="text-xl font-inter font-medium text-warmYellow mb-2">Playlist</h2>
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
    </div>
  );
};

export default MusicPlayer;
