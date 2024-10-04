import { render } from '@testing-library/react';
import { SearchDisplay } from './SearchDisplay';

describe('SearchDisplay', () => {
  test('render SearchDisplay', () => {
    const { container } = render(<SearchDisplay />);
    expect(container).toMatchSnapshot();
  });
});
