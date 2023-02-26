import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

import './Search.css'

const Search = () => {

    const [searchInput, setSearchInput] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        navigate(`/search-result/${searchInput}`)

        window.location.reload()
    
    }

    return (
        <>
            <div className='search-bar'>
                <form onSubmit={handleSubmit}>
                    <input className='space-right' placeholder='Search' type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} required/>
                    <button className='space-right'><FaSearch className='search-icon' size={20} /></button>
                </form>

            </div>
        </>
    )
}

export default Search