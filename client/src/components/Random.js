import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRandom } from 'react-icons/fa'

import './Random.css'

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
            <button type='button' onClick={handleSubmit}><FaRandom className='random-icon' size={20} /></button>
        </>
    )
}

export default Random