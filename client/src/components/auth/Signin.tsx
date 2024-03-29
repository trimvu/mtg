import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { signIn } from '../../actions'
import { useNavigate } from 'react-router-dom'
// import './Signin.css'
import { useSelector } from "react-redux";

type AuthProp = {
  auth: {
    message: "Request failed with status code 500" | "Request failed with status code 401"
    config: {
      method: string
    }
  }
}

const Signin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = useSelector((state: AuthProp) => state.auth)
  // console.log("the auth", auth)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

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
  
              <div className="user-box input-field">
                <input type="email" value={email} 
                onChange={e=>setEmail(e.target.value)}
                  required/>
                <label>E-mail</label>
              </div>
  
              <br />
  
              <div className="user-box input-field">
                <input type="password" value={password} 
                onChange={e=>setPassword(e.target.value)}
                  required/>
                <label>Password</label>
              </div>
  
              <br />
  
  
                <div className="">
                  <input type="submit" value="Log In" />
                  {
                    auth?.message === "Request failed with status code 500" || (auth?.message === "Request failed with status code 401" && auth?.config.method === "post")
                    ?
                    <div>'Incorrect E-mail or Password'</div>
                    :
                    ''
                  }
                </div>
  
          </form>
  
        </div>
  
      </div>
    
    </div>);
};

export default Signin;
