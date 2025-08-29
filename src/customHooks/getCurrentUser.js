
import { useEffect } from 'react';
import { serverUrl } from '../App.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;

// import React from 'react'
// import { useEffect } from 'react';
// import { serverUrl } from '../App.jsx';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice.js';



// const getCurrentUser = () => {

//     const dispatch = useDispatch();

//  useEffect(() => {
//    const fetchUser = async () => {
//         try {
//           const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`,
//            // const result = await axios.get(serverUrl + "/api/user/getcurrentuser",
//              {withCredentials: true})
//              dispatch(setUserData(result.data))
//         }
//         catch(error){
//         console.error('Error fetching current user:', error);
//        dispatch(setUserData(null))
//     }
//    };
//    fetchUser();
//  }, [dispatch]);
// }

// export default getCurrentUser
