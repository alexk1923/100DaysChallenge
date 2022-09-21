import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Pokemon(props) {

    const [pokeImg, setPokeImg] = useState('')
    const [detailedStats, setDetailedStats] = useState({})

    async function getPokeData() {
        const res = await fetch(props.url);
        if(!res.ok) {
            throw new Error("Error: " + res);
        }

        const data = await res.json();


        if(props.detailed) {
            const newStats = {
                id: data.id,
                abilities: data.abilities,
                height: data.height,
                types: data.types,
                img: data.sprites.other.home.front_default
            }
            setDetailedStats(newStats);
            console.log(detailedStats);
        }
        
        setPokeImg(data.sprites.front_default);
        
    }

    useEffect(() => {
        getPokeData();
    }, [])
    
    function handleReadMore() {
        console.log(props.name);
        props.readMore(props.name);
    }

  return (
    props.detailed ? 

    <div className='pokemon-detailed-card'>
    <p>{2}</p>
    <h1>{(props.name)}</h1>
    <p></p>
    <img src={pokeImg}></img>

    </div>
    :

    <div className='pokemon-card'>
        <img src={pokeImg}></img>
        <p>{(props.name)}</p>
        <button id="read-more-btn" onClick={handleReadMore}>Read more</button>
    </div>
    

  )
}

Pokemon.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    detailed: PropTypes.bool
}