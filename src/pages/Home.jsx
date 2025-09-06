import React from "react";
import Nav from "../Component/Nav.jsx";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../Component/Logos.jsx";
import ExploreCourses from "../Component/ExploreCourses.jsx";
import CardPage from "../Component/CardPage.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src={home}
          className="object-cover md:object-fill w-full lg:h-full h-[50vh]"
          alt="hero"
        />

        {/* Hero Text */}
        <span className="absolute top-[15%] lg:top-[10%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px]">
          Grow Your Skills to Advance
        </span>
        <span className="absolute top-[20%] lg:top-[18%] w-full flex items-center justify-center text-white font-bold text-[20px] md:text-[40px] lg:text-[70px]">
          Your Career Path
        </span>

        {/* CTA Buttons */}
        <div className="absolute lg:top-[30%] top-[75%]  md:top-[80px]  w-full flex items-center justify-center gap-4 flex-wrap">
          {/* View All Courses */}
          <button
            onClick={() => navigate("/allcourses")}
            className="flex items-center gap-2 px-6 py-3 border-2 border-black lg:border-white rounded-xl text-lg font-medium transition-all duration-300
                       bg-white text-black lg:bg-transparent lg:text-white
                       hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Courses
            <SiViaplay className="w-6 h-6 lg:fill-white fill-black" />
          </button>

          {/* Search with AI */}
          <button
            onClick={() => navigate("/ai-search")} // 👈 make a route for AI search
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300
                       bg-black text-white lg:bg-white lg:text-black
                       hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Search With AI
            <img
              src={ai}
              alt="ai logo"
              className="hidden lg:block w-7 h-7 rounded-full"
            />
            <img
              src={ai1}
              alt="ai search"
              className="block lg:hidden w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Sections */}
      <Logos />
      <ExploreCourses />
      <CardPage />
    </div>
  );
};

export default Home;
