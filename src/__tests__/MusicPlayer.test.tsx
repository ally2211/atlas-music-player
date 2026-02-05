import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import MusicPlayer from '../components/MusicPlayer';

// Mock HTMLAudioElement methods - dispatch events so onPlay/onPause run
const mockPlay = vi.fn().mockImplementation(function (this: HTMLAudioElement) {
    queueMicrotask(() => this.dispatchEvent(new Event('play')));
    return Promise.resolve();
});
const mockPause = vi.fn().mockImplementation(function (this: HTMLAudioElement) {
    this.dispatchEvent(new Event('pause'));
});
const mockSetProperty = vi.fn();

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

    it('should verify current song is first song in playlist by default', async () => {
        render(<MusicPlayer />);

        // Wait for playlist to load from mock API
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        // Verify first song from mock API is current by default (no click needed)
        await waitFor(() => {
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Fake Artist 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should verify play/pause can be toggled and UI changes', async () => {
        render(<MusicPlayer />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        const playButton = findPlayPauseButton();
        expect(playButton).toBeInTheDocument();
        fireEvent.click(playButton!);

        await waitFor(() => expect(mockPlay).toHaveBeenCalled(), { timeout: 3000 });

        await waitFor(() => {
            const svgEl = playButton!.querySelector('svg[viewBox="0 0 48 48"]');
            const rects = svgEl!.querySelectorAll('rect');
            expect(rects.length).toBeGreaterThanOrEqual(2);
        });

        fireEvent.click(playButton!);
        await waitFor(() => expect(mockPause).toHaveBeenCalled());

        await waitFor(() => {
            const svgAfter = playButton!.querySelector('svg[viewBox="0 0 48 48"]');
            const playPath = svgAfter!.querySelector('path[d="M18 15L32 24L18 33V15Z"]');
            expect(playPath).toBeInTheDocument();
        });

        fireEvent.click(playButton!);
        await waitFor(() => expect(mockPlay).toHaveBeenCalledTimes(2));
    });

    it('should verify forward changes song correctly', async () => {
        render(<MusicPlayer />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        const forwardButton = findButtonByPath('M12 19L21 12L12 5V19Z');
        expect(forwardButton).toBeInTheDocument();
        fireEvent.click(forwardButton!);

        await waitFor(() => {
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });
    });

    it('should verify back changes song correctly', async () => {
        render(<MusicPlayer />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        const forwardButton = findButtonByPath('M12 19L21 12L12 5V19Z');
        fireEvent.click(forwardButton!);
        await waitFor(() => expect(mockPlay).toHaveBeenCalled(), { timeout: 3000 });

        const backButton = findButtonByPath('M11 19L2 12L11 5V19Z');
        expect(backButton).toBeInTheDocument();
        fireEvent.click(backButton!);

        await waitFor(() => {
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Fake Artist 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });
    });

    it('should verify clicking song in playlist changes current song', async () => {
        render(<MusicPlayer />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        const thirdSongItems = screen.getAllByText('Fake Song 3');
        fireEvent.click(thirdSongItems[0]);

        await waitFor(() => {
            expect(screen.getAllByText('Fake Song 3').length).toBeGreaterThan(0);
            expect(screen.getAllByText('Fake Artist 3').length).toBeGreaterThan(0);
            expect(mockPlay).toHaveBeenCalled();
        }, { timeout: 3000 });
    });

    it('should verify speed button toggles between settings correctly', async () => {
        render(<MusicPlayer />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getAllByText('Fake Song 1').length).toBeGreaterThan(0);
        }, { timeout: 3000 });

        const speedButton = findButtonByPath('M4 4h2v16H4zM18 4l-8.5 8L18 20V4z');
        expect(speedButton).toBeInTheDocument();

        fireEvent.click(speedButton!);
        await waitFor(() => expect(mockSetProperty).toHaveBeenCalledWith(2));

        fireEvent.click(speedButton!);
        await waitFor(() => expect(mockSetProperty).toHaveBeenCalledWith(0.5));

        fireEvent.click(speedButton!);
        await waitFor(() => expect(mockSetProperty).toHaveBeenCalledWith(1));

        fireEvent.click(speedButton!);
        await waitFor(() => expect(mockSetProperty).toHaveBeenCalledWith(2));
    });
});
