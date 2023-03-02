import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaEdit } from 'react-icons/fa'

const EditListname = ({ info }) => {

    // console.log("info", info)
    const [listname, setListname] = useState(info.listname)
    const [listID, setListID] = useState(info.id)
    const [show, setShow] = useState(false);

    // console.log(listname)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editListname = async(e) => {
        e.preventDefault();
        try {

            const edit = await axios.put(`/list/${info.id}`, {
                listname
            })

            // setCards(cards.map(card => (card.id === cards.id ? { ...card, quantity: cards.quantity } : card)))
            // window.location = `/list-info/${listID}/${listname}`
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
                <Modal.Title>Update List Name for: {info.listname}</Modal.Title>
            </Modal.Header>
            <Modal.Body><input type="text" className='form-control' value={listname} onChange={e => setListname(e.target.value)} /></Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={(e) => editListname(e)}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditListname