import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
// import './Signin.css'

const Signup = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();

    dispatch(signUp({email, username, password}, ()=>{
      navigate('/profile')
    }))

    
  }

  return (
  <div className="">
  
    <div className="">

      <div className="login-box">

            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} className="form">

              <div className="user-box input-field">
                <input type="email" value={email} 
                onChange={e=>setEmail(e.target.value)}
                // placeholder="enter email address" 
                required/>
                <label>Enter E-mail Address</label>
              </div>

              <br />

              <div className="user-box input-field">
                <input type="name" value={username} 
                onChange={e=>setUsername(e.target.value)}
                // placeholder="enter name" 
                required/>
                <label>Enter Name</label>
              </div>

              <br />

              <div className="user-box input-field">
                <input type="password" value={password} 
                onChange={e=>setPassword(e.target.value)}
                // placeholder="enter password"
                required/>
                <label>Enter Password</label>
              </div>

              <br />

                <div className="">
                  <input type="submit" value="Sign Up" />
                </div>

          </form>

      </div>

    </div>
  
  </div>);
};

export default Signup;
