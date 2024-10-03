import { render } from '@testing-library/react';
import { ErrorDisplay } from './ErrorDisplay';

describe('ErrorDisplay', () => {
  test('render ErrorDisplay', () => {
    const { container } = render(<ErrorDisplay />);
    expect(container).toMatchSnapshot();
  });
});
