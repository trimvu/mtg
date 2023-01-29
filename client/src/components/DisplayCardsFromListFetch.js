import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayCardsFromListFetch = ({listID}) => {

    const [cards, setCards] = useState([])

    const viewListCardsFetch = async() => {

        try {
            const data = await axios.post("/cardList", {
                listID
            })

            // console.log("list ID is ", listID)

            console.log("list cards fetch ", data)

            setCards(data.data)
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

    return (
        <>
            DisplayCardsFromListFetch

            {
                cards === undefined
                ?
                ''
                :
                cards.map(info => {
                    return (
                        <ul key={info.id}>
                            <li>
                                Card Name: <Link to={`/card-info/${info.cardName}`} className="card-link">{info.cardName}</Link>
                                <button className='btn btn-danger' onClick={() => deleteCard(info.id)}>Delete</button>
                                <br /> 
                                Price when added: {info.addedPrice} 
                                <br /> 
                                Current price: {info.currentPrice} 
                                <br /> 
                                Quantity: {info.quantity}
                                <br />
                                ListID: {info.listID}
                            </li>
                        </ul>
                    )
                })
            }
        </>
    )
}

export default DisplayCardsFromListFetch