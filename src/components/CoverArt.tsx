import placeholder from '../assets/placeholder.svg';

interface CoverArtProps {
    cover: string;
    loading: boolean;
    onClick?: () => void;
}

const CoverArt = ({ cover, loading, onClick }: CoverArtProps) => {
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

