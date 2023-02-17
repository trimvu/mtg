import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import EditQuantity from './EditQuantity'

const DisplayCardsFromListFetch = ({listID}) => {

    const [cards, setCards] = useState([])
    const [arrayCardNames, setArrayCardNames] = useState([])
    const [quantity, setQuantity] = useState()
    const [disableButton, setDisableButton] = useState(true)
    const [editOrUpdate, setEditOrUpdate] = useState(true)
    // const [currentPrice, setCurrentPrice] = useState('')

    const navigate = useNavigate();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const updatePrice = async(id, currentPrice) => {
        // e.preventDefault();
        try {

            const edit = await axios.put(`/card-price-update/${id}`, {
                currentPrice
            })

            // window.location = `/list-info/${listname}`
        } catch (error) {
            console.log(error)
        }
    }

    const viewListCardsFetch = async() => {

        try {
            const data = await axios.post("/cardList", {
                listID
            })

            // console.log("list ID is ", listID)

            // console.log("list cards fetch ", data.data)

            let newArr = data.data.sort((a, b) => a.id - b.id)

            console.log("newArr", newArr)

            // setCards(data.data)

            // setArrayCardNames(data.data.sort((a, b) => a - b).map(e => e.cardName))

            let arr = []

            // for (let i = 0; i < data.data.length; i++) {
            //     arr.push(data.data[i])
            // };

            // console.log("arr:", arr)

            // let arr2 = arr.sort((a, b) => a.id - b.id)

            // console.log("arr2", arr2)

            // try {
                // arr.forEach(item => {
                //     fetch(`https://api.scryfall.com/cards/named?fuzzy=${item.cardName}`)
                //     .then(res => res.json())
                //     .then(data => console.log(data.name))
                // })

            // for (let i = 0; i < data.data.length; i++) {
            //     fetch(`https://api.scryfall.com/cards/named?fuzzy=${data.data[i].cardName}`)
            //         .then(res => res.json())
            //         // .then(result => console.log(i, result.name, result.prices.usd, data.data[i]))
            //         .then(result => {
            //             updatePrice(data.data[i].id, result.prices.usd)
            //             // setCards([...data.data])
            //             // arr = data.data.sort((a, b) => a.id - b.id)
            //         })
            //         // .then(() => setCards([...data.data]))
            //         // .then(() => {
            //         //     for (let i = 0; i < data.data.length; i++) {
            //         //         arr.push(data.data[i])
            //         //     };
            //         // })
            //     }
                // console.log("arr", arr)

            // if ((newArr.length == arr2.length) && newArr.every(function(element, index){return element === arr2[index]})) {
            //     window.location.roload()
            // }

            // var is_same = (data.data.length == newArr.length) && data.data.every(function(element, index) {
            //     return element.currentPrice === newArr[index].currentPrice; 
            // });

            // console.log(is_same) // true

            // if (is_same === false) {
            //     window.location.reload()
            // }




            // const FetchFn = () => {
            //     data.data.sort((a, b) => a.id - b.id).map(e => e.cardName).forEach(item => {
            //         fetch(`https://api.scryfall.com/cards/named?fuzzy=${item}`)
            //         .then(res => console.log(res.url))
            //     })
            // }

            // FetchFn()

            // try {
            //     data.data.sort((a, b) => a.id - b.id).map(e => {
            //         // console.log(e.cardName)
            //         axios.post("https://api.scryfall.com/cards/collection", {
            //             "identifiers": [
            //                 {
            //                     "name": `${e.cardName}`
            //                 }
            //             ]
            //         })
            //         .then(res => {return res.json()})
            //         .then(data => {
            //             console.log(data)
            //         })


            //         // console.log("please GOD: ", data)
            //     })
            // } catch (error) {
            //     console.log(error)
            // }

            // data.data.sort((a, b) => a - b).map(e => e.cardName).forEach(element => {
            //     const data = axios.get(`https://api.scryfall.com/cards/named?fuzzy=${element}`)
            //     console.log("update price: ", data);
                
            // });


            // console.log("set array card names", data.data.sort((a,b) => a - b).map(e => e.cardName))

            // cards.sort(sortID)

            // setCards(data.sort(sortID).data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetch2 = async () => {
        try {
            const data2 = await axios.post("/cardList", {
                listID
            })
            console.log("data2", data2.data)
            setCards(data2.data)
            navigate('/list-info/1/Elemental%20cards!!')
        } catch (error) {
            console.log(error)
        }
    }

    // const updatePrice = async () => {

    //     try {
    //         arrayCardNames.forEach(element => {
    //             const data = fetch(`https://api.scryfall.com/cards/named?fuzzy=${element.cardName}`)
    //             const details = data.json();
    //             console.log("update price: ", details);
                
    //         });
    //     } catch (error) {
    //         console.log(error)
    //     }

    
    // }

    // const updatePrice = Promise.all(
    //     arrayCardNames.map(async (card) => {
    //         const response = await fetch (`https://api.scryfall.com/cards/named?fuzzy=${card}`);
    //         return await response.json();
    //     })
    // )

    // console.log('updated price 1: ', updatePrice[0] === undefined ? '' : updatePrice[0])

    const deleteCard = async(id) => {
        try {
            const deleteCard = await axios.delete(`/card/${id}`)
            
            setCards(cards.filter(card => card.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setEditOrUpdate(!editOrUpdate)
    //     console.log("click")
    //     setDisableButton(!disableButton)
    // }

    useEffect(() => {

        if (!listID) return;
        console.log("getting id")

        const getCards = async () => {

            await viewListCardsFetch()
            await fetch2()
            
        }

        getCards()

        

    }, [listID])

    let timeoutID
    let clearMe

    // useEffect(() => {
    //     timeoutID = setTimeout(() => {
    //         document.location.reload();
    //     }, 3000);
    // }, [])

    // useEffect(() => {
    //     clearMe = setTimeout(() => {
    //         clearTimeout(timeoutID)
    //     }, 5000);
    // }, [])

    const handleLoad = (e) => {
        e.preventDefault();
        window.location.reload();
    
    }
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     window.location.reload();
    // }

    return (
        <>
            DisplayCardsFromListFetch

            <br />

            The ListID : {listID}

            {/* <div onLoad={handleLoad}> */}

            {
                cards === undefined
                ?
                ''
                :
                cards.sort((a, b) => a.id - b.id).map(info => {
                    return (
                        <ul key={info.id}>
                            <li>
                                Card Name: <Link to={`/card-info/${info.cardName}`} className="card-link">{info.cardName}</Link>
                                {' '}
                                <button className='btn btn-danger' onClick={() => deleteCard(info.id)}>Delete</button>
                                <br /> 
                                Price when added: {formatter.format(info.addedPrice)} 
                                <br /> 
                                Current price: {formatter.format(info.currentPrice)} 
                                <br /> 
                                {/* <form> */}
                                    {/* Quantity: <input type='number' placeholder={info.quantity}  onChange={(e) => setQuantity(e.target.value)} disabled={disableButton} /> */}
                                Quantity: {info.quantity} 
                                {' '}
                                <EditQuantity info={info} />
                                <br />
                                Total of current price: {formatter.format(info.currentPrice*info.quantity)}
                                {/* </form> */}

                                <br />
                                ListID: {info.listID}
                                <br />
                                CardID: {info.id}
                            </li>
                            
                        </ul>
                    )
                })
            }
            {/* </div> */}

            <div>Total cost of list: {
                cards === undefined
                ?
                ''
                :
                formatter.format(cards.reduce(
                    (accumulator, currentValue) => accumulator + (currentValue.currentPrice*currentValue.quantity),
                    0,
                ))
            }
            </div>

            {/* <button onClick={handleClick}>Refresh</button> */}
            
            
        </>
    )
}

export default DisplayCardsFromListFetch