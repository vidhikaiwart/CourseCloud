import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App.jsx'
import  axios  from 'axios'
import { useDispatch , useSelector} from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice.js'


const getCreatorCourses = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.user);
  return (
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
  )
}

export default getCreatorCourses
