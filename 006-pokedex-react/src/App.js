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



  function getContent(readMoreName) {
    const [foundPokemon] = pokemons.filter(pokemon => pokemon.name === readMoreName);
    const x = [foundPokemon];
    setPokemons([foundPokemon]);
  }

  return (
    <div className="App">
        <Search inputFilter={inputFilter} />
        <div className='pokemon-container'>
        {
          pokemons.length != 1 ?
          pokemons.map (pokemon => 
        <Pokemon key={uuid()} name={pokemon.name} url={pokemon.url} readMore={getContent}
          detailed={false}/>)
          :
         <Pokemon key={uuid()} name={pokemons[0].name} url={pokemons[0].url} readMore={getContent}
          detailed={true}/> 
        }
        </div> 
    </div>
  );
}

export default App;
