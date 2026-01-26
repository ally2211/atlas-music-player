import placeholder from '../assets/placeholder.svg';

interface CoverArtProps {
    cover: string;
    loading: boolean;
    onClick?: () => void;
}

const CoverArt = ({ cover, loading, onClick }: CoverArtProps) => {
    if (loading) {
        return (
            <div className="w-full max-w-[400px] aspect-square" onClick={onClick}>
                <img src={placeholder} alt="Cover Art" className="w-full h-full object-cover" />
            </div>
        );
    }
    return (
        <div className="w-full max-w-[400px] aspect-square" onClick={onClick}>
            <img src={cover} alt="Cover Art" className="w-full h-full object-cover" />
        </div>
    );
};

export default CoverArt;

