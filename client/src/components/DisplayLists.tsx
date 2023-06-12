import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CreateList from './CreateList'
import EditListname from './EditListname'

import { FaTrash } from 'react-icons/fa'

type ListProps = {
    id: number,
    listname: string,
}

const DisplayLists = () => {

    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState<number | undefined>()
    const [allLists, setAllLists] = useState<ListProps[]>([])
    // const [userInfo, setUserInfo] = useState()

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
            // setUserInfo(data.data[0])
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

    const deleteAllCardsFromList = async(listID: number): Promise<void> => {
        try {
            // const deleteAllCards = await axios.delete(`deleteAllCards/${listID}`)
            await axios.delete(`deleteAllCards/${listID}`)
    
          // console.log("all cards were deleted!")
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteList = async(id: number): Promise<void> => {
        try {
            deleteAllCardsFromList(id)
            // const deleteList = await axios.delete(`/list/${id}`)
            await axios.delete(`/list/${id}`)
            
            setAllLists(allLists.filter(list => list.id !== id))
            // console.log('list deleted')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        displayUserProfile()

        if (!userID) return;
        console.log("getting id")
    
        async function displayList() {
            displayListsFetch();
        }
    
        displayList()
    
      }, [userID])

return (
    <>
    <br />
        <div className='user-prof'>
            <br />
            <h1>{username}'s Collection</h1>
            <br />
        </div>

        <br />
        <CreateList />

        <div className='list-table'>
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
                            <td><button className='btn btn-danger' onClick={() => deleteList(info.id)}><FaTrash className="icons" size={20} /></button></td>
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
        </div>
        <br />
    </>
)
}

export default DisplayLists