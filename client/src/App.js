import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Random from './components/Random'
import Search from './components/Search'
// import Signin from './components/auth/Signin'
import SigninAndSignup from './components/auth/SigninAndSignup'

const App = () => {

  const [searchInput, setSearchInput] = useState("")
  const [submittedSearchInput, setSubmittedSearchInput] = useState("")
  const [homeDisplay, setHomeDisplay] = useState(0)

  const displayUserProfile = async() => {
    try {
        const data = await axios.get('/profileInfo', {
            headers: {
                "authorization": localStorage.token
            }
        })
        console.log("the username data", data)
        console.log("response code", data.status)
        setHomeDisplay(data.status)
    } catch (error) {
        console.log("the error", error.response.status)
    }
  }

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchInput = async () => {
  //     await fetch(`https://api.scryfall.com/cards/named?fuzzy=${submittedSearchInput}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.image_uris.small)
  //     })

  //   }
  //   fetchInput();
  // }, [submittedSearchInput.type])
  

  // useEffect(() => {

  //   const fetchInput = async () => {
  //     let url = `https://api.scryfall.com/cards/named?fuzzy=${searchInput}`

  //     let results = await fetch(url);

  //     let data = await results.json();
  //     console.log(data.image_uris)

  //     setSearchInput(data.Search)
  //   }

  //   fetchInput();
  // }, [])

  const fetchInput = async () => {
    let url = `https://api.scryfall.com/cards/named?fuzzy=${searchInput}`

    let results = await fetch(url);

    let data = await results.json();
    console.log(data)

    setSearchInput(data.Search)
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
      console.log(data)

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

  console.log("date", new Date().toLocaleDateString())

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

  // useEffect(() => {
  //   console.log(searchInput)
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // setSubmittedSearchInput(searchInput)
    fetchInput(searchInput)
    console.log(searchInput)

    navigate(`/card-info/${searchInput}`)

  }

  useEffect(() => {
    displayUserProfile()
    refreshAtMidnight()
  }, [])

  // return (
  //   <>
  //     <div>
          
  //         {/* <form onSubmit={handleSubmit}>
  //             <input type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
  //             <input type="submit" />
  //         </form> */}
  //         <Search />
  //         <Random />
  //     </div>
  //   </>
  // )

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
            
            {/* <form onSubmit={handleSubmit}>
                <input type="text" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
                <input type="submit" />
            </form> */}
            <Search />
            <Random />
        </div>
      </>
    )
  }
}

export default App