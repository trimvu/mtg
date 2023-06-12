
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddCards from './AddCard'

import './Card.css'

type CardObjectProp = {
  name: string,
  mana_cost: string,
  artist: string,
  type_line: string,
  rarity: string,
  oracle_text?: string | undefined,
  card_faces: CardFacesProp[],
  flavor_text: string,
  released_at: string,
  image_uris?: {
    normal: string | undefined,
  },
}

type CardFacesProp = {
  oracle_text: string | undefined,
  flavor_text: string | undefined,
  image_uris: {
    normal: string | undefined
  }
}

type LegalitiesProp = {
  alchemy: "legal" | "not_legal",
  brawl: "legal" | "not_legal",
  commander: "legal" | "not_legal",
  duel: "legal" | "not_legal",
  explorer: "legal" | "not_legal",
  future: "legal" | "not_legal",
  gladiator: "legal" | "not_legal",
  historic: "legal" | "not_legal",
  historicbrawl: "legal" | "not_legal",
  legacy: "legal" | "not_legal",
  modern: "legal" | "not_legal",
  oldschool: "legal" | "not_legal",
  pauper: "legal" | "not_legal",
  paupercommander: "legal" | "not_legal",
  penny: "legal" | "not_legal",
  pioneer: "legal" | "not_legal",
  predh: "legal" | "not_legal",
  premodern: "legal" | "not_legal",
  standard: "legal" | "not_legal",
  vintage: "legal" | "not_legal",
}

const Card = () => {

  const [cardInfo, setCardInfo] = useState<CardObjectProp>({
    name: '',
    mana_cost: '',
    artist: '',
    type_line: '',
    rarity: '',
    oracle_text: '',
    card_faces: [{
      oracle_text: '',
      flavor_text: '',
      image_uris: {
        normal: ''
      }
    }],
    flavor_text: '',
    released_at: '',
    image_uris: {
      normal: ''
    },
  })
  const [cardName, setCardName] = useState('')
  const [addedPrice, setAddedPrice] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [legalities, setLegalities] = useState<LegalitiesProp>({} as LegalitiesProp)
  const [frontBack, setFrontBack] = useState(Number(false))

  let {card} = useParams()

  const cardDetail = async () => {

    const data = await fetch(`https://api.scryfall.com/cards/${card}`)
    const details = await data.json();
    console.log("cardInfo: ", details);
    setCardInfo(details);
    setCardName(details.name);
    setAddedPrice(details.prices.usd);
    setCurrentPrice(details.prices.usd);
    setLegalities(details.legalities)

  }

  const handleFlip = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    setFrontBack(Number(!frontBack))
    // console.log(frontBack)

  }

  useEffect(() => {

    cardDetail()
    
  }, [])
  
  return (
    <>
        <AddCards cardName={cardName} addedPrice={addedPrice} currentPrice={currentPrice} />
        
        {
          (cardInfo && legalities) === undefined
          ?
          // <h1>NO CARD IN DATABASE</h1>
          ''
          :
          
          <div className='contain'>
            <div className='left'>
              <div className='left-contain'>
                <br />
                <h1 style={{ textAlign : 'center' }}>{cardInfo.name}</h1>
                <span><b>Mana Cost: </b>{cardInfo.mana_cost}</span>
                <span className='sec-span'><b>Artist: </b>{cardInfo.artist}</span>
                <br /><br />
                <span><b>Type: </b>{cardInfo.type_line}</span>
                <span className='sec-span'><b>Rarity: </b>{cardInfo.rarity}</span>
                {
                  cardInfo.oracle_text === undefined
                  ?
                  <p className='to-br'>{cardInfo.card_faces[frontBack].oracle_text}<br /><i>{cardInfo.card_faces[frontBack].flavor_text}</i></p>
                  :
                  <p className='to-br'>{cardInfo.oracle_text}<br /><i>{cardInfo.flavor_text}</i></p>
                }
                <span><b>Current Cost: </b>{currentPrice === null ? 'n/a' : <span>${currentPrice} USD</span>}</span>
                <span className='sec-span'><b>Release Date: </b>{cardInfo.released_at}</span>
              </div>
              <br /><br />
              <table>
                <thead>
                  <tr>
                    {/* <th></th> */}
                    <th>Legalities</th>
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alchemy: {legalities.alchemy}</td>
                  </tr>
                  <tr>
                    <td>Brawl: {legalities.brawl}</td>
                  </tr>
                  <tr>
                    <td>Commander: {legalities.commander}</td>
                  </tr>
                  <tr>
                    <td>Duel: {legalities.duel}</td>
                  </tr>
                  <tr>
                    <td>Explorer: {legalities.explorer}</td>
                  </tr>
                  <tr>
                    <td>Future: {legalities.future}</td>
                  </tr>
                  <tr>
                    <td>Gladiator: {legalities.gladiator}</td>
                  </tr>
                  <tr>
                    <td>Historic: {legalities.historic}</td>
                  </tr>
                  <tr>
                    <td>Historic Brawl: {legalities.historicbrawl}</td>
                  </tr>
                  <tr>
                    <td>Legacy: {legalities.legacy}</td>
                  </tr>
                  <tr>
                    <td>Modern: {legalities.modern}</td>
                  </tr>
                  <tr>
                    <td>Old School: {legalities.oldschool}</td>
                  </tr>
                  <tr>
                    <td>Pauper: {legalities.pauper}</td>
                  </tr>
                  <tr>
                    <td>Pauper Commander: {legalities.paupercommander}</td>
                  </tr>
                  <tr>
                    <td>Penny: {legalities.penny}</td>
                  </tr>
                  <tr>
                    <td>Pioneer: {legalities.pioneer}</td>
                  </tr>
                  <tr>
                    <td>PreDH: {legalities.predh}</td>
                  </tr>
                  <tr>
                    <td>Premodern: {legalities.premodern}</td>
                  </tr>
                  <tr>
                    <td>Standard: {legalities.standard}</td>
                  </tr>
                  <tr>
                    <td>Vintage: {legalities.vintage}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <br />
            
            <div className='right'>
              <br />
              {
                cardInfo?.image_uris === undefined
                ?
                <img className='right-img-back' src={cardInfo.card_faces[frontBack].image_uris.normal} alt='card' />
                :
                <img className='right-img' src={cardInfo.image_uris.normal} alt='card' />
              }
              <button className='hid-but' onClick={handleFlip}>Flip Card</button>
              {/* // <img className='right-img' src={cardInfo.image_uris.normal} /> */}
              <br />
            </div>
          </div>
        }
    </>
  )
}

export default Card