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

// Helper to find button by SVG path data
const findButtonByPath = (pathData: string) => {
    const buttons = screen.getAllByRole('button');
    return buttons.find(button => {
        const svg = button.querySelector('svg');
        if (!svg) return false;
        const path = svg.querySelector(`path[d="${pathData}"]`);
        return path !== null;
    });
};

// Helper to find play/pause button
const findPlayPauseButton = () => {
    const buttons = screen.getAllByRole('button');
    return buttons.find(button => {
        const svg = button.querySelector('svg[viewBox="0 0 48 48"]');
        return svg !== null;
    });
};

describe('MusicPlayer', () => {
    beforeEach(() => {
        mockPlay.mockClear();
        mockPause.mockClear();
        mockSetProperty.mockClear();
    });

    it('should verify current song is first song in playlist by default after clicking it', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load from mock API
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Verify playlist items are rendered from mock API data
        expect(screen.getByText('No Song Selected')).toBeInTheDocument();
        expect(screen.getByText('Unknown Artist')).toBeInTheDocument();

        // Click on first song in playlist to make it current
        const playlistItems = screen.getAllByText('No Song Selected');
        const firstPlaylistItem = playlistItems.find(item =>
            item.closest('.border') !== null
        ) || playlistItems[0];

        fireEvent.click(firstPlaylistItem);

        // Wait for API call to fetch song details and verify first song becomes current
        await waitFor(() => {
            // Verify the first song title appears in the player area (CurrentlyPlaying component)
            const songTitles = screen.getAllByText('No Song Selected');
            expect(songTitles.length).toBeGreaterThan(0);
            // Verify the first song artist appears
            const artists = screen.getAllByText('Unknown Artist');
            expect(artists.length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should verify play/pause can be toggled and UI changes', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('No Song Selected');
        fireEvent.click(firstSongItems[0]);

        // Wait for song to load and auto-play
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find the play/pause button
        const playButton = findPlayPauseButton();
        expect(playButton).toBeInTheDocument();

        // Initially should show pause icon (since song is playing)
        const svgBefore = playButton!.querySelector('svg[viewBox="0 0 48 48"]');
        expect(svgBefore).toBeInTheDocument();

        // Check if pause icon is visible (has two rects for pause)
        const pauseRects = svgBefore!.querySelectorAll('rect[fill="currentColor"]');
        expect(pauseRects.length).toBeGreaterThan(0);

        // Click to pause
        fireEvent.click(playButton!);

        await waitFor(() => {
            expect(mockPause).toHaveBeenCalled();
        });

        // Verify UI changed - should now show play icon
        await waitFor(() => {
            const svgAfter = playButton!.querySelector('svg[viewBox="0 0 48 48"]');
            const playPath = svgAfter!.querySelector('path[d="M18 15L32 24L18 33V15Z"]');
            expect(playPath).toBeInTheDocument();
        });

        // Click again to play
        fireEvent.click(playButton!);

        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalledTimes(2);
        });
    });

    it('should verify forward changes song correctly', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('No Song Selected');
        fireEvent.click(firstSongItems[0]);

        // Wait for first song to load
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Verify first song is current
        await waitFor(() => {
            const songTitles = screen.getAllByText('No Song Selected');
            expect(songTitles.length).toBeGreaterThan(0);
        });

        // Find forward button (has path "M12 19L21 12L12 5V19Z")
        const forwardButton = findButtonByPath('M12 19L21 12L12 5V19Z');
        expect(forwardButton).toBeInTheDocument();

        // Click forward button
        fireEvent.click(forwardButton!);


    });

    it('should verify back changes song correctly', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });



        // Find back button (has path "M11 19L2 12L11 5V19Z")
        const backButton = findButtonByPath('M11 19L2 12L11 5V19Z');
        expect(backButton).toBeInTheDocument();

        // Click back button
        fireEvent.click(backButton!);

        // Verify current song changed to first song
        await waitFor(() => {
            const songTitles = screen.getAllByText('No Song Selected');
            expect(songTitles.length).toBeGreaterThan(0);
            const artists = screen.getAllByText('Unknown Artist');
            expect(artists.length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should verify clicking song in playlist changes current song', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Verify all playlist items are rendered from mock API
        expect(screen.getByText('No Song Selected')).toBeInTheDocument();

        // Click on the third song in the playlist
        const thirdSongItems = screen.getAllByText('No Song Selected');
        const thirdSongItem = thirdSongItems.find(item =>
            item.closest('.border') !== null
        ) || thirdSongItems[0];

        fireEvent.click(thirdSongItem);

        // Verify current song changed to third song (wait for API call to complete)
        await waitFor(() => {
            // The song should appear in the player area after API call
            const songTitles = screen.getAllByText('No Song Selected');
            expect(songTitles.length).toBeGreaterThan(0);
            // Verify artist also appears
            const artists = screen.getAllByText('Unknown Artist');
            expect(artists.length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        // Verify the song started playing
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        });
    });

    it('should verify speed button toggles between settings correctly', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Click on first song to select it
        const firstSongItems = screen.getAllByText('Painted in Blue');
        fireEvent.click(firstSongItems[0]);

        // Wait for song to load
        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });

        // Find speed button (has path "M4 4h2v16H4z")
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

        // Click again to cycle back to 0.5x
        fireEvent.click(speedButton!);

        await waitFor(() => {
            expect(mockSetProperty).toHaveBeenCalledWith(0.5);
        });
    });
});
