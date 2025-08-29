import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null

    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload
        }
    }

})

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: { value: null },
//   reducers: {
//     setUser: (state, action) => {
//       state.value = action.payload;
//     },
//     clearUser: (state) => {
//       state.value = null;
//     },
//   },
// });

// // export actions
// export const { setUser, clearUser } = userSlice.actions;

// // export reducer (default export)
// export default userSlice.reducer;
