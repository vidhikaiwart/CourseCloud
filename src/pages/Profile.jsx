import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Profile = () => {
  const { userData } = useSelector((state) => state.user)
   const navigate = useNavigate();

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">No profile data available. Please log in.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full relative">
        <FaArrowAltCircleLeft className="absolute fill-current-black top-[8%] left-[5%] w-[22px] h-[22px] text-[black] cursor-pointer" 
        onClick={() => navigate("/")} />
        <div className="flex flex-col items-center text-center">
          {userData.photoUrl ? (
            <img
              src={userData.photoUrl}
              className="w-24 h-24 rounded-full object-cover border-4 border-black"
              alt="profile"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-black bg-black text-white flex items-center justify-center text-3xl font-bold">
              {(userData?.name || "U").slice(0, 1).toUpperCase()}
            </div>
          )}

          <h2 className="text-xl font-semibold mt-4">{userData?.name || "Unnamed User"}</h2>
          <p className="text-sm text-gray-500">{userData?.role || "No role set"}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-sm flex items-center">
            <span className="font-semibold text-gray-700">Email: </span>
            <span>{userData?.email || "Not provided"}</span>
          </div>

          <div className="text-sm flex items-center">
            <span className="font-semibold text-gray-700">Bio: </span>
            <span>{userData?.description || "No bio available"}</span>
          </div>

          <div className="text-sm flex items-center">
            <span className="font-semibold text-gray-700">Enrolled Courses: </span>
            <span>{userData?.enrolledCourses?.length ? userData.enrolledCourses.join(", ") : "None"}</span>
          </div>
        </div>
        <div className='mt-6 flex justify-center gap-4'>
          <button className='px-4 py-2 bg-[black] text-white rounded hover:bg-blue-600'
          onClick={() => navigate("/editprofile")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
