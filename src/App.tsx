import './App.css';
import { ChangeEvent, useState } from "react";

function App() {
  const [results, setResults] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleSearchInput (event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  };
  
  async function handleBtnClick(){
    try {
      const url = 'https://restcountries.com/v3.1/name';
      const res = await fetch(`${url}/${search}`);
      if (res.status !== 200) throw new Error("Fetch falied");
      const data = await res.json();
      setResults(data);
    } 
    catch (error: any) {
      if (error?.message) setErrorMsg(error.message);
    }
  };

  return (
    <>
      <header className="App-header">
        <h2>Country search</h2>
      </header>
      <div className='Search'>
        <input
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              handleSearchInput(event);
            }}
            className='searchInput'
          />
        <button
          onClick={() => {
            handleBtnClick();
          }}
          className='button'
        >
          Search
        </button>
      </div>
      { !errorMsg && <div id="search-results-container">
        {results.map((x: any) => {
          return (
            <div id="search-result">
              {x.flag} {x.name.official}
              <br />
              Capital: {x.capital}
            </div>
          );
        })}
      </div>
      }
      { errorMsg && 
        <div>
          <span className='errorMsg'> {errorMsg} </span>
        </div>
      }
    </>
  );
}

export default App;
