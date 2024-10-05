import './App.css';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { SearchDisplay } from './components/SearchDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Pagination } from './components/Pagination';
import { DropdownList } from './components/PagesDropDown';
import { Loading } from './components/Loading';
import { useAppState, useAppDispatch } from './app_state/context';
import { actions } from './app_state/actions';
import { Data } from './types';

function App() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  async function loadData(searchText:string, pageNumber: number) {
    const searchTxt = searchText ? searchText : state.search;
    const currentPage = pageNumber ? pageNumber : state.pagination.page;
    dispatch({ type: actions.setIsloading.type });

    function getPaginationData(data: Data['data']) {
      const { resultsPerPage } = state.pagination;
      const resultsPage = currentPage <= 0 ? 1 : currentPage;
      const startIndex = (resultsPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      dispatch({ type: actions.setTotalPages.type, payload: data.length });
      return data.slice(startIndex, endIndex);
    }

    const url = 'https://restcountries.com/v3.1/name';
    try {
      dispatch({ type: actions.clearData.type, payload: [] });
      dispatch({ type: actions.clearErrorMsg.type });
      const res = await fetch(`${url}/${searchTxt}`);
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

  return (
    <>
        <Header title="Country Search App" />
        <Search loadData={loadData}/>
        <DropdownList loadData={loadData} />
        {!state.isloading && <SearchDisplay />}
        <ErrorDisplay />
        {state.isloading && <Loading />}
        <Pagination loadData={loadData} />
    </>
  );
}

export default App;
