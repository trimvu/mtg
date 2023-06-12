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
      window.location.reload(); 
    }))

  }

  return (
    <>
      <div onClick={logout}>
        {/* <button onClick={logout} >Sign Out</button> */}
        Sign Out
      </div>
    </>
  )
};

export default Signout;
