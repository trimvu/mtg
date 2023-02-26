import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddCards from './AddCard'
import DisplayLists from './DisplayLists'
import Random from './Random'
import Search from './Search'

import './Card.css'


const Card = () => {

  const [cardInfo, setCardInfo] = useState()
  const [userList, setUserList] = useState()
  // const [quantity, setQuantity] = useState("")
  const [cardName, setCardName] = useState()
  const [addedPrice, setAddedPrice] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [legalities, setLegalities] = useState([])


  let {card} = useParams()

  const cardDetail = async () => {

    const data = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${card}`)
    const details = await data.json();
    console.log("cardInfo: ", details);
    setCardInfo(details);
    setCardName(details.name);
    setAddedPrice(details.prices.usd);
    setCurrentPrice(details.prices.usd);
    setLegalities(details.legalities)

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
                <p className='to-br'>{cardInfo.oracle_text}<br /><i>{cardInfo.flavor_text}</i></p>
                <span><b>Current Cost: </b>${cardInfo.prices.usd} USD</span>
                <span className='sec-span'><b>Release Date: </b>{cardInfo.released_at}</span>
              </div>
              <br /><br />
              {/* <tr>
                <th></th>
                <th></th>
              </tr> */}
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
                    <td>Commander: {legalities.brawl}</td>
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
              <img className='right-img' src={cardInfo.image_uris.normal} />
              <br />
            </div>
          </div>
        }

        {/* <form>
          <label>How many would you like to add?<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
          
          <button>Add to list</button>
          
        </form> */}
    </>
  )
}

export default Card