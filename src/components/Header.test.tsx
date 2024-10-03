import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  test('render Header', () => {
    const { container } = render(<Header title="Test Counties App" />);
    expect(container).toMatchSnapshot();
  });
});
