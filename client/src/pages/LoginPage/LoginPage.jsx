import React, { useState } from 'react';
import './LoginPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storeUser } from '../../utils/helper';


const initialUser = {password : "" , email : ""};
const LoginPage = () => {
  const[user , setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({target}) =>{ 
    const {name , value} = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name] : value,
    }
    ))

  }

  const handleLogin = async () =>{
    const url = `http://localhost:1337/api/auth/`;
    try{
      if(user.email && user.password)
      {
        const {data} = axios.post(url , user);
        // console.log({data})
        if(data.jwt)
        {
          storeUser(data)
          console.log("login successfull");
        }
        setUser(initialUser);
        navigate("/");
      }
    } 
    catch(err)
    {
      console.log(err);
    }

  }
  
  return (
     <div className="layout">
      <div className="leftSideBar">
        <div className="leftSideContainer">
          <div className="header">
            <span> Support Creators, Own Unique Plush Collectibles </span>
          </div>
          <div className="description">
            Crowdfund time-limited and exclusive plush toys from your favorite creators. You will not be charged if the project doesn't reach it's goal 
          </div>
          <div className="relationManagementIllustrationWrapper">
            <img src="./img/Bulldog.png" className="relationManagementIllustration" alt="Illustration" />
          </div>
        </div>
      </div>
     
     
      <div className="content">
        <div className="authParent">
          <div className="d-flex justify-content-center h-100 w-100">
            <div className="innerView">
              <svg fill="none" height="70" width="154" xmlns="http://www.w3.org/2000/svg">
                {/* SVG content here */}
              </svg>
              <h3 className="authHeader">Welcome back</h3>
              <div className="d-flex flex-column align-items-center justify-content-center w-100 formMargins">
                <div className="row w-100">
                  <div className="root">
                    <div id="googleSignupButton">
                      <div className="googleButtonWrapper">
                        <iframe 
                          src="https://accounts.google.com/gsi/button?type=standard&shape=rectangular&theme=filled_blue&text=continue_with&size=large&logo_alignment=left&width=352&client_id=164693476873-qk7vagih0eh0vvhoshn4u3j6nesc8bk4.apps.googleusercontent.com"
                          allow="identity-credentials-get"
                          title="Sign in with Google Button"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-100 breaker">
                  <div className="line"></div>
                  <div className="text">or</div>
                  <div className="line"></div>
                </div>
                <form className="w-100">
                  <div className="formField">
                    <label htmlFor="email-address" className="label"><span>Email address</span></label>
                   
                   
                    <div className="inputWrap">
                      <input type="email" name="email" value={user.email} onChange={handleChange} autoComplete="email" id="email-address" required />
                    </div>
                  </div>
                  <div className="formField">
                    <label htmlFor="form-input-1" className="label"><span>Password</span></label>
                  
                  
                    <div className="inputWrap">
                      <input type="password" name="password" value={user.password} onChange={handleChange} autoComplete="current-password" id="form-input-1" required />
                    </div>
                  </div>
                  <label className="checkboxContainer">
                    <input type="checkbox" className="checkboxInput" />
                    <span>Keep me logged in</span>
                  </label>
                  <div>
                    <button className="btn_auth" onClick={handleLogin}>Log in</button>
                  </div>
                  <div className="forgotPassword">
                    <a href="/passwordreset" className="textButton">Forgot password?</a>
                  </div>
                  <div className="other">
                    Don’t have an account yet? <a href="/signup" className="textButton">Sign up now</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;