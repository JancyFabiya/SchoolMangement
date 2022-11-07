import { createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseURL";


//Create Student action
const resetStud = createAction("student/reset");

//Add student details

export const createStudentAction = createAsyncThunk(
    "student/addDetails",
    async (stud, {rejectWithValue, getState, dispatch }) => {
    console.log('stud',stud);
    //get user action
    const user = getState()?.users;
    const {userAuth} = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth?.token}`,
        },
    };
    try {
        //http call
        console.log('student',stud);
        const formData = new FormData();
        formData.append("name", stud?.name);
        formData.append("address", stud?.address);
        formData.append("phone", stud?.phone);
        formData.append("description", stud?.description);
        formData.append("clz", stud?.clz);
        formData.append("image", stud?.image);
        console.log(formData, stud);
        const { data } = await axios.post(
          `${baseUrl}/api/students`,
          formData,
          config
        );
        // dispatch(resetStud())
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
)


//slice
const studentSlice = createSlice({
    name: "stud",
    initialState: {},
    extraReducers: builder => {
      // Add Student
      builder.addCase(createStudentAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(resetStud,(state,action)=>{
        state.isCreated=true
      });
      builder.addCase(createStudentAction.fulfilled, (state, action) => {
        state.addStudent = action?.payload;
        state.loading = false;
        state.isCreated=false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(createStudentAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

    },
});

export default studentSlice.reducer;