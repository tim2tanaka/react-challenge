import { useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { PaginationProps } from '../types';

export function Pagination({loadData}: PaginationProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (state.search) loadData(state.search, pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  async function handleBtnClick(btn: string): Promise<void> {
    if (btn === 'back') {
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
      { !!state.data.length && <div>
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
