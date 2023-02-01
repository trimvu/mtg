import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Search from './Search';

const SearchResults = () => {

    let { search } = useParams();

    const navigate = useNavigate();

    const [searchResult, setSearchResult] = useState([])

    const fetchInput = async () => {

        let url = `https://api.scryfall.com/cards/autocomplete?q=${search}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        // console.log("search.js", data.data)

        setSearchResult(data.data)
    
        // setSearchInput(data.Search)

        // window.location.reload()
    }

    useEffect(() => {
    
        fetchInput();
        
    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // fetchInput(searchInput)
        // console.log(searchInput)
    
        navigate(`/card-info/`)
    
    }

    return (
        <>
            SearchResults

            <Search />

            {
                searchResult === undefined
                ?
                ''
                :
                searchResult.map(info => {
                    return (
                        <ul key={info}>
                            <Link to={`/card-info/${info}`}>{info}</Link>
                        </ul>
                    )
                })
            }
        </>
    )
}

export default SearchResults