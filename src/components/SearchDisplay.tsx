import { useAppState } from '../app_state/context';

export function SearchDisplay() {
  const state = useAppState();
  const { search, data, isloading } = state;

  const searchDisplayClass =
  search && data.length && !isloading? 'search-display' : 'search-display-hide';
  return (
    <section className={searchDisplayClass}>
      {data.map((x: any, idx) => {
        return (
          <div
            title="search-data"
            className="dashed-line-boarder"
            key={`country-${idx}`}
          >
            {x.flag} {x.name.official}
            <br />
            Capital: {x.capital}
          </div>
        );
      })}
    </section>
  );
}
