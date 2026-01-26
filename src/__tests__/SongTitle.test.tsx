import { render } from '@testing-library/react';
import SongTitle from '../components/SongTitle';

describe('SongTitle snapshot tests', () => {
    const baseProps = {
        title: 'Test Song',
        author: 'Test Artist',
    };

    it('renders default title and author', () => {
        const { asFragment } = render(<SongTitle {...baseProps} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with additional className', () => {
        const { asFragment } = render(
            <SongTitle {...baseProps} className="text-warmYellow font-bold" />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders long title and author', () => {
        const { asFragment } = render(
            <SongTitle
                title="This is a very long song title that might wrap in the UI"
                author="An extremely long artist name that could break layout"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
