import { useState, useEffect } from 'react';
import { actions } from '../app_state/actions';
import { useAppState, useAppDispatch } from '../app_state/context';
import { PaginationProps } from '../types';

export function Pagination({loadData}: PaginationProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [loadPage, setLoadPage] = useState(false);

  const { search, data, pagination } = state;

  useEffect(() => {
    if (search) loadData(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loadPage]);

  async function handleBtnClick(btn: string): Promise<void> {
    if (btn === 'back') {
      setLoadPage(!loadPage);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: pagination.page - 1,
          resultsPerPage: pagination.resultsPerPage,
        },
      });
    }
    if (btn === 'next') {
      setLoadPage(!loadPage);
      dispatch({
        type: actions.setPagination.type,
        payload: {
          page: pagination.page + 1,
          resultsPerPage: pagination.resultsPerPage,
        },
      });
    }
    setLoadPage(!loadPage);
  }
    const paginationClass =
    search && data.length ? 'pagination' : 'pagination-hide';

    const isNextPage =
    state.totalPages > pagination.resultsPerPage * pagination.page;

  const isBackPage = pagination.page > 1;
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
      { !!data.length && <div>
        <span className="select-dropdown"> Page: {pagination.page} </span>
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
