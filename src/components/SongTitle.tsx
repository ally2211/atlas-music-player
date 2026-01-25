const SongTitle = ({ title, author, className = "" }) => (
    <div className={`space-y-1 ${className}`}>
        <div className="font-inter font-bold text-2xl leading-none tracking-normal text-softBlack dark:text-warmWhite">
            {title}
        </div>
        <div className="text-sm opacity-70 font-inter text-softBlack dark:text-warmWhite">{author}</div>
    </div>
);

export default SongTitle;

