import { useEffect, useState } from "react";
import "./App.css";
import { useAxios } from "goca";
import { useDebounce } from "../src/hooks/useDebounce";

function App() {
  const { data, loading, error, fetcher } = useAxios({ method: 'get', url: "https://rickandmortyapi.com/api/character", enabled: false });
  const [search, setSearch] = useState("/?name=");

  const debouncedFetch = useDebounce((searchTerm) => {fetcher({enabled: true,method: "get", url: `https://rickandmortyapi.com/api/character${searchTerm}` }); }, 1000);

  useEffect(() => {
    debouncedFetch(search);
  }, [search, debouncedFetch]);

  const handleInputChange = (e) => {
    setSearch(`/?name=${e.target.value}`);
  };

 
  
  return (
    <div className="page">
      <header>
        <form>
          <input
            placeholder="Rick Sanchez"
            onChange={handleInputChange}
          />
        
        </form>
      </header>
      {loading&& <h1>Cargando...</h1>}
      <main className="row full-height">
        {data?.results?.length > 0 && data?.results.map((character) => (
          <div key={character.id} className="col-12 col-md-6">
            <h3>{character.name}</h3>
            <img src={character.image} alt={character.name} />
            <p>It is species: {character.species}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
