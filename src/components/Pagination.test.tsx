import { render } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('render Pagination', () => {
    const { container } = render(<Pagination />);
    expect(container).toMatchSnapshot();
  });
});
