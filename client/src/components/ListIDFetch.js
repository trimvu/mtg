import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DisplayCardsFromListFetch from './DisplayCardsFromListFetch'

const ListIDFetch = ({list}) => {

    const [listID, setListID] = useState()

    const viewListFetch = async() => {

        try {
            const data = await axios.post(`/getListID`, {
                list
            })
    
            console.log("list fetch data: ", data)
            setListID(data.data[0].id)
    
            // viewListCardsFetch()
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        viewListFetch();
    }, [])
    return (
        <>
            ListIDFetch

            <h1>ListID: {listID}</h1>

            <DisplayCardsFromListFetch listID={listID} />
        </>
    )
}

export default ListIDFetch