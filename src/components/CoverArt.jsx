import React from 'react';
import placeholder from '../assets/placeholder.svg';

const CoverArt = ({ coverUrl }) => (
  <div className="w-full aspect-square">
    <img 
      src={coverUrl || placeholder} 
      alt="Cover Art" 
      className="w-full h-full object-cover" 
    />
  </div>
);

export default CoverArt;
