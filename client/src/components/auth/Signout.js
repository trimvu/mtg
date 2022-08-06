import React from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../actions'

const Signout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const logout = () => {

    dispatch(signOut(()=>{
      navigate('/')
    }))
  }

  return <div>
  <h1 className="">Goodbye</h1>

  <h3 className="">...sorry to see you go!</h3>

  <button onClick={logout} >Sign Out</button>
 </div>
};

export default Signout;
