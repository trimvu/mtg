import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateList = () => {

    const [listname, setListname] = useState("");

    const [allLists, setAllLists] = useState([])

    const navigate = useNavigate()
    
    // const userID = useSelector((state) => state.userID)
    const [userID, setUserID] = useState()
    // console.log(userID)

    const displayUserID = async() => {
        try {
            const data = await axios.get('/profileInfo', {
                headers: {
                    "authorization": localStorage.token
                }
            })
            // console.log("the userID data", data)
            setUserID(data.data[0].id)
        } catch (error) {
            console.log(error)
        }
    }

    const createList = async() => {
        console.log(listname)
        try {
            // const body = { listname }
            // const data = await fetch('/list', {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(body)
            // })
            
            // const body = { listname }
            const data = await axios.post('/list', {
                listname,
                userID
            })

            // console.log("createlist data", data.data.id)
            // setlistID(data.data.id)
            navigate(`/list-info/${data.data.id}/${listname}`)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    // const displayListsFetch = async() => {

    //     try {
    //         const data = await axios.get('/list', {
    //             userID
    //         })

    //         // console.log(data.data)
            
    //         setAllLists(data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleSubmit = e => {
        e.preventDefault();
        createList();
        // navigate(`/list-info/${listID}/${listname}`)
    }

    useEffect(() => {

        displayUserID()

    }, [])

  return (
    <>
        <h3 className='text-center'>CreateList</h3>

        <form className='d-flex mt-5' onSubmit={handleSubmit}>
            <input type='text' className='form-control' value={listname} onChange={e => setListname(e.target.value)} required/>
            <button className='btn btn-success'>Create List</button>
        </form>

        <br /><br /><br />

        {/* <h2>User's Lists: </h2>

        <form className='d-flex mt-5'>
            <label>Choose a list: </label>
            <select>
                {
                    allLists.map(info => {
                        return (
                            <option value={info.listname}>
                                {info.listname}
                            </option>
                        )
                    })
                }
            </select>
        </form> */}


    </>
  )
}

export default CreateList