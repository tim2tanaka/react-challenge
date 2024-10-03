import { render, screen } from '@testing-library/react';
import { Search } from './Search';

describe('Search', () => {
  test('render Search', () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });
  test('renders search button', () => {
    render(<Search />);
    const headerElement = screen.getAllByRole('button');
    expect(headerElement[0]).toHaveTextContent('Find');
  });
});
