import React from 'react';
import placeholder from '../assets/placeholder.svg';

const CoverArt = () => (
    <div className="w-full aspect-square">
        <img src={placeholder} alt="Cover Art" className="w-full h-full object-cover" />
    </div>
);

export default CoverArt;
