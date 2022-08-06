import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'


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

      <div className="">

        <h2>Sign In</h2>

        <form onSubmit={handleSubmit} className="">

            <div className="">
              <input type="email" value={email} 
              onChange={e=>setEmail(e.target.value)}
              placeholder="info@mailaddress.com" />
            </div>

            <div className="">
              <input type="password" value={password} 
              onChange={e=>setPassword(e.target.value)}
              placeholder="••••••••••••" />
            </div>

            <div className="">
              <input type="submit" value="Log In" />
            </div>

        </form>

        <p>Don't have an account? <Link to="/signup">Register Here</Link></p>

      </div>

    </div>
  
  </div>);
};

export default Signin;
