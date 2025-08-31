import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className="relative p-6 space-y-6 bg-gray-100 min-h-screen">

      {/* Back Button */}
      <FaArrowAltCircleLeft
        className="absolute top-6 left-6 w-6 h-6 text-black cursor-pointer"
        onClick={() => navigate("/")}
      />

     {/* Profile Header */}
<div className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
  {/* Left Section: Profile */}
  <div className="flex items-center gap-4">
    <img
      src={userData?.photoUrl || "NO IMAGE UPLOADED"}
      alt="Profile"
      className="w-16 h-16 rounded-full object-cover border"
    />
    <div>
      <h2 className="text-lg font-semibold">
        Welcome, {userData?.name || "Educator"} 👋
      </h2>
      <p className="text-sm text-gray-600">
        Total Earning : ₹{userData?.earnings || 0}
      </p>
      <p className="text-sm text-gray-500">
        {userData?.description || "Full Stack Developer"}
      </p>
    </div>
  </div>

  {/* Right Section: Button */}
  <button
    className="mt-4 sm:mt-0 bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800"
    onClick={() => navigate("/Courses")}
  >
    Create Courses
  </button>
</div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Course Progress */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Course Progress (Lectures)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "Complete H...", lectures: 6, students: 5 },
                { name: "Complete J...", lectures: 2, students: 2 },
                { name: "Complete B...", lectures: 2, students: 1 },
                { name: "Ultimate B...", lectures: 3, students: 1 },
                { name: "AI POWERED...", lectures: 1, students: 1 },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="lectures" fill="#000000" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Enrollment */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Student Enrollment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { name: "Complete H...", lectures: 6, students: 5 },
                { name: "Complete J...", lectures: 2, students: 2 },
                { name: "Complete B...", lectures: 2, students: 1 },
                { name: "Ultimate B...", lectures: 3, students: 1 },
                { name: "AI POWERED...", lectures: 1, students: 1 },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#000000" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
