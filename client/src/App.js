import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SigninAndSignup from './components/auth/SigninAndSignup'

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
        console.log("the error", error.response.status)
    }
  }

  const updatePrice = async(id, currentPrice) => {
    // e.preventDefault();
    try {

        const edit = await axios.put(`/card-price-update/${id}`, {
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

    if( localStorage.yourapp_date == date ) 
        return false;

    localStorage.yourapp_date = date;
    return true;
  }

  const refreshAtMidnight = () => {
    if( !checkIfNextDay() ) return false;
  
    allCardsInDB()
    alert("It's a new day, and the price of cards has updated!");
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
        <div>
            Welcome!
        </div>
      </>
    )
  }
}

export default App