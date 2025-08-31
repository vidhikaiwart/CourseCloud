import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { Clipboard } from 'lucide-react';


const EditProfile = () => {
  const navigate = useNavigate();
  const {userData} =useSelector(state=>state.user);
  const [name,setName] = useState(userData?.name || "");
  const [description,setDescription] = useState(userData?.description || "");
  const [photoUrl,setPhotoUrl] = useState(null);
  const [loading ,setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name",name);
  formData.append("description",description);
  if(photoUrl){
  formData.append("photo",photoUrl);
  }

  const handleEditProfile = async() => {   
    try{
     const result = await axios.post(`${serverUrl}/api/user/profile`,formData,
        {withCredentials: true})
        dispatch(setUserData(result.data));
        setLoading(false)
        navigate("/")
        toast.success("Profile updated successfully")
    }catch(error){
        setLoading(false)
        console.log(error);
        toast.error("Failed to update profile")
    }
  }
 return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
    <div className="bg-white w-full relative  max-w-md rounded-2xl shadow-lg p-8 sm:p-8">
         <FaArrowAltCircleLeft className="absolute fill-current-black top-[5%] left-[5%] w-[22px] h-[22px] text-[black] cursor-pointer" 
       onClick={() => navigate("/profile")} />
      
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Profile
      </h2>

      {/* Avatar */}
      <form className="flex flex-col items-center mb-6 "
      onSubmit={(e)=>e.preventDefault()}>
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
         {userData ?.photoUrl?  <img
            src={userData.photoUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />:<div className="w-24 h-24 object-cover bg-gray-200 flex items-center justify-center">
           {userData?.name ? userData.name.charAt(0).toUpperCase() : "?"}

          </div>}
        </div>
      </form>

      {/* Form */}
      <form className="space-y-4">
        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Avatar
          </label>
          <input id ='image' name='photoUrl' placeholder='photoUrl' accept='image/*'
            type="file"
            className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-200 file:text-sm file:font-medium"
          onChange={(e) => setPhotoUrl(e.target.files[0])}
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder={userData?.name || "Enter your name"}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            onChange={(e)=>setName(e.target.value)} value={name}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
            placeholder={userData?.email || "Enter your email"}

          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Tell us about yourself"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none resize-none h-24"
            onChange={(e) => setDescription(e.target.value)} value ={description}
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition cursor-pointer"
            disabled={loading}
         onClick={handleEditProfile}>
          {loading ? <Clipboard size={30} color="white" /> : "Save Changes"}

        </button>
      </form>
    </div>
  </div>
  )
}

export default EditProfile
