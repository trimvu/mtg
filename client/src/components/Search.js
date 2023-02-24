import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import './Search.css'

const Search = () => {

    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")

    const navigate = useNavigate();

    // const fetchInput = async () => {
    //     let url = `https://api.scryfall.com/cards/autocomplete?q=${searchInput}`
    
    //     let results = await fetch(url);
    
    //     let data = await results.json();
    //     console.log("search.js", data)
    
    //     // setSearchInput(data.Search)
    //     setSearch(data)

    //     // window.location.reload()
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // fetchInput(searchInput)
        // console.log(searchInput)
    
        navigate(`/search-result/${searchInput}`)

        window.location.reload()
    
    }

    return (
        <>
            <div className='search-bar'>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Search' type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} required/>
                    <button><FaSearch className='search-icon' size={20} /></button>
                </form>

            </div>
        </>
    )
}

export default Search