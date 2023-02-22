import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'
import './Signin.css'


const Signin = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(signIn({email, password}, ()=>{
      navigate('/profile')
    }))
  }

  return( 
  <div className="">
  
    <div className="">

      <div className="login-box">

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="">

            <div className="user-box">
              <input type="email" value={email} 
              onChange={e=>setEmail(e.target.value)}
                required/>
              <label>E-mail</label>
            </div>

            <div className="user-box">
              <input type="password" value={password} 
              onChange={e=>setPassword(e.target.value)}
                required/>
              <label>Password</label>
            </div>

            <a href="">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="">
                <input type="submit" value="Log In" />
              </div>
            </a>
            

        </form>

        <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signin;
