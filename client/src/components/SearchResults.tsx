import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card';

import './SearchResults.css'

type CardFacesProp = {
    image_uris: {
        normal: string | undefined
    }
}

type FutureArrayObjectsProps = {
    name: string,
    image_uris?: {
        normal: string | undefined
    },
    id: string,
    card_faces: CardFacesProp[]
}

const SearchResults = () => {

    let { search } = useParams<{ search: string }>();

    // const navigate = useNavigate();

    const [searchResult, setSearchResult] = useState<FutureArrayObjectsProps[]>([])

    const fetchInput = async () => {

        // let url = `https://api.scryfall.com/cards/autocomplete?q=${search}&include_extras=true`
        let url = `https://api.scryfall.com/cards/search?q=${search}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        // console.log("search.js", data.data)

        // for (let i = 0; i < data.data.length; i++) {
        //     fetch(`https://api.scryfall.com/cards/named?fuzzy=${data.data[i]}`)
        //         .then(res => res.json())
        //         .then(result => {
        //             setSearchResult(oldArr => [...oldArr, result])
        //             // console.log("lbk", searchResult)
        //         })
        // }

        for (let i = 0; i < data.data.length; i++) {
            // console.log(data.data[i].image_uris.normal)
            setSearchResult(data.data)
            console.log(data.data)
        }

    }

    useEffect(() => {
    
        fetchInput();
        
    }, [])

    return (
        <>
            <br />

            <div className='cen-search'>
                <br />
                <h2>Search Result(s) for: </h2>
                <h1>{search}</h1>
                <br />
            </div>

            <br />

            <div className='contain-res'>
                <br />
                <div className='full-results'>
                    {
                        searchResult === undefined
                        ?
                        ''
                        :
                        searchResult.map(info => {
                            return (
                                    <Card className='full-cards' key={info.name}>
                                        {
                                            info.image_uris === undefined
                                            ?
                                            <Card.Img variant="top" src={`${info.card_faces[0].image_uris.normal}`} />
                                            :
                                            <Card.Img variant="top" src={`${info.image_uris.normal}`} />

                                        }
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'center' }}><Link to={`/card-info/${info.id}`}>{info.name}</Link></Card.Title>
                                        </Card.Body>
                                    </Card>
                            )
                        })
                    }
                </div>
                <br /><br />
            </div>
            <br />
        </>
    )
}

export default SearchResults