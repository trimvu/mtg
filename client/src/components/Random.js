import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Random = () => {

    const navigate = useNavigate();

    const fetchRandom = async () => {

        let url = `https://api.scryfall.com/cards/random`
    
        let results = await fetch(url);
    
        let data = await results.json();
        // console.log("random.js", data.name)

        navigate(`/card-info/${data.name}`)

        window.location.reload()
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        
        fetchRandom()
    
    }

    return (
        <>
            <button type='button' onClick={handleSubmit}>Random Card</button>
        </>
    )
}

export default Random