import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditQuantity from './EditQuantity'

import './DisplayCardsFromListFetch.css'

import { FaTrash } from 'react-icons/fa'

const DisplayCardsFromListFetch = ({ listID, list }) => {

    const [cards, setCards] = useState([])
    const [total, setTotal] = useState()
    const [imgPreview, setImgPreview] = useState("")
    const [scryID, setScryID] = useState("")

    const fetchText = async (text) => {
        let url = `https://api.scryfall.com/cards/named?fuzzy=${text}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        // console.log(data)

        setImgPreview(data.image_uris.small)
        setScryID(data.id)
    
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const viewListCardsFetch = async() => {

        try {
            const data = await axios.post("/cardList", {
                listID
            })

            // console.log("list ID is ", listID)

            // console.log("list cards fetch ", data.data)

            setCards(data.data)

            setTotal(formatter.format(data.data.reduce(
                (accumulator, currentValue) => accumulator + (currentValue.currentPrice*currentValue.quantity),
                0,
            )))

        } catch (error) {
            console.log(error)
        }
    }

    const deleteCard = async(id) => {
        try {
            const deleteCard = await axios.delete(`/card/${id}`)
            
            setCards(cards.filter(card => card.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        if (!listID) return;
        console.log("getting id")

        const getCards = async () => {

            await viewListCardsFetch()
            
        }

        getCards()

    }, [listID])

    const handleOver = (e) => {

        // console.log(e.target.text)

        fetchText(e.target.text)

        // console.log(imgPreview)
        // console.log(scryID)

    }

    return (
        <>

            {/* The ListID : {listID} */}

            <br />
            <div className='contain-list'>
                <div className='cen-list'>
                    <br />
                    <h2>
                        List info for 
                    </h2>
                    <h1>
                        {list}
                    </h1> 
                    <br />
                </div>
                <div className='cen-total'>
                    <br />
                    <h2>Total cost of list: </h2>{
                    total === undefined
                    ?
                    ''
                    :
                    <h1>{total}</h1>
                }
                
                </div>
            </div>


            <br />

            
            <div className='list-card-table'>
                <br />
            {
                cards.length > 0
                ?
                <table>
                    <thead>
                        <tr>
                            <th scope='col'>Card Name</th>
                            <th scope='col'>Remove Card</th>
                            <th scope='col'>Added Price</th>
                            <th scope='col'>Current Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Update Quantity</th>
                            <th scope='col'>Total (of Current Price)</th>
                        </tr>
                    </thead>
                    {
                        cards === undefined
                        ?
                        ''
                        :
                        cards.sort((a, b) => a.id - b.id).map(info => {
                            return (
                                <tbody  key={info.id}>
                                    <tr>
                                        <th scope='row'><Link onMouseOver={handleOver} to={`/card-info/${scryID}`} className="card-link-color">{info.cardName}</Link><img className='card-preview' alt='card preview' src={imgPreview} /></th>
                                        <td><button className='btn btn-danger' onClick={() => deleteCard(info.id)}><FaTrash className="icons" size={20} /></button></td>
                                        <td>{info.addedPrice === null ? 'n/a' : formatter.format(info.addedPrice)}</td>
                                        <td>{info.currentPrice === null ? 'n/a' : formatter.format(info.currentPrice)}</td>
                                        <td>{info.quantity}</td>
                                        <td><EditQuantity info={info} /></td>
                                        <td>{info.currentPrice === null ? 'n/a' : formatter.format(info.currentPrice*info.quantity)}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
                :
                <div style={{ textAlign : 'center' }}>'Add cards to view here'</div>
            }

                <br />
            
            </div>

        </>
    )
}

export default DisplayCardsFromListFetch