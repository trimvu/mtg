import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import './CreateList.css'

const CreateList = () => {

    const [listname, setListname] = useState("");

    const navigate = useNavigate()

    const [userID, setUserID] = useState<number | undefined>()
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
        // console.log(listname)
        try {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        createList();
        // navigate(`/list-info/${listID}/${listname}`)
    }

    useEffect(() => {

        displayUserID()

    }, [])

  return (
    <>

        <div className='create-input'>
            <br />
            <h3 className='text-center'>Create List</h3>

            <div className='create-input-des'>
                <form className='d-flex mt-5' onSubmit={handleSubmit}>
                    <input type='text' className='form-control' value={listname} onChange={e => setListname(e.target.value)} required/>
                    <button className='btn btn-success create-btn'><b>CREATE</b></button>
                </form>
            </div>
            <br /><br />
        </div>

        <br />
    </>
  )
}

export default CreateList