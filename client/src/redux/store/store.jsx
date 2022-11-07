import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/userSlices";
import studentReducer from '../slices/studentSlices'

const store = configureStore({
    reducer: {
      users: usersReducer,
      student: studentReducer,
    },
  });
  
  export default store;