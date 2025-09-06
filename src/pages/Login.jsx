import React from 'react'
import logo from '../assets/logo.png';
import google from '../assets/google.jpg';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth , provider } from '../../utills/firebase.js'

const Login = () => {
  
    const [showPassword, setShowPassword] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
      e.preventDefault();
        setLoading(true)
        try{
            const result = await axios.post(`${serverUrl}/api/auth/login`,
             {email,password}, {withCredentials: true})
             dispatch(setUserData(result.data));
            console.log(result.data);
             setLoading(false)
             toast.success("Login successful");
             navigate("/")
        }catch(error){
           console.log(error)
                 setLoading(false);
                toast.error(error.response.data.message || "Login failed");
        }

    };

      const googleLogin = async () => {  
 
        try {
          const response = await signInWithPopup(auth, provider);
          let user = response.user;
          let name = user.displayName;
          let email = user.email;
          let role = "";
     
          const result = await axios.post(
            `${serverUrl}/api/auth/googleauth`,
            { name, email, role },
            { withCredentials: true }
          );
          dispatch(setUserData(result.data));
          navigate("/");
          toast.success("Google Login successful");
        } catch (error) {
          console.log(error);
        }
      }; // ✅ closed properly


  
    return (
      <div className="bg-[#dddbdb] w-[100vw] min-h-[100vh] flex items-center justify-center">
        <form
          className="w-[90%] md:w-[800px] h-auto bg-white shadow-xl rounded-2xl flex flex-col md:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Left side */}
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center px-8 py-6 gap-4">
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Login in your account</p>
  
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-md outline-none"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
  
            {/* Password with toggle */}
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full px-4 py-2 border rounded-md outline-none"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
              />
              <span
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
              </span>
            </div>
  
  
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition cursor-pointer "
            disabled={loading} onClick={handleLogin}>
             {loading ? <ClipLoader size={30} color='white'/>:"Login"}
            </button>

            <span className='text-[13px] cursor-pointer text-[#585757]' 
            onClick = {()=>navigate("/forget")}>Forget your password?</span>

            {/* Divider */}
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <span className="text-gray-400 text-sm">Or continue</span>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>
  
            {/* Google button */}
            <button className="w-full border border-gray-400 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
           >
              <img src={google} alt="Google" className="w-5 h-5" />
              <span className="text-[16px] text-gray-800" onClick={googleLogin}>Sign up with Google</span>
            </button>
  
            <p className="text-sm text-gray-500">
              Create an account?{" "}
              <a href="/signup" className="text-black font-medium" onClick={() => navigate('/signup')}>
                Sign Up
              </a>
            </p>
          </div>
  
          {/* Right side */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-black rounded-r-2xl">
            <img
              src={logo}
              alt="Logo"
              className="max-w-[60%] max-h-[60%] object-contain shadow-2xl"
            />
          </div>
        </form>
      </div>
    );
}

export default Login
