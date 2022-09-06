import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Card = () => {

  const [cardInfo, setCardInfo] = useState()

  let {card} = useParams()

  const cardDetail = async () => {

    const data = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    const details = await data.json();
    setCardInfo(details);
    // console.log(cardInfo);

  }

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

        <button>Add to list</button>
    </>
  )
}

export default Card