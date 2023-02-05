import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Random from './components/Random'
import Search from './components/Search'

const App = () => {

  const [searchInput, setSearchInput] = useState("")
  const [submittedSearchInput, setSubmittedSearchInput] = useState("")

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

export default App