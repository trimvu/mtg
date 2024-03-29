import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { signUp } from '../../actions/index'
import { useNavigate } from 'react-router-dom'
// import './Signin.css'
import { useSelector } from "react-redux";

type AuthProp = {
  auth: {
    message: "Request failed with status code 422"
  }
}

const Signup = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const auth = useSelector((state: AuthProp) => state.auth)
  // console.log(auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
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
                  {
                    auth?.message === "Request failed with status code 422"
                    ?
                    <div>'E-mail already exists'</div>
                    :
                    ''
                  }
                </div>

          </form>

      </div>

    </div>
  
  </div>);
};

export default Signup;
