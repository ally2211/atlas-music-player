import { render } from '@testing-library/react';
import CurrentlyPlaying from '../components/CurrentlyPlaying';

describe('CurrentlyPlaying snapshots', () => {
    const baseProps = {
        title: 'Test Song',
        artist: 'Test Artist',
        cover: '/cover.jpg',
        volume: 50,
        setVolume: jest.fn(),
        onPlayPause: jest.fn(),
        onPrevious: jest.fn(),
        onNext: jest.fn(),
        onShuffle: jest.fn(),
        onSpeedChange: jest.fn(),
        isPlaying: false,
        isShuffleOn: false,
        loading: false,
        song: '/song.mp3',
    };

    it('renders default state', () => {
        const { asFragment } = render(
            <CurrentlyPlaying {...baseProps} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders while loading', () => {
        const { asFragment } = render(
            <CurrentlyPlaying
                {...baseProps}
                loading={true}
                title={undefined}
                artist={undefined}
                cover={undefined}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders when playing', () => {
        const { asFragment } = render(
            <CurrentlyPlaying
                {...baseProps}
                isPlaying={true}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with shuffle enabled', () => {
        const { asFragment } = render(
            <CurrentlyPlaying
                {...baseProps}
                isShuffleOn={true}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with different playback speed', () => {
        const { asFragment } = render(
            <CurrentlyPlaying
                {...baseProps}
                onSpeedChange={jest.fn()}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
