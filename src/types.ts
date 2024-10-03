import { ChangeEvent, ReactNode } from 'react';

export interface ChildrenProps {
  children?: ReactNode;
}

export type Pagination = {
  page: number;
  resultsPerPage: number;
};

export type Data = {
  data: Array<{
    flag: string;
    name: {
      official: string;
    };
    capital: string;
  }>;
};

export type HeaderProps = {
  title: string;
};

export interface State {
  data: Array<Data['data']> | [];
  search: string;
  errorMsg: string;
  isloading: boolean;
  pagination: Pagination;
  totalPages: number;
  pagesOnDisplay: number;
}

export type Action = {
  type: string;
  payload?: any;
};

export type Actions = {
  setData: {
    type: string;
    payload?: Data['data'];
  };
  clearData: {
    type: string;
  };
  setSearch: {
    type: string;
    payload?: string;
  };
  clearSearch: {
    type: string;
  };
  setErrorMsg: {
    type: string;
    payload?: string;
  };
  clearErrorMsg: {
    type: string;
  };
  setIsloading: {
    type: string;
  };
  setPagination: {
    type: string;
    payload?: Pagination;
  };
  clearPagination: {
    type: string;
  };
  setTotalPages: {
    type: string;
    payload?: number;
  };
  clearTotalPages: {
    type: string;
  };
  setPagesOnDisplay: {
    type: string;
    payload?: number;
  };
  clearPagesOnDisplay: {
    type: string;
  };
};
