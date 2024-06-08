import React,{useEffect, useRef}from 'react'
import { Link} from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import {useNavigate} from 'react-router';

const Register = () => {
  
  const navigate = useNavigate();
  const registerForm = useRef(null);
  
  const {user,registerUser} = useAuth();

  useEffect(() => {
  if(user)
  {
    navigate('/');
  }
  },[]);
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if(password1 !== password2){
      alert("Passwords do not match");
      return;
    }else{
      const userInfo = {name,email,password1,password2};
      registerUser(userInfo);
    }
  }

  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={registerForm} onSubmit={handleSubmit} >

          <div className="form-field-wrapper">
                <label>Name:</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Enter name..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Email:</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  placeholder="Enter email..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Password:</label>
                <input 
                  type="password"
                  name="password1" 
                  placeholder="Enter password..."
                  />
            </div>

            <div className="form-field-wrapper">
                <label>Confirm Password:</label>
                <input 
                  type="password"
                  name="password2" 
                  placeholder="Confirm password..."
                  />
            </div>


            <div className="form-field-wrapper">

                <input 
                  type="submit" 
                  value="Register"
                  className="btn"
                  />

            </div>

        </form>

        <p>Already have an account? <Link to="/login">Login</Link></p>

      </div>
  </div>
  )
}

export default Register
