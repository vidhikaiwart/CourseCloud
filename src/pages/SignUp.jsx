import React, { useState } from 'react';
import logo from '../assets/logo.png';
import google from '../assets/google.jpg';
import { IoIosEye, IoIosEyeOff } from "react-icons/io"; // toggle icons
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth , provider } from '../../utills/firebase.js'




import { setUserData } from "../redux/userSlice.js";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("Student");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      console.log(result.data);

      setLoading(false);
      navigate("/");
      toast.success("Signup successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const googleSignUp = async () => {  
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
 
      const result = await axios.post(
        `${serverUrl}/api/auth/googleauth`,
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Google Signup successful");
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
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="text-gray-500 text-sm">Let's get started</p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md outline-none"
            onChange={(e)=>setName(e.target.value)}
            value={name}
          />
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

          {/* Role selector */}
          <div className="flex w-full items-center justify-between gap-4">
            {["Student", "Educator"].map((r) => (
              <span
                key={r}
                className={`flex-1 text-center px-3 py-2 border rounded-xl cursor-pointer transition 
                  ${role === r ? "bg-gray-900  text-white border-black" : "border-gray-300 text-gray-600"}`}
                onClick={() => setRole(r)}
              >
                {r}
              </span>
            ))}
          </div>

          <button
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={30} /> : "Sign Up" }
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-400 text-sm">Or continue</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* Google button */}
          <button
            className="w-full border border-gray-400 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            onClick={googleSignUp}
          >
            <img src={google} alt="Google" className="w-5 h-5" />
            <span className="text-[16px] text-gray-800">Sign up with Google</span>
          </button>

          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-black font-medium"
              onClick={() => navigate('/login')}
            >
              Login
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
};

export default SignUp;
