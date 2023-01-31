import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DisplayCardsFromListFetch from './DisplayCardsFromListFetch'

const ListIDFetch = ({list}) => {

    // const [listID, setListID] = useState()
    let { id } = useParams();
    // console.log("param id", id)

    // const [allData, setAllData] = useState()
    // const [lengthOfData, setLengthOfData] = useState(0)
    const [dataIDs, setDataIDs] = useState([])

    const viewListFetch = async() => {

        try {
            const data = await axios.post(`/getListID`, {
                list
            })
    
            // console.log("list fetch data: ", data.data.map(element => element.id))
            // setListID(data.data[0].id)
            // setAllData(data.data)
            setDataIDs(data.data.map(element => element.id))
            // setLengthOfData(data.data.length)

            // viewListCardsFetch()
            
        } catch (error) {
            console.log(error)
        }
    }

    // const filterData = () => {
    //     console.log("all data", allData === undefined ? '' : allData.filter(info => info.id))
    // }

    useEffect(() => {

        viewListFetch();

    }, [])
    return (
        <>
            ListIDFetch

            {
                (dataIDs.includes(parseInt(id)) !== true)
                ?
                <h1>THIS LIST DOES NOT EXIST</h1>
                :
                // <h1>ListID: {listID}</h1>
                <DisplayCardsFromListFetch listID={id} />
            }

        </>
    )
}

export default ListIDFetch