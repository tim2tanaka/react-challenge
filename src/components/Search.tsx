import { ChangeEvent, useState } from 'react';
import { Data } from '../types';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';

export function Search() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState('');

  async function loadData() {
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

  function getPaginationData(data: Data['data']) {
    const { page, resultsPerPage } = state.pagination;
    // const minPageResults = 5;
    // const paginationPageResults = data.length < resultsPerPage ? minPageResults : resultsPerPage;
    const resultsPage = page <= 0 ? 1 : page;
    const startIndex = (resultsPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    dispatch({ type: actions.setTotalPages.type, payload: data.length });
    return data.slice(startIndex, endIndex);
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
    dispatch({ type: actions.setSearch.type, payload: event.target.value });
    if (event.target.value === '') dispatch({ type: actions.clearData.type });
  }

  async function handleBtnClick(btn: string): Promise<void> {
    if (btn === 'clear') {
      dispatch({ type: actions.clearData.type, payload: [] });
      dispatch({ type: actions.clearSearch.type });
      dispatch({ type: actions.clearTotalPages.type });
      setInputText('');
    }
    if (btn === 'search') {
      loadData();
    }
  }

  return (
    <div className="search">
      <label>
        Country search:
        <input
          type="text"
          placeholder={'Search for a country...'}
          onChange={(event) => {
            handleSearchInput(event);
          }}
          className="search-input"
          value={inputText ? inputText : ''}
        />
      </label>
      <button
        onClick={() => {
          handleBtnClick('search');
        }}
        className="button"
      >
        Find
      </button>
      {inputText && (
        <button
          onClick={() => {
            handleBtnClick('clear');
          }}
          className="button"
        >
          Clear
        </button>
      )}
    </div>
  );
}
