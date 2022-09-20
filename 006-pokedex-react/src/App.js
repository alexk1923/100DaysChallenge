import { useState } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import { v4 as uuid } from 'uuid';

function App() {

  const [pokemons, setPokemons] = useState([]);


  async function fetchAPI() {
    let url = "https://pokeapi.co/api/v2/pokemon"
    const limit = 100;
    const offset = 0;
    url += `?limit=${limit}&offset=${offset}`
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error: " + res);
    }

    const data = await res.json();

    setPokemons(prevPokemons => {
      return [...prevPokemons, ...data.results];
    })

    console.log(pokemons);
  }


  return (
    <div className="App">
      <button onClick={fetchAPI}>Click here to fetch data</button>
      <div className='pokemon-container'>
        {pokemons.map
          (pokemon => {
            console.log(pokemon.name);
            return <Pokemon key={uuid()} name={pokemon.name} url={pokemon.url} />
          }
          )}
      </div>
    </div>
  );
}

export default App;
