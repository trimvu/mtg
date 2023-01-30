import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import EditQuantity from './EditQuantity'

const DisplayCardsFromListFetch = ({listID}) => {

    const [cards, setCards] = useState([])
    const [quantity, setQuantity] = useState()
    const [disableButton, setDisableButton] = useState(true)
    const [editOrUpdate, setEditOrUpdate] = useState(true)

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

            console.log("list cards fetch ", data)

            setCards(data.data)

            // cards.sort(sortID)

            // setCards(data.sort(sortID).data)
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

    const editQuantity = async(id, quantity) => {
        // e.preventDefault();
        try {
            // const body = { quantity }
            const edit = await axios.put(`/card/${id}`, {
                quantity
            })

            setCards(cards.map(card => (card.id === cards.id ? { ...card, quantity: cards.quantity } : card)))

        } catch (error) {
            console.log(error)
        }
    }

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setEditOrUpdate(!editOrUpdate)
    //     console.log("click")
    //     setDisableButton(!disableButton)
    // }

    useEffect(() => {

        if (!listID) return;
        console.log("getting id")

        const getCards = async () => {

            await viewListCardsFetch()
        }

        getCards()

    }, [listID])

    return (
        <>
            DisplayCardsFromListFetch

            {
                cards === undefined
                ?
                ''
                :
                cards.sort((a, b) => a.id - b.id).map(info => {
                    return (
                        <ul key={info.id}>
                            <li>
                                Card Name: <Link to={`/card-info/${info.cardName}`} className="card-link">{info.cardName}</Link>
                                {' '}
                                <button className='btn btn-danger' onClick={() => deleteCard(info.id)}>Delete</button>
                                <br /> 
                                Price when added: {formatter.format(info.addedPrice)} 
                                <br /> 
                                Current price: {formatter.format(info.currentPrice)} 
                                <br /> 
                                {/* <form> */}
                                    {/* Quantity: <input type='number' placeholder={info.quantity}  onChange={(e) => setQuantity(e.target.value)} disabled={disableButton} /> */}
                                Quantity: {info.quantity} 
                                {' '}
                                <EditQuantity info={info} />
                                <br />
                                Total of current price: {formatter.format(info.currentPrice*info.quantity)}
                                {/* </form> */}

                                <br />
                                ListID: {info.listID}
                                <br />
                                CardID: {info.id}
                            </li>
                            
                        </ul>
                    )
                })
            }

            <div>Total cost of list: {
                cards === undefined
                ?
                ''
                :
                formatter.format(cards.reduce(
                    (accumulator, currentValue) => accumulator + (currentValue.currentPrice*currentValue.quantity),
                    0,
                ))
            }
            </div>
            
            
        </>
    )
}

export default DisplayCardsFromListFetch