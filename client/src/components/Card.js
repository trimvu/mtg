import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DisplayLists from './DisplayLists'


const Card = () => {

  const [cardInfo, setCardInfo] = useState()
  const [userList, setUserList] = useState()
  const [quantity, setQuantity] = useState("")

  let {card} = useParams()

  const cardDetail = async () => {

    const data = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    const details = await data.json();
    setCardInfo(details);
    // console.log(cardInfo);

  }

  // const handleSubmit = async e => {
  //   e.preventDefault();

    
  //   const addCard = await axios.post('/card', {
  //     cardName : card,
  //     addedPrice,
  //     quantity,
  //     currentPrice
  //   })
  // }

  useEffect(() => {

    cardDetail()

  }, [])

  return (
    <>
        Card

        {
          cardInfo === undefined
          ?
          ''
          :
          <div>
            <h1>Card Name: {cardInfo.name}</h1>
            <img src={cardInfo.image_uris.normal} />
            <p>Cost: ${cardInfo.prices.usd} USD</p>
          </div>
        }

        <form>
          <DisplayLists setUserList={setUserList} />
          <label>How many would you like to add?<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
          
          <button>Add to list</button>
          
        </form>
    </>
  )
}

export default Card