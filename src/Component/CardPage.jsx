import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card' // make sure this import is correct

const CardPage = () => {
  const [popularCourses, setPopularCourse] = useState([])
  const { courseData } = useSelector((state) => state.course)

  useEffect(() => {
    if (courseData && Array.isArray(courseData)) {
      setPopularCourse(courseData.slice(0, 6))
    }
  }, [courseData])

  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h2 className='text-2xl font-bold mb-4'>Our Popular Courses</h2>
      <span className='lg:w-[50%] md-[30px] px-[20px] text-[15px] text-center mt-[30px] md:w-[80%] '>
        Online learning simple and engaging.
        Built with the MERN stack, it offers smart course management, AI tools for creators, and a smooth experience for learners.
      </span>

      <div className='w-[100%] min-h-[100vh] flex items-center justify-center gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] flex-wrap  mb-[50px]'>
        {popularCourses.length > 0 ? (
          popularCourses?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id}
            />
          ))
        ) : (
          <p className='text-gray-500 mt-6'>No courses available</p>
        )}
      </div>
    </div>
  )
}

export default CardPage
