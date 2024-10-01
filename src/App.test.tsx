import { render, screen } from '@testing-library/react';
import App from './App';

describe ('App', ()=> {
  test('render App', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()

  });
  test('renders header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Country search/i);
    expect(headerElement).toBeInTheDocument();
  });
});
