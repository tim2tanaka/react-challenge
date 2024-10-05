import { ChangeEvent, useState } from 'react';
import { PaginationProps } from '../types';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';

export function Search({loadData}: PaginationProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState('');

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>): void {
    setInputText(event.target.value);
    dispatch({ type: actions.clearData.type, payload: [] });
    dispatch({ type: actions.clearSearch.type });
    dispatch({ type: actions.clearTotalPages.type });
    dispatch({ type: actions.clearPagination.type });
    dispatch({ type: actions.setSearch.type, payload: event.target.value });
  }

  async function handleBtnClick(btn: string): Promise<void> {
    if (btn === 'clear') {
      dispatch({ type: actions.clearData.type, payload: [] });
      dispatch({ type: actions.clearSearch.type });
      dispatch({ type: actions.clearTotalPages.type });
      dispatch({ type: actions.clearPagination.type });
      setInputText('');
    }
    if (btn === 'search') {
      loadData(inputText);
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
