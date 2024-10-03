import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

interface Props {
  children?: ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

describe('App', () => {
  test('render App', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
  test('renders header', () => {
    render(<App />);
    const headerElement = screen.queryByText('Country Search App');
    expect(headerElement).toBeInTheDocument();
  });
  test('renders search button', () => {
    render(<App />);
    const headerElement = screen.getAllByRole('button');
    expect(headerElement[0]).toHaveTextContent('Find');
  });
  test('search btn clicked, renders error', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: 'Find' });
    fireEvent.click(button);
    expect(
      await screen.findByText('Country search failed!')
    ).toBeInTheDocument();
  });
});
