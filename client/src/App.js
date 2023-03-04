import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SigninAndSignup from './components/auth/SigninAndSignup'

import './App.css'
import disp1 from './images/disp1.png'
import disp2 from './images/disp2.png'
import disp3 from './images/disp3.png'
import disp4 from './images/disp4.png'
import disp5 from './images/disp5.png'
import disp6 from './images/disp6.png'

const App = () => {

  const [homeDisplay, setHomeDisplay] = useState(0)

  const displayUserProfile = async() => {
    try {
        const data = await axios.get('/profileInfo', {
            headers: {
                "authorization": localStorage.token
            }
        })
        // console.log("the username data", data)
        // console.log("response code", data.status)
        setHomeDisplay(data.status)
    } catch (error) {
        // console.log(error.response.data)
    }
  }

  const updatePrice = async(id, currentPrice) => {
    // e.preventDefault();
    try {

        // const edit = await axios.put(`/card-price-update/${id}`, {
        await axios.put(`/card-price-update/${id}`, {
            currentPrice
        })

        // window.location = `/list-info/${listname}`
    } catch (error) {
        console.log(error)
    }
}

  const allCardsInDB = async () => {
    try {
      const data = await axios.get("/cardAll")
      // console.log(data)

      for (let i = 0; i < data.data.length; i++) {
          fetch(`https://api.scryfall.com/cards/named?fuzzy=${data.data[i].cardName}`)
              .then(res => res.json())
              // .then(result => console.log(i, result.name, result.prices.usd, data.data[i]))
              .then(result => {
                  updatePrice(data.data[i].id, result.prices.usd)

              })

          }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("date", new Date().toLocaleDateString())

  const checkIfNextDay = () => {
    
    var date = new Date().toLocaleDateString();

    if( localStorage.yourapp_date === date ) 
        return false;

    localStorage.yourapp_date = date;
    return true;
  }

  const refreshAtMidnight = () => {
    if( !checkIfNextDay() ) return false;
  
    allCardsInDB()
    console.log("It's a new day, and the price of cards has updated!");
  }

  useEffect(() => {
    displayUserProfile()
    refreshAtMidnight()
  }, [])

  if (homeDisplay === 0) {
    return (
      <>
        <SigninAndSignup />
      </>
    )
  } else {
    return (
      <>

        <div className='home-contain'>
            <br />
            <div className='display1'>
              <div className='display1-left'>
                <br />
                <img src={disp1} alt='Display 1' />
                <br /><br />
              </div>
              <div className='display1-right'>
                <div className='contain-text'>
                  <h1>Log In or Register</h1>
                  <p>When you are first loaded onto this site, you have the option to either log in or register. If you do not yet have an account, you can click on the 'Click Here to Register' button which give you the prompts to enter you e-mail, name, and password. Your password is encrypted for extra security. When you click 'Register', you will be taken to your profile page. You will also be taken to your profile page when you log in with your e-mail and password after the log in prompt.</p>
                  
                </div>
              </div>
            </div>
            <br />
            <div className='display2'>
              <div className='display2-left'>
                <div className='contain-text'>
                  <h1>Profile Page</h1>
                  <p>In your profile page, you can view your profile with the options to update your name, update your password (which will also be encrypted), and to delete your account. If you choose to click on the 'Delete User' button, you will receive a warning message on whether you want to delete your account or not. There is no recovery option if you confirm to delete the account.</p>

                </div>
              </div>
              <div className='display2-right'>
                <br />
                <img src={disp2} alt='Display 2' />
                <br /><br />
              </div>
            </div>
            <br />
            <div className='display3'>
              <div className='display1-left'>
                <br />
                <img src={disp3} alt='Display 3' />
                <br /><br />
              </div>
              <div className='display1-right'>
                <div className='contain-text'>
                  <h1>The Collection</h1>
                  <p>In your collection page, you can create lists to add cards into. You can edit the name of the lists you create and you can also delete lists of your choosing from your account. You will not receive a warning if you decide to delete your lists. Clicking on a selected list will bring you to the list's page.</p>

                </div>
              </div>
            </div>
            <br />
            <div className='display4'>
              <div className='display2-left'>
                <div className='contain-text'>
                  <h1>Search Cards</h1>
                  <p>On the top right corner of the navigation bar, you can find the search bar. To search, enter one or more words. Then click the magnifying glass to the right of the search input (or press the 'Enter' button) to search. The list of cards returned are a list of cards with a card name that contains the word or words you entered. I.e., searching for 'red' will return a card 'Aerial Predation' since 'red' in a part of 'Predation'.</p>
                  <p>To the right of the search button (the magnifying glass), is a Random Button. Click it to view a random card.</p>
                  
                </div>
              </div>
              <div className='display2-right'>
                <br />
                <img src={disp4} alt='Display 4' />
                <br /><br />
              </div>
            </div>
            <br />
            <div className='display5'>
              <div className='display1-left'>
                <br />
                <img src={disp5} alt='Display 5' />
                <br /><br />
              </div>
              <div className='display1-right'>
                <div className='contain-text'>
                  <h1>View Card</h1>
                  <p>When you view a card (through search, random, or from your list), the card's information is returned.</p>
                  <p>On the left of the page, you can view the card's name, mana cost, artist, type, rarity, oracle text, flavor text, current cost of the card in USD, release date, and the card's legalities.</p>
                  <p>On the right of the page, you can view the card's image. If the card has more than one face to the card, there is a 'Flip Card' button to view the other side of the card.</p>
                  <p>On the top of the page, you can select which list you want to add the card to (if you have already created a list) and the quantity.</p>

                </div>
              </div>
            </div>
            <br />
            <div className='display6'>
              <div className='display2-left'>
                <div className='contain-text'>
                  <h1>The Selected List</h1>
                  <p>Once you click on your list, you are returned the name of your list, the total cost of your list, and the list of cards you added to the list (if cards were added to the list beforehand). With each card, you can hover over the card's name to see a preview of the card's image. You can also see how much the card cost when you first added the card to the list, the current cost of the card, the quantity of the card, and the total cost of the card (current price of card x quantity of card). If a card does not have a price, then it is listed as 'n/a' and will count as $0.00 towards the list. This is due to it not being available in the database. Finally, you have the ability to update the quantity of cards and to delete cards.</p>

                </div>
              </div>
              <div className='display2-right'>
                <br />
                <img src={disp6} alt='Display 6' />
                <br /><br />
              </div>
            </div>
            <br />
        </div>
      </>
    )
  }
}

export default App