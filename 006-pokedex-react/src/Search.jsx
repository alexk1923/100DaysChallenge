import React, { useEffect, useState } from 'react';
import pokeballClosed from './img/pokeball-closed.png'
import PropTypes from 'prop-types';

export default function Search(props) {

	Search.propTypes = {
		inputFilter: PropTypes.func.isRequired
	}

	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [rotate, setRotate] = useState("");
	const [searchValue, setSearchValue] = useState("");

	function handlePokeBallClick() {
	setActiveSearchBar(prevActiveSearchBar => !prevActiveSearchBar);
	setRotate(prevRotate => {
		if (prevRotate === "" || prevRotate === "rotateBackwards")
			setRotate("rotateForward")
		else setRotate("rotateBackwards")} );
	console.log(rotate);
	}

	function handleInputChange(e) {
		const {value: searchValue} = e.target;
		setSearchValue(searchValue);
		props.inputFilter(searchValue);
	}

  return (
	<div className='search-container'>
		<img src={pokeballClosed} alt="closed pokeball" onClick={handlePokeBallClick} className={rotate}></img>
		{activeSearchBar && <input type="text" name="pokemon-search" value={searchValue} placeholder="Search a pokemon" onChange={handleInputChange}></input>}
	</div>
  )

}
