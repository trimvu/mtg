import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { CgPassword } from 'react-icons/cg'

type UserInfoProps = {
    id: number,
    email: string,
    username: string,
    password: string,
}

type UserInfoObjectProps = {
    userInfo: UserInfoProps
}

const EditPassword = ({ userInfo }: UserInfoObjectProps) => {

    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editPassword = async(e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        try {

            const edit = await axios.put(`/editPassword/${userInfo.id}`, {
                password
            })

            alert("Password updated!")
            window.location.reload()
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                <CgPassword className="icons" size={20} />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body><input type="text" className='form-control' value={password} onChange={e => setPassword(e.target.value)} /></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => editPassword(e)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditPassword