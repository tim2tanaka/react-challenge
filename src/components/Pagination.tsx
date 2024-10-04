import { useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { Data } from '../types';

export function Pagination() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [loadPage, setLoadPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (state.search) loadData();
    setLoadPage(false);
  }, [loadPage]);

  function getPaginationData(data: Data['data']) {
    const { page, resultsPerPage } = state.pagination;
    const resultsPage = pageNumber <= 0 ? 1 : pageNumber;
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
      if (pageNumber > 0) setPageNumber((prevNum)=> prevNum - 1);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: pageNumber - 1,
          resultsPerPage: state.pagination.resultsPerPage,
        },
      });
    }
    if (btn === 'next') {
      setLoadPage(true);
      setPageNumber((prevNum)=> prevNum + 1);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: pageNumber + 1,
          resultsPerPage: state.pagination.resultsPerPage,
        },
      });
    }
  }
    const paginationClass =
    state.search && state.data.length ? 'pagination' : 'pagination-hide';

    const isNextPage =
    state.totalPages > state.pagination.resultsPerPage * pageNumber;

  const isBackPage = pageNumber > 1;
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
      { true && <div>
        <span className="select-dropdown"> Page: {pageNumber} </span>
      </div> }
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
