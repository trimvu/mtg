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
    const [open, setOpen] = useState(false)

    const fetchText = async (text) => {
        let url = `https://api.scryfall.com/cards/named?fuzzy=${text}`
    
        let results = await fetch(url);
    
        let data = await results.json();
        // console.log(data)

        setImgPreview(data.image_uris.small)
    
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

        console.log(imgPreview)

        // return (
        //     <>
        //         <img src={imgPreview} />
        //     </>
        // )

    }

    return (
        <>
            {/* <br /><br /> */}

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
                                        <th scope='row'><Link onMouseOver={handleOver} to={`/card-info/${info.cardName}`} className="card-link-color">{info.cardName}</Link><img className='card-preview' alt='card preview' src={imgPreview} /></th>
                                        <td><button className='btn btn-danger' onClick={() => deleteCard(info.id)}><FaTrash className="icons" size={25} /></button></td>
                                        <td>{formatter.format(info.addedPrice)}</td>
                                        <td>{formatter.format(info.currentPrice)}</td>
                                        <td>{info.quantity}</td>
                                        <td><EditQuantity info={info} /></td>
                                        <td>{formatter.format(info.currentPrice*info.quantity)}</td>
                                    </tr>
                                </tbody>
                                // <ul key={info.id}>
                                //     <li>
                                //         Card Name: <Link to={`/card-info/${info.cardName}`} className="card-link">{info.cardName}</Link>
                                //         {' '}
                                //         <button className='btn btn-danger' onClick={() => deleteCard(info.id)}>Delete</button>
                                //         <br /> 
                                //         Price when added: {formatter.format(info.addedPrice)} 
                                //         <br /> 
                                //         Current price: {formatter.format(info.currentPrice)} 
                                //         <br /> 
                                //         {/* <form> */}
                                //             {/* Quantity: <input type='number' placeholder={info.quantity}  onChange={(e) => setQuantity(e.target.value)} disabled={disableButton} /> */}
                                //         Quantity: {info.quantity} 
                                //         {' '}
                                //         <EditQuantity info={info} />
                                //         <br />
                                //         Total of current price: {formatter.format(info.currentPrice*info.quantity)}
                                //         {/* </form> */}

                                //         <br />
                                //         ListID: {info.listID}
                                //         <br />
                                //         CardID: {info.id}
                                //     </li>
                                    
                                // </ul>
                            )
                        })
                    }
                </table>

                <br />
            
            </div>

            
            
        </>
    )
}

export default DisplayCardsFromListFetch