import { render } from '@testing-library/react';
import { DropdownList } from './PagesDropDown';

const loadData = jest.fn();
describe('PagesDropDown', () => {
  test('render PagesDropDown', () => {
    const { container } = render(<DropdownList loadData={loadData} />);
    expect(container).toMatchSnapshot();
  });
});
