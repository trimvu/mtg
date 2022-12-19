import React from 'react'
import { useSelector } from 'react-redux'
import CreateList from './CreateList'
import DisplayLists from './DisplayLists'

const Profile = () => {

  const username = useSelector((state) => state.username)
  console.log(username)
  const userID = useSelector((state) => state.userID)
  console.log(userID)

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