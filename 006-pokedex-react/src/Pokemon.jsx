import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Pokemon(props) {

    const [pokeImg, setPokeImg] = useState('')

    async function getPokeData() {
        const res = await fetch(props.url);

        if(!res.ok) {
            throw new Error("Error: " + res);
        }

        const data = await res.json();
        setPokeImg(data.sprites.front_default)
    }

    useEffect(() => {
        getPokeData();
    }, [])
    

  return (
    <div className='pokemon-card'>
        <img src={pokeImg}></img>
        <p>{(props.name)}</p>
        <button id="read-more-btn">Read more</button>
    </div>
  )
}

Pokemon.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string
}