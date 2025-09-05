import React from "react"; 
import { FaSearch, FaStar } from "react-icons/fa";
import Nav from "../Component/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "../Component/Card.jsx";


const categories = [
  "App Development",
  "AI/ML",
  "AI Tools",
  "Data Science",
  "Data Analytics",
  "Ethical Hacking",
  "UI/UX Designing",
  "Web Development",
  "Others",
];

const courses = [
  {
    id: 1,
    title: "Complete HTML Course",
    category: "Web Development",
    price: "₹199",
    rating: 4.0,
    thumbnail: "/images/html-course.png",
    tag: "FREE PDF NOTES",
  },
  {
    id: 2,
    title: "Complete CSS Course",
    category: "Web Development",
    price: "₹199",
    rating: 4.5,
    thumbnail: "/images/css-course.png",
    tag: "FREE PDF NOTES",
  },
  {
    id: 3,
    title: "Complete JavaScript Course",
    category: "Web Development",
    price: "₹299",
    rating: 5.0,
    thumbnail: "/images/js-course.png",
    tag: "2 Project",
  },
  {
    id: 4,
    title: "React Native Course",
    category: "App Development",
    price: "₹399",
    rating: 4.3,
    thumbnail: "/images/react-native.png",
  },
  {
    id: 5,
    title: "UI/UX Designing Course",
    category: "UI/UX Designing",
    price: "₹249",
    rating: 4.2,
    thumbnail: "/images/uiux.png",
  },
  {
    id: 6,
    title: "Tailwind CSS Course",
    category: "Web Development",
    price: "₹299",
    rating: 4.7,
    thumbnail: "/images/tailwind.png",
  },
];

const AllCourse = () => {

    const navigate = useNavigate();
    const {courseData} = useSelector((state) => state.course);
    const [category, setCategory] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);
    const [isSidebarVisible,setIsSidebarVisible] = useState(false)
    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(c => c !== e.target.value));
        }else{
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilters = () => {
        let courseCopy = courseData?.slice()
        if(category.length > 0){
            courseCopy = courseCopy?.filter(course => category.includes(course.category));
        }
            setFilterCourses(courseCopy);
        
    }

    useEffect(() => {
        setFilterCourses(courseData);
    }, [ courseData]);

    useEffect(() => {
        applyFilters();
    }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Navbar fixed at top */}
      <Nav />
      <button className=" fixed top-20 left-4 z-50 bg-white text-black px-3 
      py-1 rounded md:hidden border-2 border-black" onClick={() => setIsSidebarVisible(prev=>!prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>


      {/* ✅ Sidebar + Main wrapper with padding-top = navbar height */}
      <div className="flex flex-1 pt-17.5 ">
        {/* Sidebar */}
        <aside className={`w-64 pt-14 bg-black text-white p-6 flex flex-col
           ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
          <h2 className="text-lg font-semibold pt-3 mb-4">Filter by Category</h2>

          {/* Search with AI */}
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Search with AI"
              className="bg-transparent text-sm outline-none flex-1"
            />
            <FaSearch className="text-gray-400" />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center gap-2"
              onChange ={toggleCategory}  >
              

                <input type="checkbox" className="accent-purple-500" />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
         {filterCourses?.map((course,index )=>{
       <Card key={index} thumbnail={course.thumbnail} title={course.title}
       category={course.category} price={course.price} id={course._id} />
         })}
          <h1 className="text-2xl font-bold mb-6">All Courses</h1>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold">{course.price}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar /> <span>{course.rating}</span>
                    </div>
                  </div>
                  {course.tag && (
                    <span className="mt-2 inline-block text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {course.tag}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCourse;
