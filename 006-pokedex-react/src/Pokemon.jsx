import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { SearchContext } from "./SearchContext";

export default function Pokemon(props) {
	Pokemon.propTypes = {
		name: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	};

	const [pokeImg, setPokeImg] = useState("");
	const [detailedStats, setDetailedStats] = useState({});
	const [isDetailed, setIsDetailed] = useState(false);
	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);
	const { showDetailed, setShowDetailed } = useContext(SearchContext);

	useEffect(() => {
		fetchDetailed(isDetailed);
	}, [isDetailed]);

	async function fetchDetailed(isDetailed) {
		console.log("fetch detailed:" + isDetailed);

		const res = await fetch(props.url);
		if (!res.ok) {
			throw new Error("Error: " + res);
		}

		const data = await res.json();
		const newStats = {
			id: data.id,
			abilities: data.abilities,
			height: data.height,
			weight: data.weight,
			types: data.types,
			img: data.sprites.other.home.front_default,
		};
		setPokeImg(data.sprites.front_default);
		setDetailedStats(newStats);
		console.log(newStats);

		if (showDetailed) {
			console.log("Este detaliat");
			setIsDetailed(true);
		}
	}

	function handleReadMore() {
		setIsDetailed(true);
		setShowDetailed(true);
		setSearchedPokemon(props.name);
	}

	function getHighlightedString() {
		const matchIndex = props.name.indexOf(searchedPokemon);
		const beginNewName = props.name.slice(0, matchIndex);
		const endNewName = props.name.slice(
			matchIndex + searchedPokemon.length,
			props.name.length
		);
		return (
			<p>
				{beginNewName}
				<span className='highlighted'>{searchedPokemon}</span>
				{endNewName}
			</p>
		);
	}

	return isDetailed ? (
		<div className='pokemon-detailed-card'>
			<div className='first-info'>
				<div className='img-id'>
					<p>{detailedStats.id}</p>
					<img src={detailedStats.img} alt={props.name}></img>
				</div>
				<p>Types:</p>
				<ul>
					{detailedStats.types.map((elem) => (
						<li key={uuid()}>{elem.type.name}</li>
					))}
				</ul>
			</div>

			<div className='second-info'>
				<h1>{props.name}</h1>
				{detailedStats.abilities.map((a) => (
					<p key={uuid()}>{a.ability.name}</p>
				))}
				<p>Height: {detailedStats.height}</p>
				<p>Weight: {detailedStats.weight}</p>
			</div>
		</div>
	) : (
		<div className='pokemon-card'>
			<img src={pokeImg} alt={props.name}></img>
			{props.searchedFilter === "" ? (
				<p>{props.name}</p>
			) : (
				getHighlightedString()
			)}
			<button id='read-more-btn' onClick={handleReadMore}>
				Read more
			</button>
		</div>
	);
}
