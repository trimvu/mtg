import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const [searchInput, setSearchInput] = useState("")

    const navigate = useNavigate();

    const fetchInput = async () => {
        let url = `https://api.scryfall.com/cards/named?fuzzy=${searchInput}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        console.log(data)
    
        setSearchInput(data.Search)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetchInput(searchInput)
        console.log(searchInput)
    
        navigate(`/card-info/${searchInput}`)
    
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Search