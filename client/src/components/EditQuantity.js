import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditQuantity = ({ info }) => {
    // console.log("info", info)
    // console.log("cards", cards)
    const [cards, setCards] = useState(info)
    const [quantity, setQuantity] = useState(info.quantity)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log(quantity)

    const editQuantity = async(e) => {
        e.preventDefault();
        try {
            // const body = { quantity }
            const edit = await axios.put(`/card/${info.id}`, {
                quantity
            })

            // setCards(cards.map(card => (card.id === cards.id ? { ...card, quantity: cards.quantity } : card)))
            window.location.reload();
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    // const makeEdit = (card) => {
    //     setCards(prevCards => preCards)
    // }

    return (
        <>
            {/* EditQuantity */}
            <Button variant="warning" onClick={handleShow}>
        Update Quantity
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Quantity for {info.cardName}</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type="text" className='form-control' value={quantity} onChange={e => setQuantity(e.target.value)} /></Modal.Body>
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