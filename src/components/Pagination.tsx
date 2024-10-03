import { useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { Data } from '../types';

export function Pagination() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (state.search) loadData();
    setLoadPage(false);
  }, [loadPage]);

  const isNextPage =
    state.totalPages > state.pagination.resultsPerPage * state.pagination.page;
  const isBackPage = isNextPage;

  function getPaginationData(data: Data['data']) {
    const { page, resultsPerPage } = state.pagination;
    const resultsPage = page <= 0 ? 1 : page;
    const startIndex = (resultsPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    dispatch({ type: actions.setTotalPages.type, payload: data.length });
    return data.slice(startIndex, endIndex);
  }

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

  async function handleBtnClick(btn: string): Promise<void> {
    if (btn === 'back') {
      setLoadPage(true);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: state.pagination.page - 1,
          resultsPerPage: state.pagination.resultsPerPage,
        },
      });
    }
    if (btn === 'next') {
      setLoadPage(true);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: state.pagination.page + 2,
          resultsPerPage: state.pagination.resultsPerPage,
        },
      });
    }
  }
  const paginationClass =
    state.search && state.data.length ? 'pagination' : 'pagination-hide';
  return (
    <div className={paginationClass}>
      {isBackPage && (
        <button
          onClick={() => {
            handleBtnClick('back');
          }}
          className="button"
        >
          {`< BACK`}
        </button>
      )}
      {isNextPage && (
        <button
          onClick={() => {
            handleBtnClick('next');
          }}
          className="button"
        >
          {`NEXT >`}
        </button>
      )}
    </div>
  );
}
