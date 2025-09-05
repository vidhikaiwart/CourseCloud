import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { serverUrl } from "../../App";
import { Clipboard, Edit } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice.js";

import { toast } from "react-toastify";

const EditCourse = () => {
  const thumb = useRef();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const getCourseById = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/api/courses/getcourse/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      setSelectCourse(data);
      console.log("Fetched course:", data);
  
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(()=>{
    if(selectCourse){
      setTitle(selectCourse.title || "");
      setSubtitle(selectCourse.subtitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      if (selectCourse.thumbnail) setFrontendImage(selectCourse.thumbnail);
    }
  }, [selectCourse]);

  useEffect(() => {
     getCourseById();
  }, []);

  const handleEditCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if (backendImage) formData.append("thumbnail", backendImage);

    try {
      const response = await fetch(`${serverUrl}/api/courses/editcourse/${courseId}`,
        formData,{withCredentials: true});
      console.log("Course edited successfully:", response.data);
      const updateData = response.data;
      if(updateData.isPublished){
        const updatedCourses = courseData.map(c => c._id === courseId ? updateData : c);
       if(!courseData.some(c => c._id === courseId)){
        updatedCourses.push(updateData);}
      dispatch(setCourseData(updateData))
      }else{
         const filterCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filterCourses));
      }
      setLoading(false);
       navigate("/Courses");
       toast.success("Course edited successfully!");
    } catch (error) {
      console.log("Error editing course:", error);
      setLoading(false);
      toast.error("Error editing course", error.response.data.message);
    }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const response = await axios.delete(`${serverUrl}/api/courses/removecourse/${courseId}`, {
        withCredentials: true });
      console.log("Course removed successfully:", response.data);
      const filterCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filterCourses));
      setLoading1(false);
       navigate("/Courses");
       toast.success("Course removed successfully!");
 } catch (error) {
      console.log("Error removing course:", error);
      toast.error("Error removing course");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-xl mt-6">
      {/* Back Button */}
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <FaArrowLeftLong
          className="w-[22px] h-[22px] text-black cursor-pointer"
          onClick={() => navigate("/Courses")}
        />
      </button>

      {/* Heading */}
      <div className="flex flex-wrap gap-3 justify-between mb-6">
        <h2 className="text-xl font-bold mb-4">
          Add detail information regarding course
        </h2>
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Go to lectures page
        </button>
      </div>

      {/* Action buttons */}
      <div className="gap-3 mb-6">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
              onClick={() => setIsPublished((prev) => !prev)}
            >
              Click to Unpublish
            </button>
          )}
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={handleRemoveCourse}>
            Remove Course
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-semibold mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
            rows="3"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Category, Level, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="ai">AI / ML</option>
              <option value="hacking">Ethical Hacking</option>
              <option value="data">Data Analytics</option>
              <option value="tools">AI Tools</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Course Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Price (INR)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₹"
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Course Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="hidden"
            ref={thumb}
          />
          <div
            className="relative w-[150px] cursor-pointer"
            onClick={() => thumb.current.click()}
          >
            <img
              src={frontendImage}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover border rounded-lg"
            />
          </div>
        </div>

        {/* Save / Cancel */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            onClick={() => navigate("/Courses")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            onClick={handleEditCourse}
          >
            {loading ? <Clipboard size={30} color="white" /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
