import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./Pokemon";
import Search from "./Search";
import PokemonList from "./PokemonList";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [readMorePokemon, setReadMorePokemon] = useState("");
	const [searchedPokemon, setSearchedPokemon] = useState("");
	const [prevPokemonsURL, setPrevPokemonsURL] = useState(null);
	const [nextPokemonsURL, setNextPokemonsURL] = useState(null);
	const [currentPokemonsURL, setCurrentPokemonURL] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
	);

	function inputFilter(filterName) {
		// setPokemons(prevPokemons =>
		//   prevPokemons.filter(pokemon => pokemon.name.includes(filterName)));
		setSearchedPokemon(filterName);
	}

	async function fetchAPI(url) {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error("Error: " + res);
		}

		const data = await res.json();
		console.log(data);
		setPokemons((prevPokemons) => {
			return [...data.results];
		});

		setNextPokemonsURL(data.next);
		setPrevPokemonsURL(data.previous);
	}

	useEffect(() => {
		console.log("Use effect app.ks");
		fetchAPI(currentPokemonsURL);
	}, [currentPokemonsURL]);

	function showww() {
		// console.log("searched: " + searchedPokemon);
		// console.log(pokemons.filter(pokemon => searchedPokemon === "" ));
	}

	function getContent(readMoreName) {
		const [foundPokemon] = pokemons.filter(
			(pokemon) => pokemon.name === readMoreName
		);
		setPokemons([foundPokemon]);
	}

	function handlePrev() {
		setCurrentPokemonURL(prevPokemonsURL);
	}

	function handleNext() {
		setCurrentPokemonURL(nextPokemonsURL);
	}

	return (
		<div className='App'>
			<Search inputFilter={inputFilter} />
			<PokemonList pokemons={pokemons} searchedPokemon={searchedPokemon} />

			<div className='navigation'>
				{prevPokemonsURL !== null && (
					<button type='button' onClick={handlePrev}>
						<span className='nav-text'>PREV</span>
					</button>
				)}
				{nextPokemonsURL != null && (
					<button type='button' onClick={handleNext}>
						<span className='nav-text'>NEXT</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default App;
