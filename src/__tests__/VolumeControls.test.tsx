import { render } from '@testing-library/react';
import { vi } from 'vitest';
import VolumeControl from '../components/VolumeControls';

describe('VolumeControl snapshot tests', () => {
    const mockSetVolume = vi.fn();

    it('renders default volume (50)', () => {
        const { asFragment } = render(
            <VolumeControl volume={50} setVolume={mockSetVolume} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders minimum volume (0)', () => {
        const { asFragment } = render(
            <VolumeControl volume={0} setVolume={mockSetVolume} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders maximum volume (100)', () => {
        const { asFragment } = render(
            <VolumeControl volume={100} setVolume={mockSetVolume} />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
