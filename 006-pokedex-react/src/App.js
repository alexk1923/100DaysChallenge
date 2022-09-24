import { useEffect, useState } from "react";
import Search from "./Search";
import PokemonList from "./PokemonList";
import Navigation from "./Navigation";
import Pikachu from "./img/pikachu.png";
import { SearchContext } from "./SearchContext";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [showDetailed, setShowDetailed] = useState(false);
	const [searchedPokemon, setSearchedPokemon] = useState("");
	const [prevPokemonsURL, setPrevPokemonsURL] = useState(null);
	const [nextPokemonsURL, setNextPokemonsURL] = useState(null);

	const [currentPokemonsURL, setCurrentPokemonURL] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
	);
	const [isLoading, setIsLoading] = useState(false);

	// function inputFilter(filterName) {
	// 	setSearchedPokemon(filterName);
	// }

	async function fetchAPI(url) {
		setIsLoading(true);
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error("Error: " + res);
		}

		const data = await res.json();
		console.log(data);

		// setTimeout(() => {
		// 	setIsLoading(false);
		// }, 100000);

		setIsLoading(false);

		setPokemons((prevPokemons) => {
			return [...data.results];
		});

		setNextPokemonsURL(data.next);
		setPrevPokemonsURL(data.previous);
	}

	useEffect(() => {
		console.log("rerender app");
		fetchAPI(currentPokemonsURL);
	}, [currentPokemonsURL]);

	// function getContent(readMoreName) {
	// 	const [foundPokemon] = pokemons.filter(
	// 		(pokemon) => pokemon.name === readMoreName
	// 	);
	// 	setPokemons([foundPokemon]);
	// }

	return (
		<div className='App'>
			{isLoading && (
				<div className='loading'>
					<h1>Loading...</h1>
					<img src={Pikachu} alt='Bouncing Pikachu' />
				</div>
			)}

			<SearchContext.Provider
				value={{
					searchedPokemon,
					setSearchedPokemon,
					showDetailed,
					setShowDetailed,
				}}
			>
				<Search />
				<PokemonList pokemons={pokemons} searchedPokemon={searchedPokemon} />
			</SearchContext.Provider>
			<Navigation
				prevPokemonsURL={prevPokemonsURL}
				nextPokemonsURL={nextPokemonsURL}
				handlePrev={() => setCurrentPokemonURL(prevPokemonsURL)}
				handleNext={() => setCurrentPokemonURL(nextPokemonsURL)}
			/>
		</div>
	);
}

export default App;
