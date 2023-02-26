import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayLists = ({ cardName, addedPrice, currentPrice }) => {

    // console.log("card name: ", cardName)
    // console.log("added price: ", addedPrice)
    // console.log("current price: ", currentPrice)

    const [userID, setUserID] = useState()
    const [listID, setListID] = useState()
    const [quantity, setQuantity] = useState(1)
    const [allLists, setAllLists] = useState([])

    // console.log("quantity", quantity)

    const displayUserID = async() => {
        try {
            const data = await axios.get('/profileInfo', {
                headers: {
                    "authorization": localStorage.token
                }
            })
            // console.log("the username data", data)
            setUserID(data.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    const displayListsFetch = async() => {

        try {
            const data = await axios.post('/allList', {
                userID
            })

            // console.log(data.data)

            // window.location = '/profile';
            
            setAllLists(data.data)
            setListID(data.data[0].id)
            // console.log("first", data.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        displayUserID();

    }, [])

    useEffect(() => {

        async function showLists() {
            await displayListsFetch()
        }

        showLists()

    }, [userID])

    const handleChange = (e) => {
        e.preventDefault();

        const selectedList = e.target.value
        
        setListID(selectedList)

        // console.log("listID is: ", listID)

    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        // setUserInput(textValue)
        // console.log("handle submit data: ", userID, number, scamValue, textValue)

        const submitCard = await axios.post('/card', {
            cardName: cardName,
            addedPrice: addedPrice,
            quantity,
            currentPrice: currentPrice,
            listID: listID
        }) 

        console.log(submitCard)

        if(submitCard.status === 200){
            alert("Your information was submitted!")
            window.location.reload();
        }
        else {
            alert("Sorry! Your information was NOT submitted.")
        }
    
    }

    // console.log(listname)

  return (
    <>

        {cardName}
        <br />
        {addedPrice}
        <br />
        {currentPrice}
        <br /><br />

        {
            userID === undefined
            ?
            <div>'Register and sign in to create lists to add cards!'</div>
            :
            <div>
                <h2>User's Lists: </h2>
                <form className='d-flex mt-5' onSubmit={handleSubmit}>
                    <label>Choose a list: </label>
                    <select defaultValue={listID} onChange={handleChange}>
                        {
                            allLists.map(info => {
                                return (
                                    <option key={info.id} value={info.id} listname={info.id}>
                                        {info.listname}
                                        {/* {info.listname} */}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>How many would you like to add?<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></label>
                    
                    <button>Add to list</button>
                </form>
            </div>
        }

        {listID}
    </>
  )
}

export default DisplayLists