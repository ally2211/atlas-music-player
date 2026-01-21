import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";

function App() {
  return (
    <div className="h-full flex flex-col justify-between p-8 min-h-screen bg-paleWhite dark:bg-darkBlue text-softBlack dark:text-warmWhite transition-colors">
      <MusicPlayer />
      <Footer />
    </div>
  );
}

export default App;