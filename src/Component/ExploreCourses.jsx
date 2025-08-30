import React from "react";
import { TbDeviceImacCode } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa"; // Ethical hacking (better than FaHackerrank)
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";

const ExploreCourses = () => {
  // Course data array (so you don’t repeat code)
  const courses = [
    { icon: <TbDeviceImacCode />, title: "Web Development", bg: "bg-green-100" },
    { icon: <LiaUikit />, title: "UI/UX Designing", bg: "bg-pink-100" },
    { icon: <MdAppShortcut />, title: "App Development", bg: "bg-red-100" },
    { icon: <FaUserSecret />, title: "Ethical Hacking", bg: "bg-purple-100" },
    { icon: <AiFillOpenAI />, title: "AI/ML", bg: "bg-pink-100" },
    { icon: <SiGoogledataproc />, title: "Data Science", bg: "bg-red-100" },
    { icon: <BsClipboardData />, title: "Data Analytics", bg: "bg-pink-100" },
    { icon: <SiOpenaigym />, title: "AI Tools", bg: "bg-green-100" },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        {/* Left Side Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore <br /> Our Courses
          </h2>
          <p className="text-gray-500 mb-6">
           learn new skills online with top educators. Choose from 1000+ courses in web development, AI, data science, and more.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
            Explore Courses <span>➔</span>
          </button>
        </div>

        {/* Right Side Grid */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`${course.bg} rounded-xl p-6 text-center shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-center justify-center mb-3 text-gray-800">
                {React.cloneElement(course.icon, { className: "w-[40px] h-[40px]" })}
              </div>
              <h3 className="font-medium text-gray-800">{course.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCourses;
