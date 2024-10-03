import { render } from '@testing-library/react';
import { DropdownList } from './PagesDropDown';

describe('PagesDropDown', () => {
  test('render PagesDropDown', () => {
    const { container } = render(<DropdownList />);
    expect(container).toMatchSnapshot();
  });
});
