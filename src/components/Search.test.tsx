import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

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
  test.skip('search btn clicked, renders error', async () => {
    render(<Search />);
    const button = screen.getByRole('button', { name: 'Find' });
    fireEvent.click(button);
    expect(
      await screen.findByText('Country search failed!')
    ).toBeInTheDocument();
  });
});
