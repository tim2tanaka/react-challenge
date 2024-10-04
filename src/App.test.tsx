import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { Provider } from './app_state/context';

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
    const findBtn = screen.getByRole('button', { name: 'Find' });
    fireEvent.click(findBtn);
    expect(
      await screen.findByText('Country search failed!')
    ).toBeInTheDocument();
  });
  test('change input and btn click renders data', async () => {
    render(<App />);
    const findBtn = screen.getByRole('button', { name: 'Find' });
    fireEvent.click(findBtn);
    expect(
      await screen.findByText('Country search failed!')
    ).toBeInTheDocument();
  });

  describe('App mock api', () => {
    beforeEach(() => {
      jest.mock('./__mocks__/fetch');
    });
    test('change input and btn click renders data', async () => {
      render(<App />);
      const findBtn = screen.getByRole('button', { name: 'Find' });
      const input = screen.getByPlaceholderText('Search for a country...');
      fireEvent.change(input, {
        target: {
          value: 'us',
        },
      });
      fireEvent.click(findBtn);
      const rows = await screen.findAllByTitle('search-data');
      expect(rows).toHaveLength(5);
    });

    test.skip('change pages display and btn click renders data', async () => {
      render(<App />);
      const findBtn = screen.getByRole('button', { name: 'Find' });
      const input = screen.getByPlaceholderText('Search for a country...');
      const dropdown = screen.getByDisplayValue('5');
      fireEvent.change(input, {
        target: {
          value: 'us',
        },
      });
      fireEvent.click(findBtn);
      let rows = await screen.findAllByTitle('search-data');
      expect(rows).toHaveLength(5);
      fireEvent.change(dropdown, {
        target: {
          value: '10',
        },
      });
      screen.debug();
    });

    test('clears pages display on "Clear" btn click', async () => {
      render(<App />);
      const findBtn = screen.getByRole('button', { name: 'Find' });
      const input = screen.getByPlaceholderText('Search for a country...');
      const dropdown = screen.getByDisplayValue(5);
      fireEvent.change(input, {
        target: {
          value: 'us',
        },
      });
      fireEvent.click(findBtn);
      fireEvent.change(dropdown, {
        target: {
          value: 10,
        },
      });
      const cancleBtn = screen.getByRole('button', { name: 'Clear' });
      fireEvent.click(cancleBtn);
      const rows = await screen.findAllByTitle('search-data');
      expect(rows.length).toBeGreaterThanOrEqual(5);
    });

    test(' displays next page on "NEXT >" btn click', async () => {
      render(<App />);
      const findBtn = screen.getByRole('button', { name: 'Find' });
      const input = screen.getByPlaceholderText('Search for a country...');
      fireEvent.change(input, {
        target: {
          value: 'us',
        },
      });
      fireEvent.click(findBtn);
      const rows = await screen.findAllByTitle('search-data');
      const nextBtn = screen.getByRole('button', { name: 'NEXT >' });
      fireEvent.click(nextBtn);
      expect(rows).toHaveLength(5);
    });

    test(' displays next page on "BACK >" btn click', async () => {
      render(<App />);
      const findBtn = screen.getByRole('button', { name: 'Find' });
      const input = screen.getByPlaceholderText('Search for a country...');
      fireEvent.change(input, {
        target: {
          value: 'us',
        },
      });
      fireEvent.click(findBtn);
      let rows = await screen.findAllByTitle('search-data');
      const nextBtn = screen.getByRole('button', { name: 'NEXT >' });
      fireEvent.click(nextBtn);
      rows = await screen.findAllByTitle('search-data');
      const backBtn = screen.getByRole('button', { name: '< BACK' });
      fireEvent.click(backBtn);
      expect(rows).toHaveLength(5);
    });
  });
});
