import React, { useEffect, useState } from 'react'
// import CreateList from './CreateList'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import EditListname from './EditListname'
import EditUsername from './EditUsername'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import './Profile.css'

import { FaTrash } from 'react-icons/fa'
import EditPassword from './EditPassword'

type UserInfoProps = {
  id: number,
  email: string,
  username: string,
  password: string,
}

const Profile = () => {

  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState<number | undefined>()
  // const [allLists, setAllLists] = useState([])
  const [userInfo, setUserInfo] = useState<UserInfoProps>({} as UserInfoProps)

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
        setUserInfo(data.data[0])
    } catch (error) {
        console.log(error)
    }
  }

  // const displayListsFetch = async() => {

  //   try {
  //       const data = await axios.post('/allList', {
  //           userID
  //       })

  //       // console.log(data.data)

  //       // window.location = '/profile';
        
  //       setAllLists(data.data)
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  
  // const deleteAllCardsFromList = async(listID) => {
  //   try {
  //     const deleteAllCards = await axios.delete(`deleteAllCards/${listID}`)

  //     // console.log("all cards were deleted!")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const deleteList = async(id) => {
  //   try {
  //       deleteAllCardsFromList(id)
  //       const deleteList = await axios.delete(`/list/${id}`)
        
  //       setAllLists(allLists.filter(list => list.id !== id))
  //       // console.log('list deleted')
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }

  // const deleteAllListsFromUser = async(id) => {
  //   try {
  //     const deleteAllLists = await axios.delete(`/deleteAllLists/${id}`)

  //     // console.log('all lists were deleted!')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const deleteUser = async(id: number | undefined) => {
    try {
        // deleteAllListsFromUser(id)
        // const deleteUser = await axios.delete(`/deleteUser/${id}`)
        await axios.delete(`/deleteUser/${id}`)
        
        // setAllLists(allLists.filter(list => list.id !== id))
        alert('User was deleted!')
        window.location.assign('/')
    } catch (error) {
        console.log(error)
    }
  }

  const handleDeleteUser = () => {

    confirmAlert({
      title: 'Are you sure you want to delete your account? You cannot recover afterwards.',
      message: 'Are you sure you want to delete your account? You cannot recover afterwards.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteUser(userID)
        },
        {
          label: 'No',
          // onClick: () => alert('User was not deleted')
        }
      ]
    })
  }

  // console.log("all lists", allLists)

  useEffect(() => {

    displayUserProfile();

  }, [username])

  // useEffect(() => {

  //   if (!userID) return;
  //   console.log("getting id")

  //   async function displayList() {
  //     displayListsFetch();
  //   }

  //   displayList()

  // }, [userID])

  return (
    <>
        <br />
        <div className='user-prof'>
          <br />
          <h1>
            {username}'s Profile
          </h1>
          <br />
          <div className='align-update-delete'>
            <table>
              <tbody>
                <tr>
                  <td><EditUsername userInfo={userInfo} /></td>
                  <td>Update Name</td>
                </tr>
                <tr>
                  <td><EditPassword userInfo={userInfo} /></td>
                  <td>Update Password</td>
                </tr>
                <tr>
                  <td>
                    {
                      userID === undefined
                      ?
                      ''
                      :
                      <button className='btn btn-danger' onClick={handleDeleteUser}><FaTrash className="icons" size={20} /></button>
                    }
                  </td>
                  <td>Delete User</td>
                </tr>
              </tbody>
            </table>

            <br /><br />
          </div>
        </div>
        {/* <br /> */}
        {/* <CreateList /> */}
        {/* <DisplayLists /> */}

        {/* <div className='list-table'>
        <br />
          {
            allLists.length > 0
            ?
            <table>
              <thead>
                <tr>
                  <th scope='col'>List Name</th>
                  <th scope='col'>Edit</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              {
                allLists === undefined
                  ?
                  ''
                  :
                  allLists.sort((a, b) => a.id - b.id).map(info => {
                    return (
                      <tbody key={info.id}>
                        <tr>
                          <th scope='row'><Link className='prof-link-color' to={`/list-info/${info.id}/${info.listname}`}>{info.listname}</Link></th>
                          <td><EditListname info={info} /></td>
                          <td><button className='btn btn-danger' onClick={() => deleteList(info.id)}><FaTrash className="icons" size={25} /></button></td>
                        </tr>
                      </tbody>
                      )
                  })
                }
            </table>
            :
            <div style={{ textAlign : 'center' }}>'Create lists to view here'</div>
          }
          <br />
        </div> */}
    </>
  )
}

export default Profile