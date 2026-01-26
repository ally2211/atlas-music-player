import { render } from '@testing-library/react';
import CoverArt from '../components/CoverArt';

describe('CoverArt snapshot tests', () => {
    it('renders loading state', () => {
        const { asFragment } = render(<CoverArt loading={true} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders normal state when not loading', () => {
        const { asFragment } = render(<CoverArt loading={false} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
