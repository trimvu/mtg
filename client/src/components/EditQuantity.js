import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaEdit } from 'react-icons/fa'

const EditQuantity = ({ info }) => {

    // console.log("info", info)

    const [quantity, setQuantity] = useState(info.quantity)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(quantity)

    const editQuantity = async(e) => {
        e.preventDefault();
        try {
            if (quantity > 0) {
                const edit = await axios.put(`/card/${info.id}`, {
                    quantity
                })
            } else {
                alert(`'${info.cardName}' was deleted from the list`)
                const deleteCard = await axios.delete(`/card/${info.id}`)

            }

            // setCards(cards.map(card => (card.id === cards.id ? { ...card, quantity: cards.quantity } : card)))
            window.location.reload();
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
          <Modal.Title>Update Quantity for: {info.cardName}</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type="number" className='form-control' value={quantity} min='0' onChange={e => setQuantity(e.target.value)} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => editQuantity(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default EditQuantity