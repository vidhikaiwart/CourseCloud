// import { configureStore } from "@reduxjs/toolkit";
// import { userSlice } from "./userSlice.js";


// export const store = configureStore({
//     reducer:{
//         user:userSlice
//     }
// })
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
