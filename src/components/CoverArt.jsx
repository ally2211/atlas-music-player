import React from 'react';
import placeholder from '../assets/placeholder.svg';

const CoverArt = ({ cover, loading, onClick }) => {
    if (loading) {
        return (
            <div style={{ width: '400px', height: '400px' }} onClick={onClick}>
                <img src={placeholder} alt="Cover Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        );
    }
    return (
        <div style={{ width: '400px', height: '400px' }} onClick={onClick}>
            <img src={cover} alt="Cover Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
};

export default CoverArt;
