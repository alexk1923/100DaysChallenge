import React from "react";
import Pokemon from "./Pokemon";
import { v4 as uuid } from "uuid";
import { useEffect, useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function PokemonList({ pokemons }) {
	const { showDetailed } = useContext(SearchContext);
	const { searchedPokemon } = useContext(SearchContext);

	function filterPokemons(filterName) {
		return pokemons
			.filter((pokemon) => pokemon.name.indexOf(filterName) >= 0)
			.map((pokemon) => (
				<Pokemon key={uuid()} name={pokemon.name} url={pokemon.url}></Pokemon>
			));
	}

	useEffect(() => {
		console.log("rerender pokemon list");
	});

	useEffect(() => {
		console.log("s-a schimbat showDetailed in pokemon list");
	}, [showDetailed]);

	return showDetailed ? (
		<div className='detailed-container'>{filterPokemons(searchedPokemon)}</div>
	) : (
		<div className='pokemon-container'>{filterPokemons(searchedPokemon)}</div>
	);
}
