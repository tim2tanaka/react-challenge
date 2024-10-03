import './App.css';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { SearchDisplay } from './components/SearchDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Pagination } from './components/Pagination';
import { DropdownList } from './components/PagesDropDown';
import { Provider, useAppState } from './app_state/context';
import { Loading } from './components/Loading';

function App() {
  const state = useAppState();

  return (
    <>
      <Provider>
        <Header title="Country Search App" />
        <Search />
        <DropdownList />
        <Pagination />
        <SearchDisplay />
        <ErrorDisplay />
        <Loading />
        <Pagination />
      </Provider>
    </>
  );
}

export default App;
