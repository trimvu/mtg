import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddCards from './AddCard'
import DisplayLists from './DisplayLists'


const Card = () => {

  const [cardInfo, setCardInfo] = useState()
  const [userList, setUserList] = useState()
  // const [quantity, setQuantity] = useState("")
  const [cardName, setCardName] = useState()
  const [addedPrice, setAddedPrice] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(0)


  let {card} = useParams()

  const cardDetail = async () => {

    const data = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    const details = await data.json();
    // console.log("cardInfo: ", details);
    setCardInfo(details);
    setCardName(details.name);
    setAddedPrice(details.prices.usd);
    setCurrentPrice(details.prices.usd);

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

          <AddCards cardName={cardName} addedPrice={addedPrice} currentPrice={currentPrice} />
        {/* <form>
          <label>How many would you like to add?<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
          
          <button>Add to list</button>
          
        </form> */}
    </>
  )
}

export default Card