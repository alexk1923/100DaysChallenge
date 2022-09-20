import { useEffect, useState } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import Search from './Search';
import { v4 as uuid } from 'uuid';

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [readMorePokemon, setReadMorePokemon] = useState("");

  function inputFilter(filterName) {
    setPokemons(prevPokemons =>
      prevPokemons.filter(pokemon => pokemon.name.includes(filterName)));
  }

  async function fetchAPI() {
    let url = "https://pokeapi.co/api/v2/pokemon"
    const limit = 20;
    const offset = 0;
    url += `?limit=${limit}&offset=${offset}`
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error: " + res);
    }

    const data = await res.json();

    setPokemons(prevPokemons => {
      return [...data.results];
    })
  }

  useEffect( () => {
    console.log(
      "Use effect"
    );
    fetchAPI();
  }, [])

  function getContent() {
    
    if(readMorePokemon === "") {
      return pokemons.map (pokemon => 
      <Pokemon key={uuid()} name={pokemon.name} url={pokemon.url}/>) 
    } else {
      const [foundPokemon] = (pokemons.filter(pokemon => pokemon.name == readMorePokemon));
      return <Pokemon key={uuid()} name={foundPokemon.name} url={foundPokemon.url} />
    }

  }

  return (
    <div className="App">
        <Search inputFilter={inputFilter} />
        <div className='pokemon-container'>
        {getContent()}
        </div> 
    </div>
  );
}

export default App;
