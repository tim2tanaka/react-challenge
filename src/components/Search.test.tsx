import { render, screen } from '@testing-library/react';
import { Search } from './Search';

const loadData = jest.fn();

describe('Search', () => {
  test('render Search', () => {
    const { container } = render(<Search loadData={loadData}/>);
    expect(container).toMatchSnapshot();
  });
  test('renders search button', () => {
    render(<Search loadData={loadData}/>);
    const headerElement = screen.getAllByRole('button');
    expect(headerElement[0]).toHaveTextContent('Find');
  });
});
