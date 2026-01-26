import { render } from '@testing-library/react';
import PlayListItem from '../components/PlayListItem';

describe('PlayListItem snapshots', () => {
    const baseProps = {
        title: 'Song Title',
        artist: 'Artist Name',
        length: '3:45',
        onClick: jest.fn(),
    };

    it('renders default item', () => {
        const { asFragment } = render(
            <PlayListItem {...baseProps} />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders selected item', () => {
        const { asFragment } = render(
            <PlayListItem
                {...baseProps}
                isSelected={true}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with custom className', () => {
        const { asFragment } = render(
            <PlayListItem
                {...baseProps}
                className="bg-warmYellow text-black"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
