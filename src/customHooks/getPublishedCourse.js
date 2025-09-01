import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setCourseData } from '../redux/courseSlice.js'

const getPublishedCourses = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseData = async () => {
        try{
          const response = await axios.get(`${serverUrl}/api/courses/getpublished`, { withCredentials: true });
          dispatch(setCourseData(response.data));
          console.log(response.data)
        } catch (error) {
          console.log("Error fetching published courses:", error);
        }
    };
    getCourseData();
  }, [])

}

export default getPublishedCourses;
