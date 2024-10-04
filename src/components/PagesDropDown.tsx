import { ChangeEvent, useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { Data } from '../types';

export function DropdownList() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [menuSelect, setMenuSelect] = useState(0);

  useEffect(() => {
    if (state.search) loadData();
  }, [menuSelect]);

  function getPaginationData(data: Data['data']) {
    // const minPageResults = 5;
    const { page, resultsPerPage } = state.pagination;
    // const paginationPageResults = data.length < resultsPerPage ? minPageResults : resultsPerPage;
    const resultsPage = page <= 0 ? 1 : page;
    const startIndex = (resultsPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    dispatch({ type: actions.setTotalPages.type, payload: data.length });
    return data.slice(startIndex, endIndex);
  }

  async function loadData() {
    const { resultsPerPage } = state.pagination;
    const url = 'https://restcountries.com/v3.1/name';
    try {
      dispatch({ type: actions.clearData.type, payload: [] });
      dispatch({ type: actions.setIsloading.type });
      dispatch({ type: actions.clearErrorMsg.type });
      const res = await fetch(`${url}/${state.search}`);
      if (res.status !== 200) throw new Error('Country search failed!');
      const data = await res.json();
      const paginationData: Data['data'] = getPaginationData(data);
      dispatch({ type: actions.setData.type, payload: paginationData });
      dispatch({ type: actions.setIsloading.type });
      dispatch({ type: actions.setTotalPages.type, payload: data.length });
    } catch (error: any) {
      if (error?.message)
        dispatch({ type: actions.setErrorMsg.type, payload: error.message });
      dispatch({ type: actions.setIsloading.type });
    }
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const pages = parseInt(event.target.value, 10);
    setMenuSelect(pages);
    dispatch({
      type: actions.setPagination.type,
      payload: {
        page: state.pagination.page,
        resultsPerPage: pages,
      },
    });
  }
  const dropdownListClass =
    state.search && state.data.length ? 'dropdownList' : 'dropdownList-hide';
  return (
    <div className={dropdownListClass}>
      <select
        className="select-dropdown"
        value={state.pagination.resultsPerPage}
        onChange={(event) => handleChange(event)}
      >
        <option value={'5'}>5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
