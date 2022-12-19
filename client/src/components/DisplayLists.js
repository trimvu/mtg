import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const DisplayLists = () => {

    const userID = useSelector((state) => state.userID)
    
    const [allLists, setAllLists] = useState([])

    const displayListsFetch = async() => {

        try {
            const data = await axios.post('/allList', {
                userID
            })

            // console.log(data.data)

            // window.location = '/profile';
            
            setAllLists(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        displayListsFetch()

    }, [])

  return (
    <>
        <h2>User's Lists: </h2>

        <form className='d-flex mt-5'>
            <label>Choose a list: </label>
            <select>
                {
                    allLists.map(info => {
                        return (
                            <option key={info.id} value={info.listname}>
                                {info.listname}
                            </option>
                        )
                    })
                }
            </select>
        </form>
    </>
  )
}

export default DisplayLists