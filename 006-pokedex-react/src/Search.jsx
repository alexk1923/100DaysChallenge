import React, { useEffect, useState, useContext } from "react";
import pokeballClosed from "./img/pokeball-closed.png";
import PropTypes from "prop-types";
import { SearchContext } from "./SearchContext";

export default function Search(props) {
	Search.propTypes = {
		inputFilter: PropTypes.func,
	};

	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);

	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [rotate, setRotate] = useState("");
	const [searchValue, setSearchValue] = useState("");

	function handlePokeBallClick() {
		setActiveSearchBar((prevActiveSearchBar) => !prevActiveSearchBar);
		setRotate((prevRotate) => {
			if (prevRotate === "" || prevRotate === "rotateBackwards")
				setRotate("rotateForward");
			else setRotate("rotateBackwards");
		});
		console.log(rotate);
	}

	// function handleInputChange(e) {
	// 	const { value: searchValue } = e.target;
	// 	setSearchedPokemon(searchValue);
	// }

	return (
		<div className='search-container'>
			<img
				src={pokeballClosed}
				alt='closed pokeball'
				onClick={handlePokeBallClick}
				className={rotate}
			></img>
			{activeSearchBar && (
				<input
					type='text'
					name='pokemon-search'
					value={searchedPokemon}
					placeholder='Search a pokemon'
					onChange={(e) => setSearchedPokemon(e.target.value)}
				></input>
			)}
		</div>
	);
}
