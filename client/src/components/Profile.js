import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateList from './CreateList'
import DisplayLists from './DisplayLists'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {

  // const username = useSelector((state) => state.username)
  // console.log(username)
  // const userID = useSelector((state) => state.userID)
  // console.log(userID)

  const [username, setUsername] = useState()
  const [userID, setUserID] = useState()
  const [allLists, setAllLists] = useState([])

  const displayUserProfile = async() => {
    try {
        const data = await axios.get('/profileInfo', {
            headers: {
                "authorization": localStorage.token
            }
        })
        // console.log("the username data", data)
        setUsername(data.data[0].username)
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
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {

    displayUserProfile();

  }, [username])

  useEffect(() => {

    if (!userID) return;
    console.log("getting id")

    async function displayList() {
      displayListsFetch();
    }

    displayList()

  }, [userID])

  return (
    <>
        <h1 className='text-center'>
          {username}'s Profile
        </h1>
        <CreateList />
        {/* <DisplayLists /> */}

        {
            allLists.map(info => {
                return (
                  <ul key={info.id}>
                    <li value={info.listname}>
                        <Link to={`/list-info/${info.listname}`}>{info.listname}</Link>
                    </li>
                  </ul>
                )
            })
        }
    </>
  )
}

export default Profile