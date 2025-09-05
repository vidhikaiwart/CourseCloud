import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { serverUrl } from '../../App';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title , setTitle] = useState("");
  const [category , setCategory] = useState("");
  const [loading, setLoading] = useState(false);

 

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true });
      if(result.status === 201){
      toast.success("Course created successfully!");
      navigate("/courses");
}
      
      navigate("/courses");
         setLoading(false);
      console.log( result.data);
     
      toast.success("Course created successfully!");
    }catch(error){
      console.log("Error creating course:", error);
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/Courses");
    }, 2000);
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-full">
           <FaArrowLeftLong
                     className="w-[22px] h-[22px] text-black cursor-pointer"
                     onClick={() => navigate("/Courses")}
                   />
          
          </button>
          <h2 className="text-xl font-bold text-gray-800">Create Course</h2>
        </div>

        {/* Form */}
        <form className="space-y-5"  onSubmit={(e) => e.preventDefault()}>
          {/* Course Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e)=>setTitle(e.target.value)} value={title}
            />

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            onChange={(e)=>setCategory(e.target.value)} value={category}>
              <option value="">Select category</option>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="ai">AI / ML</option>
              <option value="design">Ethical Hacking</option>
              <option value="design">App development</option>
              <option value="design">Data Analytic</option>
              <option value="design">AI Tools</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black disabled:{loading} text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            onClick={handleCreateCourse }
          >
            {loading? <ClipLoader size={20} color={"#fff"} /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse
