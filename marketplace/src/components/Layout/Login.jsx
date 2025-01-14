import React , {useState} from 'react'
import Layout from './Layout';
import { toast} from 'react-toastify';
import axios from "axios"
import {useNavigate , useLocation} from "react-router-dom"
import "../../Styles/AuthStyles.css"
import { useAuth } from '../../context/Auth.js';

const Login = ()=> {


const[email , setEmail] = useState("");
const[password , setPassword] = useState("");
const [auth,setAuth] = useAuth();

const navigate =  useNavigate();
const location = useLocation();

const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(process.env.REACT_APP_API);
try {
    
    const res = await axios.post(` /api/v1/auth/login`,
          {email,password},
          {
            headers: {
              "Content-Type": "application/json", // Make sure Content-Type is JSON
            },
          }
    )
    if(res.data.success){
        console.log(res.data.success)

        toast.success(res.data.message);
        setAuth({
          ...auth,
          admin:res.data.admin,
          token:res.data.token
        })
        localStorage.setItem("auth",JSON.stringify(res.data));
        setTimeout(() => {
            navigate(location.state  || "/");
        }, 4000);
    }

    else{
        console.log(res.data.success)
        toast.error(res.data.message);

    }
} catch (error) {
    console.log(error);
    toast.error("Something went wrong");
}

}


  return (

   <Layout>
     <div className='form-container'>
       <h1 style={{fontWeight:"bold",fontSize:"27px",marginBottom:"16px"}}>Admin Login</h1>
        
       <form onSubmit={handleSubmit}>
       {/* onSubmit={handleSubmit} */}
 
  <div class="mb-3">
    
    <input  type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
    placeholder='Enter your Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    required

    />
    
  </div>

  <div class="mb-3">
   
    <input placeholder='Enter your Password' type="password" class="form-control" id="exampleInputPassword"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    required

    />
  </div>



<div className='mb-3'>
{/* <button  class="btn btn-primary" onClick={()=>navigate("/forgot-password")}>forgot Password</button> */}
  
  </div> 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

        </div>
   </Layout>
  )
}

export default Login