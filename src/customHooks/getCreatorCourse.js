import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App.jsx'
import  axios  from 'axios'
import { useDispatch , useSelector} from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice.js'


const useCreatorCourses = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector((state) => state.user);

    useEffect(() => {

  const creatorCourse = async () => {
    try {
      const userId = userData._id;
      console.log("Fetching courses for creator:", userId);
         const courses = await Course.find({ creator: userId });
      const response = await axios.get(
          `${serverUrl}/api/course/getcreator`,
         { withCredentials: true });
        console.log("Creator Course Data:", response.data);
        dispatch(setCreatorCourseData(response.data));

    } catch (error) {
      console.log("Error fetching creator course data:", error);
    }
  };

  creatorCourse();
    },[userData])
  
}

export default useCreatorCourses
