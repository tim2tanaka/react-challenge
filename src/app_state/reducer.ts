import { Action, Pagination, State } from '../types';
import { actions } from './actions';

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case `${actions.setData.type}`: {
      return {
        ...state,
        data: [...action.payload],
      };
    }
    case `${actions.clearData.type}`: {
      return {
        ...state,
        data: [],
      };
    }
    case `${actions.setSearch.type}`: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case `${actions.clearSearch.type}`: {
      return {
        ...state,
        search: '',
      };
    }
    case `${actions.setErrorMsg.type}`: {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    case `${actions.clearErrorMsg.type}`: {
      return {
        ...state,
        errorMsg: '',
      };
    }
    case `${actions.setPagination.type}`: {
      return {
        ...state,
        pagination: { ...action.payload },
      };
    }
    case `${actions.clearPagination.type}`: {
      return {
        ...state,
        pagination: {},
      };
    }
    case `${actions.setIsloading.type}`: {
      return {
        ...state,
        isloading: !state.isloading,
      };
    }
    case `${actions.setTotalPages.type}`: {
      return {
        ...state,
        totalPages: action.payload,
      };
    }
    case `${actions.clearTotalPages.type}`: {
      return {
        ...state,
        totalPages: 0,
      };
    }
    case `${actions.setPagesOnDisplay.type}`: {
      return {
        ...state,
        pagesOnDisplay: action.payload,
      };
    }
    case `${actions.clearPagesOnDisplay.type}`: {
      return {
        ...state,
        pagesOnDisplay: 0,
      };
    }
    default:
      return state;
  }
}

export const intialisePagination: Pagination = {
  page: 0,
  resultsPerPage: 5,
};

export const initialState: State = {
  data: [],
  search: '',
  errorMsg: '',
  isloading: false,
  pagination: intialisePagination,
  totalPages: 0,
  pagesOnDisplay: 0,
};
