import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateList from './CreateList'
import DisplayLists from './DisplayLists'
import axios from 'axios'

const Profile = () => {

  // const username = useSelector((state) => state.username)
  // console.log(username)
  const userID = useSelector((state) => state.userID)
  // console.log(userID)

  const [username, setUsername] = useState()

  const displayUsername = async() => {
    try {
        const data = await axios.get('/profileInfo', {
            headers: {
                "authorization": localStorage.token
            }
        })
        // console.log("the username data", data)
        setUsername(data.data[0].username)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {

    displayUsername();

  }, [username])

  return (
    <>
        <h1 className='text-center'>
          {username}'s Profile
        </h1>
        <CreateList />
        <DisplayLists />
    </>
  )
}

export default Profile