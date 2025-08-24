import React, { use, useState } from 'react'
import logo from '../assets/logo.jpg'
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Nav = () => {

  const {userData} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show,setShow] = useState(false);
  const [showHam,setShowHam] = useState(false);

  const handleLogout = async() => {
    try{
      const result = await axios.get(serverUrl + "/api/auth/logout",
        { withCredentials: true }
      );
 
      dispatch(setUserData(null))
      console.log(result.data)
      toast.success("Logout successful");
    }catch(err){
      console.log(err);
      toast.err("Logout failed");
    }}

  return (
    <div className='w-full h-[70px] bg-[#00000047] flex justify-between items-center px-6 fixed top-0'>
      
      {/* Left side - Logo */}
      <div className='flex items-center'>
        <img 
          src={logo} 
          alt="logo" 
          className='w-[55px] rounded-[9px] border-2 '
        />
      </div>

      {/* Right side - Nav Items */}
      <div className='lg:flex items-center gap-4 hidden'>
        {/* Person Icon */}
        {!userData && 
          <IoPersonCircle className='text-4xl cursor-pointer fill-black
           text-white' onClick={()=>setShow(prev=>!prev)} />}
      
        {userData &&  <div className='text-white  w-[40px] h-[40px] rounded-full 
          flex items-center justify-center
            text-[20px] border-2 bg-black
             border-white cursor-pointer'
          onClick={()=>setShow(prev=>!prev)}>
         {(userData?.name || "").slice(0, 1).toUpperCase()}
            </div>
        }

        {/* Dashboard */}
        {userData?.role === "Educator" && 
          <div className='px-4 py-1 bg-black border border-white text-white rounded-md cursor-pointer'>
            Dashboard
          </div>
          
        }
  

        {/* Login */}
        {!userData ? (
          <div className='px-4 py-1 bg-black border border-white text-white rounded-md cursor-pointer'
          onClick={()=>navigate('/login')}>
            Login
          </div>
        ) : (
          <div className='px-4 py-1 bg-white border border-white text-black rounded-md cursor-pointer'
          onClick={handleLogout}>
            Logout
          </div>
        )}
       {show &&<div className='absolute top-[110%] right-[15%] flex items-center flex-center flex-col justify-center gap-2 text-[16px]
       rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black shadow-lg
       hover:border-white hover:text-white cursor-pointer hover:bg-black'>
        <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' 
        onClick={()=>navigate('/profile')}>My Profile</span>
       <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 '>Courses</span>
       </div>}
       </div>
      <GiHamburgerMenu className='w-[35px] h-[35px] lg:hidden fill-black cursor-pointer'
      onClick = {()=> setShowHam (prev=>!prev)}/>
   <div className={`fixed top-0  left-0 w-[100vw] h-[100vh]
      bg-[#535050d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden
      ${showHam ? "translate-x-[0] transition duration-600": "translate-x-[-100%] transition duration-600"} `}>

     <RxCross2 className='w-[45px] h-[45px] fill-white absolute top-4 right-4'
      onClick = {()=> setShowHam (prev=>!prev)}/>
      {!userData && 
          <IoPersonCircle className='text-4xl cursor-pointer fill-black
           text-white'  />}
      
        {userData &&  <div className='text-white  w-[60px] h-[60px] rounded-full 
          flex items-center justify-center  text-[20px] border-2 bg-black
          border-white cursor-pointer'
       >
         {(userData?.name || "").slice(0, 1).toUpperCase()}
        </div>  }
        <div className=' w-[200px] h-[65px] flex items-center justify-center  bg-[black] border border-white text-white rounded-md cursor-pointer' 
        onClick={()=>navigate('/profile')}>
            My Profile
          </div>
          <div className=' w-[200px] h-[65px] flex items-center justify-center  bg-[black] border border-white text-white rounded-md cursor-pointer'>
            My Courses
          </div>
        {userData?.role === "Educator" && 
          <div className='w-[200px] h-[65px] flex items-center justify-center  bg-[black] border border-white text-white rounded-md cursor-pointer'>
            Dashboard
          </div>}
        {!userData ? (
          <div className='w-[200px] h-[65px] flex items-center justify-center  bg-[black] border border-white text-white rounded-md cursor-pointer'
          onClick={()=>navigate('/login')}>
            Login
          </div>
        ) : (
          <div className='w-[200px] h-[65px] flex items-center justify-center  bg-[black] border border-white text-white rounded-md cursor-pointer'
          onClick={handleLogout}>
            Logout
          </div>
        )}

      </div>

    </div>
  )
}

export default Nav
