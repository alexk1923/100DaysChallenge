import React, { useState, useContext } from "react";
import pokeballClosed from "./img/pokeball-closed.png";
import { SearchContext } from "./SearchContext";

export default function Search() {
	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);
	const { showDetailed, setShowDetailed } = useContext(SearchContext);
	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [rotate, setRotate] = useState("");

	function handlePokeBallClick() {
		setActiveSearchBar((prevActiveSearchBar) => !prevActiveSearchBar);
		setRotate((prevRotate) => {
			if (prevRotate === "" || prevRotate === "rotateBackwards")
				setRotate("rotateForward");
			else setRotate("rotateBackwards");
		});
	}

	return (
		!showDetailed && (
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
		)
	);
}
