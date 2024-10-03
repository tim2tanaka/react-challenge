import { render } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  test('render Loading', () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
