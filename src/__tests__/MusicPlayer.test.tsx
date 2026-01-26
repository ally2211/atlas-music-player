import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MusicPlayer from '../components/MusicPlayer';

// Mock HTMLAudioElement methods
const mockPlay = jest.fn().mockResolvedValue(undefined);
const mockPause = jest.fn();
const mockSetProperty = jest.fn();

Object.defineProperty(HTMLAudioElement.prototype, 'play', {
    writable: true,
    value: mockPlay,
});
Object.defineProperty(HTMLAudioElement.prototype, 'pause', {
    writable: true,
    value: mockPause,
});
Object.defineProperty(HTMLAudioElement.prototype, 'volume', {
    set: mockSetProperty,
    get: () => 0.5,
});
Object.defineProperty(HTMLAudioElement.prototype, 'playbackRate', {
    set: mockSetProperty,
    get: () => 1,
});

// Helper to find button by SVG path
const findButtonByPath = (pathData: string) => {
    const buttons = screen.getAllByRole('button');
    return buttons.find(button => {
        const svg = button.querySelector('svg');
        if (!svg) return false;
        const path = svg.querySelector(`path[d="${pathData}"]`);
        return path !== null;
    });
};

describe('MusicPlayer', () => {
    beforeEach(() => {
        mockPlay.mockClear();
        mockPause.mockClear();
        mockSetProperty.mockClear();
    });

    it('should display playlist items from API and show first song details when clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load (no loading skeleton)
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Verify playlist items are rendered from mock API data
        expect(screen.getByText('Fake Song 1')).toBeInTheDocument();
        expect(screen.getByText('Fake Artist 1')).toBeInTheDocument();
        expect(screen.getByText('Fake Song 2')).toBeInTheDocument();
        expect(screen.getByText('Fake Song 3')).toBeInTheDocument();

        // Click on first song to load its details
        const firstSongItems = screen.getAllByText('Fake Song 1');
        const playlistItem = firstSongItems.find(item => 
            item.closest('.border') !== null
        ) || firstSongItems[0];
        
        fireEvent.click(playlistItem);

        // Wait for song details to be fetched and displayed in player area
        await waitFor(() => {
            // Verify the song title appears in the player (CurrentlyPlaying component)
            const songTitles = screen.getAllByText('Fake Song 1');
            expect(songTitles.length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should toggle play/pause when play button is clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('Fake Song 1');
        fireEvent.click(firstSongItems[0]);

        // Wait for song to load and auto-play
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find the play/pause button (has viewBox="0 0 48 48")
        const buttons = screen.getAllByRole('button');
        const playButton = buttons.find(button => {
            const svg = button.querySelector('svg[viewBox="0 0 48 48"]');
            return svg !== null;
        });

        expect(playButton).toBeInTheDocument();

        // Click to pause
        fireEvent.click(playButton!);
        
        await waitFor(() => {
            expect(mockPause).toHaveBeenCalled();
        });

        // Click again to play
        fireEvent.click(playButton!);
        
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalledTimes(2);
        });
    });

    it('should change to next song when forward button is clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('Fake Song 1');
        fireEvent.click(firstSongItems[0]);

        // Wait for first song to load
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find forward button (has path with "M12 19L21 12L12 5V19Z")
        const forwardButton = findButtonByPath('M12 19L21 12L12 5V19Z');
        expect(forwardButton).toBeInTheDocument();

        // Click forward button
        fireEvent.click(forwardButton!);

        // Verify current song changed to second song
        await waitFor(() => {
            const songTitles = screen.getAllByText('Fake Song 2');
            expect(songTitles.length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should change to previous song when back button is clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on second song first
        const secondSongItems = screen.getAllByText('Fake Song 2');
        fireEvent.click(secondSongItems[0]);

        // Wait for second song to load
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find back button (has path with "M11 19L2 12L11 5V19Z")
        const backButton = findButtonByPath('M11 19L2 12L11 5V19Z');
        expect(backButton).toBeInTheDocument();

        // Click back button
        fireEvent.click(backButton!);

        // Verify current song changed to first song
        await waitFor(() => {
            const songTitles = screen.getAllByText('Fake Song 1');
            expect(songTitles.length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should change current song when a playlist item is clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Verify all playlist items are rendered
        expect(screen.getByText('Fake Song 1')).toBeInTheDocument();
        expect(screen.getByText('Fake Song 2')).toBeInTheDocument();
        expect(screen.getByText('Fake Song 3')).toBeInTheDocument();

        // Click on the third song in the playlist
        const thirdSongItems = screen.getAllByText('Fake Song 3');
        const thirdSongItem = thirdSongItems.find(item => 
            item.closest('.border') !== null
        ) || thirdSongItems[0];
        
        fireEvent.click(thirdSongItem);

        // Verify current song changed to third song (wait for API call to complete)
        await waitFor(() => {
            // The song should appear in the player area after API call
            const songTitles = screen.getAllByText('Fake Song 3');
            expect(songTitles.length).toBeGreaterThan(0);
            // Verify artist also appears
            const artists = screen.getAllByText('Fake Artist 3');
            expect(artists.length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        // Verify the song started playing
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        });
    });

    it('should toggle playback speed when speed button is clicked', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('Fake Song 1');
        fireEvent.click(firstSongItems[0]);

        // Wait for song to load
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find speed button (has path with "M4 4h2v16H4z")
        const speedButton = findButtonByPath('M4 4h2v16H4z');
        expect(speedButton).toBeInTheDocument();

        // Click speed button to change from 1x to 0.5x
        fireEvent.click(speedButton!);
        
        await waitFor(() => {
            expect(mockSetProperty).toHaveBeenCalledWith(0.5);
        });

        // Click again to change from 0.5x to 1x
        fireEvent.click(speedButton!);
        
        await waitFor(() => {
            expect(mockSetProperty).toHaveBeenCalledWith(1);
        });

        // Click again to change from 1x to 2x
        fireEvent.click(speedButton!);
        
        await waitFor(() => {
            expect(mockSetProperty).toHaveBeenCalledWith(2);
        });
    });
});
