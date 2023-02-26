import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DisplayCardsFromListFetch from './DisplayCardsFromListFetch'

const ListIDFetch = ({list}) => {

    let { id } = useParams();
    // console.log("param id", id)

    const [dataIDs, setDataIDs] = useState([])

    const viewListFetch = async() => {

        try {
            const data = await axios.post(`/getListID`, {
                list
            })
    
            // console.log("list fetch data: ", data.data.map(element => element.id))

            setDataIDs(data.data.map(element => element.id))
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        viewListFetch();

    }, [])
    return (
        <>
            {
                (dataIDs.includes(parseInt(id)) !== true)
                ?
                <h1>THIS LIST DOES NOT EXIST</h1>
                :
                // <h1>ListID: {listID}</h1>
                <DisplayCardsFromListFetch listID={id} list={list} />
            }

        </>
    )
}

export default ListIDFetch