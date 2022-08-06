import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp } from '../../actions/index'
import { useNavigate } from 'react-router-dom'

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

      <div className="">

            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} className="form">

              <div className="">
                <input type="email" value={email} 
                onChange={e=>setEmail(e.target.value)}
                placeholder="enter email address" />
              </div>

              <div className="">
                <input type="name" value={username} 
                onChange={e=>setUsername(e.target.value)}
                placeholder="enter name" />
              </div>

              <div className="">
                <input type="password" value={password} 
                onChange={e=>setPassword(e.target.value)}
                placeholder="enter password" />
              </div>

              <div className="">
                <input type="submit" value="Sign Up" />
              </div>

          </form>

          <p>Already have an account? <Link to="/signin">Log in</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signup;
