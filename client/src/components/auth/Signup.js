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
      navigate('/')
    }))

    
  }

  return (
  <div className="">
  
    <div className="">

      <div className="login-box">

            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} className="form">

              <div className="user-box">
                <input type="email" value={email} 
                onChange={e=>setEmail(e.target.value)}
                placeholder="enter email address" 
                required/>
              </div>

              <div className="user-box">
                <input type="name" value={username} 
                onChange={e=>setUsername(e.target.value)}
                placeholder="enter name" 
                required/>
              </div>

              <div className="user-box">
                <input type="password" value={password} 
                onChange={e=>setPassword(e.target.value)}
                placeholder="enter password" 
                required/>
              </div>

              <a href="">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="">
                  <input type="submit" value="Sign Up" />
                </div>
              </a>
              

          </form>

          <p>Already have an account? <Link to="/signin">Log in</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signup;
