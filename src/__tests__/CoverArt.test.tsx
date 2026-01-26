import { render } from '@testing-library/react';
import CoverArt from '../components/CoverArt';

describe('CoverArt', () => {
  it('renders loading state', () => {
    const { asFragment } = render(<CoverArt loading={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders non-loading state', () => {
    const { asFragment } = render(<CoverArt loading={false} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
