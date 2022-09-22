import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
export default function Pokemon(props) {
	Pokemon.propTypes = {
		name: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		searchedFilter: PropTypes.string.isRequired,
		filterDetailed: PropTypes.func.isRequired,
		detailedStats: PropTypes.shape({
			id: PropTypes.number,
			abilities: PropTypes.array,
			height: PropTypes.number,
			weight: PropTypes.number,
			types: PropTypes.array,
			img: PropTypes.string,
		}),
	};

	const [pokeImg, setPokeImg] = useState("");
	const [showDetailed, setShowDetailed] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		(async () => {
			console.log("Detailed stats din pokeData apelat initial: ");
			console.log(props);

			const res = await fetch(props.url, signal);
			if (!res.ok) {
				throw new Error("Error: " + res);
			}

			const data = await res.json();
			setPokeImg(data.sprites.front_default);
			if (props.isDetailed) {
				// console.log("dadada");
				setShowDetailed(true);
			}
		})();

		return () => controller.abort();
	}, [showDetailed]);

	function handleReadMore() {
		props.filterDetailed(props.name);
		console.log("Detailed dupa ce s-a apelat filterDetailed: ");
		console.log(props.detailedStats);
		setShowDetailed(true);
		// setReadMore(true);
	}

	function getHighlightedString() {
		const matchIndex = props.name.indexOf(props.searchedFilter);
		const beginNewName = props.name.slice(0, matchIndex);
		const endNewName = props.name.slice(
			matchIndex + props.searchedFilter.length,
			props.name.length
		);
		return (
			<p>
				{beginNewName}
				<span className='highlighted'>{props.searchedFilter}</span>
				{endNewName}
			</p>
		);
	}

	return showDetailed ? (
		<div className='pokemon-detailed-card'>
			<div className='first-info'>
				<div className='img-id'>
					<p>{props.detailedStats.id}</p>
					<img src={props.detailedStats.img} alt={props.name}></img>
				</div>
				<p>Types:</p>
				<ul>
					{props.detailedStats.types.map((elem) => (
						<li key={uuid()}>{elem.type.name}</li>
					))}
				</ul>
			</div>

			<div className='second-info'>
				<h1>{props.name}</h1>
				{props.detailedStats.abilities.map((a) => (
					<p key={uuid()}>{a.ability.name}</p>
				))}
				<p>Height: {props.detailedStats.height}</p>
				<p>Weight: {props.detailedStats.weight}</p>
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
