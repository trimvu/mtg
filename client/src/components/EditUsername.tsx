import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaEdit } from 'react-icons/fa'

type UserInfoProps = {
    id: number | string
    email: string
    username: string
}

type UserInfoObjectProps = {
    userInfo: UserInfoProps
}

const EditUsername = ({ userInfo }: UserInfoObjectProps) => {

    // console.log("the userinfo is: ", userInfo)

    const [username, setUsername] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editUsername = async(e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        try {

            const edit = await axios.put(`/editUsername/${userInfo.id}`, {
                username
            })

            // setCards(cards.map(card => (card.id === cards.id ? { ...card, quantity: cards.quantity } : card)))
            // window.location = `/list-info/${listname}`
            alert("Name / Username updated!")
            window.location.reload()
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                <FaEdit className="icons" size={20} />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Name / Username</Modal.Title>
                </Modal.Header>
                <Modal.Body><input type="text" className='form-control' value={username} onChange={e => setUsername(e.target.value)} /></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => editUsername(e)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditUsername