import React from "react";
import Pokemon from "./Pokemon";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function PokemonList({ pokemons }) {
	const [isDetailed, setIsDetailed] = useState(false);
	const [detailedPokemon, setDetailedPokemon] = useState("");
	const [detailedStats, setDetailedStats] = useState({});
	const [detailedInitialPokemon, setDetailedInitialPokemon] = useState({});
	const { searchedPokemon } = useContext(SearchContext);

	function filterDetailed(detailedPokemonName) {
		// console.log("fILTER FROM POKEMON LIST");
		setIsDetailed(true);
		setDetailedPokemon(detailedPokemonName);
		const [found] = pokemons.filter(
			(pokemon) => pokemon.name === detailedPokemonName
		);

		setDetailedInitialPokemon(found);
		console.log("gata filter");
	}

	async function getPokeData(pokemon) {
		if (isDetailed) {
			const res = await fetch(pokemon.url);
			if (!res.ok) {
				throw new Error("Error: " + res);
			}

			const data = await res.json();

			console.log("getPokeData from PokemonList");
			const newStats = {
				id: data.id,
				abilities: data.abilities,
				height: data.height,
				weight: data.weight,
				types: data.types,
				img: data.sprites.other.home.front_default,
			};
			// console.log("newStats from pokemon list: " + newStats);
			setDetailedStats(newStats);
		}
	}

	useEffect(() => {
		console.log("useEffect Pokemon List");
		getPokeData(detailedInitialPokemon);
	}, [isDetailed, detailedInitialPokemon]);

	return isDetailed ? (
		<div className='detailed-container'>
			{pokemons
				.filter((pokemon) => pokemon.name === detailedPokemon)
				.map((pokemon) => (
					<Pokemon
						key={uuid()}
						name={pokemon.name}
						url={pokemon.url}
						filterDetailed={filterDetailed}
						searchedFilter={searchedPokemon}
						isDetailed={isDetailed}
						detailedStats={detailedStats}
					></Pokemon>
				))}
		</div>
	) : (
		<div className='pokemon-container'>
			{pokemons.length !== 1 ? (
				pokemons
					.filter((pokemon) => pokemon.name.indexOf(searchedPokemon) >= 0)
					.map((pokemon) => (
						<Pokemon
							key={uuid()}
							name={pokemon.name}
							url={pokemon.url}
							filterDetailed={filterDetailed}
							searchedFilter={searchedPokemon}
							isDetailed={isDetailed}
							detailedStats={detailedStats}
						/>
					))
			) : (
				<Pokemon
					key={uuid()}
					name={pokemons[0].name}
					url={pokemons[0].url}
					filterDetailed={filterDetailed}
					isDetailed={isDetailed}
					detailedPokemon={detailedPokemon}
				/>
			)}
		</div>
	);
}
