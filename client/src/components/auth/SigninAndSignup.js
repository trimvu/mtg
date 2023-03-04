import React, { useEffect, useState } from 'react'
import Signin from './Signin'
import Signup from './Signup'

import './SigninAndSignup.css'

const SigninAndSignup = () => {

    const [togglePanel, setTogglePanel] = useState(false)
    const [inCard, setInCard] = useState("")
    const [inImg, setInImg] = useState("")
    const [inArt, setInArt] = useState("")
    const [upCard, setUpCard] = useState("")
    const [upImg, setUpImg] = useState("")
    const [upArt, setUpArt] = useState("")

    const displayCards = ["Grand Abolisher", "Black Market Connections", "Lightning Bolt", "Monastery Swiftspear", "Wurmcoil Engine", "Urza's Power Plant", "Birds of Paradise", "Smothering Tithe", "Karn, the Great Creator", "Sacred Foundry", "Karador, Ghost Chieftain", "Brood Sliver", "Platinum Angel", "Cyclonic Rift", "Oblivion Stone", "Path to Exile", "Grave Titan", "Ugin, the Spirit Dragon", "Collected Company", "Skullclamp"];
    const randomDisplayCard = displayCards[Math.floor(Math.random()*displayCards.length)];

    const fetchSigninCard = async () => {
        let url = `https://api.scryfall.com/cards/named?fuzzy=${randomDisplayCard}`

        let results = await fetch(url);

        let data = await results.json();
        // console.log("signin fetch", data)

        setInCard(data.name)
        setInImg(data.image_uris.normal)
        setInArt(data.artist)
    }

    const fetchSignupCard = async () => {
        let url = `https://api.scryfall.com/cards/named?fuzzy=${randomDisplayCard}`

        let results = await fetch(url);

        let data = await results.json();
        // console.log("signup fetch", data)

        setUpCard(data.name)
        setUpImg(data.image_uris.normal)
        setUpArt(data.artist)
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (togglePanel === true) {
            setTogglePanel(false)
            fetchSigninCard()
            // console.log("false")
        } else {
            setTogglePanel(true)
            fetchSignupCard()
            // console.log("true")
        }
    }

    useEffect(() => {

        fetchSigninCard();

    }, [])

    if (togglePanel === false) {
        return (
            <>
                <br />
                <div className='contain-in-up'>
                    <div className='in-div'>
                        <Signin />
                    </div>
                    <div className='up-div'>
                        {
                            inImg === undefined
                            ?
                            ''
                            :
                            <div>
                                <img alt='card' src={inImg} />
                                <p><b>Card: </b>{inCard}</p>
                                <p><b>Artist: </b>{inArt}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='switch-in-up'>
                    <button onClick={handleClick}>Click Here to Register</button>
                </div>
            </>
        )
    } else {
        return (
            <>
                <br />
                <div className='contain-in-up'>
                    <div className='in-div'>
                        {
                            upImg === undefined
                            ?
                            'df'
                            :
                            <div>
                                <img alt='card' src={upImg} />
                                <p><b>Card: </b>{upCard}</p>
                                <p><b>Artist: </b>{upArt}</p>
                            </div>
                        }
                    </div>
                    <div className='up-div'>
                        <Signup />
                    </div>
                </div>
                <div className='switch-in-up'>
                    <button onClick={handleClick}>Click Here to Log In</button>
                </div>
            </>
        )
    }
}

export default SigninAndSignup