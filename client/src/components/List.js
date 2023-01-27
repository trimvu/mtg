import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import DisplayLists from './DisplayLists'
import { useSelector } from 'react-redux'
import ListIDFetch from './ListIDFetch'

const List = () => {

//   const [cardInfo, setCardInfo] = useState()
//   const [userList, setUserList] = useState()
//   const [quantity, setQuantity] = useState("")

  let {list} = useParams()
//   console.log("list is: ", list)

//   const [cards, setCards] = useState([])

//   const listID = useSelector((state) => state.listID)
//   console.log("listID is: ", listID)

    // const [listID, setListID] = useState()

//   const viewListFetch = async() => {

//     try {
//         const data = await axios.post(`/getListID`, {
//         // const data = await axios.get(`/list`, {
//             list
//         })

//         // console.log("list fetch data: ", data)
//         setListID(data.data[0].id)

//         // viewListCardsFetch()
        
//     } catch (error) {
//         console.log(error)
//     }
//     }

    // const displayListCard = async() => {
    //     try {
    //         const data = await axios.get(`/list/`, {
    //             headers: {
    //                 "authorization": localStorage.token
    //             }
    //         })
    //         console.log("the list data", data)
    //         // setUsername(data.data[0].username)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const viewListCardsFetch = async(listID) => {

    //     try {
    //         const data = await axios.post("/cardList", {
    //             listID
    //         })

    //         // console.log("list ID is ", listID)

    //         console.log("list cards fetch ", data)

    //         setCards(data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //get all cards

    // router.get("/card", async(req, res) => {
    //     let listID = req.body;

    //     try {
    //         const allListCards = await db.cards.findAll({where: listID})
    //         res.json(allListCards)
    //     } catch (err) {
    //         return res.status(624).json({error: "Can't find database"})
    //     }
    // })

// useEffect(() => {

    // viewListFetch()
    // viewListCardsFetch()
    // displayListCard();

// }, [])

  return (
    <>
        <h3>
            List info for {list}: 
        </h3>

        {/* {data.data.cardName} */}
        {/* {
            cards.map(info => {
                return (
                    <ul key={info.id}>
                        <li>
                            Card Name: <Link to={`/card-info/${info.cardName}`} className="card-link">{info.cardName}</Link>
                            <br /> 
                            Price when added: {info.addedPrice} 
                            <br /> 
                            Current price: {info.currentPrice} 
                            <br /> 
                            Quantity: {info.quantity}
                        </li>
                    </ul>
                )
            })
        } */}

{/* {
                    allLists.map(info => {
                        return (
                            <option key={info.id} value={info.listname}>
                                {info.listname}
                            </option>
                        )
                    })
                } */}

                {/* <h1>ListID: {listID}</h1> */}

        <ListIDFetch list={list} />
    </>
  )
}

export default List