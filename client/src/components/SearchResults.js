import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Search from './Search';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './SearchResults.css'

const SearchResults = () => {

    let { search } = useParams();

    const navigate = useNavigate();

    const [searchResult, setSearchResult] = useState([])

    let arr = []

    const fetchInput = async () => {

        let url = `https://api.scryfall.com/cards/autocomplete?q=${search}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        console.log("search.js", data.data)

        for (let i = 0; i < data.data.length; i++) {
            fetch(`https://api.scryfall.com/cards/named?fuzzy=${data.data[i]}`)
                .then(res => res.json())
                .then(result => {
                    setSearchResult(oldArr => [...oldArr, result])
                    // console.log("lbk", searchResult)
                })
        }

        // setSearchResult(data.data)
    
        // setSearchInput(data.Search)

        // window.location.reload()
    }

    useEffect(() => {
    
        fetchInput();
        
    }, [])
    
    // console.log("arr", arr)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // fetchInput(searchInput)
        // console.log(searchInput)
    
        navigate(`/card-info/`)
    
    }

    return (
        <>
            <br />

            <div className='full-results'>
                {
                    searchResult === undefined
                    ?
                    ''
                    :
                    searchResult.map(info => {
                        return (
                            // <ul key={info.name}>
                            //     <img src={`${info.image_uris.normal}`} alt="react logo" style={{ width: '200px', }}/>
                            //     <br />
                            //     <Link to={`/card-info/${info.name}`}>{info.name}</Link>
                            // </ul>
                                <Card className='full-cards' key={info.name}>
                                    <Card.Img variant="top" src={`${info.image_uris.normal}`} />
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: 'center' }}><Link to={`/card-info/${info.name}`}>{info.name}</Link></Card.Title>
                                    </Card.Body>
                                </Card>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SearchResults