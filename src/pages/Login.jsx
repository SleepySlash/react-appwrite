import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext';


const Login = () => {

  const navigate = useNavigate();

  const {user} = useAuth();

  useEffect(()=>{
    if(user)
      {
        navigate('/');
      }

  },[]);

  return (
    <div className="container">
        <div className="login-register-container">
          <form>

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
                  name="password"
                  placeholder="Enter password..."
                  />
            </div>


            <div className="form-field-wrapper">
    
                <input 
                  type="submit" 
                  value="Login"
                  className="btn"
                  />

            </div>

          </form>

          <p>Don't have an account? <Link to="/register">Register</Link></p>

        </div>
    </div>
  )
}

export default Login
