import React from 'react'
import { FaStar } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const Card = ({ thumbnail, title, category, price,  }) => {
  return (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-[320px]">
      {/* Course Image */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Course Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        {/* Category Tag */}
        <span className="inline-block mt-2 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-lg">
          {category}
        </span>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-900 font-medium">₹{price}</p>
          <MdStar className="text-gray-500 text-sm"></MdStar>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-gray-800">{id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
