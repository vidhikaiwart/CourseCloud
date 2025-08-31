import React from "react";
import { Edit } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img from "../../assets/empty.jpg";
import getCreatorCourses from "../../customHooks/getCreatorCourse";
import { use } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCreatorCourseData } from "../../redux/courseSlice";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
 useEffect(() => {

  const creatorCourses = async () => {
    try {
      const response = await axios.get(serverUrl + "/api/course/getcreator",
         { withCredentials: true });
        console.log("Creator Course Data:", response.data);
        dispatch(setCreatorCourseData(response.data));

    } catch (error) {
      console.log("Error fetching creator course data:", error);
    }
  };

  creatorCourses();
    },[userData])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-5xl">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Left side (arrow + title) */}
          <div className="flex items-center gap-3 text-xl sm:text-2xl font-semibold text-gray-800">
            <FaArrowLeftLong
              className="w-6 h-6 text-black cursor-pointer"
              onClick={() => navigate("/dashboard")}
            />
            All Created Courses
          </div>

          {/* Right side (button) */}
          <button
            className="bg-black text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800 transition text-sm sm:text-base"
            onClick={() => navigate("/CreateCourses")}
          >
            Create Course
          </button>
        </div>

        {/* Table Wrapper for Responsiveness */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-semibold">Course</th>
                <th className="p-4 text-left font-semibold">Price</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-4">
                    {course?.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt="Course Thumbnail"
                        className="w-20 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <img
                        src={img}
                        alt="Default Thumbnail"
                        className="w-20 h-14 rounded-lg object-cover"
                      />
                    )}
                    <span className="font-medium">
                      {course?.title || "Untitled Course"}
                    </span>
                  </td>

                  <td className="p-4 font-medium">
                    {course?.price ? `₹${course.price}` : "NA"}
                  </td>

                  <td className="p-4">
                    {course?.status ? (
                      <span className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-green-100 text-green-600 font-medium">
                        Published
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-red-100 text-red-600 font-medium">
                        Draft
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <Edit className="w-5 h-5 text-gray-600" 
                      onClick={() => navigate(`/editcourse/${course.id}`)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-gray-600 text-center text-sm mt-6">
          List of your recent courses
        </p>
      </div>
    </div>
  );
};

export default Courses;
