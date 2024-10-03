import { Actions } from '../types';

export const actions: Actions = {
  setData: { type: 'SET_DATA' },
  clearData: { type: 'CLEAR_DATA' },
  setSearch: { type: 'SET_SEARCH_TEXT' },
  clearSearch: { type: 'CLEAR_SEARCH_TEXT' },
  setErrorMsg: { type: 'SET_ERROR_MSG' },
  clearErrorMsg: { type: 'CLEAR_ERROR_MSG' },
  setIsloading: { type: 'SET_IS_LOADING' },
  setPagination: { type: 'SET_PAGINATION' },
  clearPagination: { type: 'CLEAR_PAGINATION' },
  setTotalPages: { type: 'SET_TOTAL_PAGES' },
  clearTotalPages: { type: 'CLEAR_TOTAL_PAGES' },
  setPagesOnDisplay: { type: 'SET_PAGES_ON_DISPLAY' },
  clearPagesOnDisplay: { type: 'CLEAR_PAGES_ON_DISPLAY' },
};
