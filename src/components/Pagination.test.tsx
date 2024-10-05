import { render } from '@testing-library/react';
import { Pagination } from './Pagination';

const loadData = jest.fn();
describe('Pagination', () => {
  test('render Pagination', () => {
    const { container } = render(<Pagination loadData={loadData} />);
    expect(container).toMatchSnapshot();
  });
});
