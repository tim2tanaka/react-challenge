import { useAppState } from '../app_state/context';

export function SearchDisplay() {
  const state = useAppState();
  return (
    <section className="search-display">
      {state.data.map((x: any, idx) => {
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
