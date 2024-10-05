import { ChangeEvent, useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { PaginationProps } from '../types';

export function DropdownList({loadData}: PaginationProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [menuSelect, setMenuSelect] = useState(0);

  const { search, data, pagination } = state;

  useEffect(() => {
    if (search) loadData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuSelect]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const pages = parseInt(event.target.value, 10);
    setMenuSelect(pages);
    dispatch({
      type: actions.setPagination.type,
      payload: {
        page: pagination.page,
        resultsPerPage: pages,
      },
    });
  }
  const dropdownListClass =
    search && data.length ? 'dropdownList' : 'dropdownList-hide';
  return (
    <div className={dropdownListClass}>
      {!!data.length && <select
        className="select-dropdown"
        value={pagination.resultsPerPage}
        onChange={(event) => handleChange(event)}
      >
        <option value={'5'}>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>}
    </div>
  );
}
