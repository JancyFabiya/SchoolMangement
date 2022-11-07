import React from "react";
import lognImg from "../images/login.webp";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerUserAction } from "../redux/slices/userSlices";

//Form schema
const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//Register
const Register = () => {
  //dispath
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      //dispath the action
      dispatch(registerUserAction(userData));
      console.log("data", userData);
    },
    validationSchema: formSchema,
  });

  //select state from store
  const storeData = useSelector((store) => store?.users);
  console.log("store", storeData);
  const { loading, appErr, serverErr, registered } = storeData;

  //redirect
  if (registered) {
    navigate("/login");
  }

  console.log(appErr, serverErr);
  return (
    <div className="relative w-full h-screen bg-zinc-900/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay"
        src={lognImg}
        alt=""
      />
      {/* </div> */}
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="max-w-[400px] w-full mx-auto bg-white p-8"
        >
          <h2 className="text-4xl font-bold text-center py-4">
            SIGN UP
            {/* display error message*/}
            {appErr || serverErr ? (
              <div className="text-red-400 relative">
                {serverErr} {appErr}
              </div>
            ) : null}
          </h2>
          <div className="flex flex-col mb-4">
            <label className="text-black relative">Name</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="name"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
          </div>
          {/* Err msg*/}
          <div className="text-red-400 mb-2 relative">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="flex flex-col">
            <label className="text-black relative">Email</label>
            <input
              className="border relative bg-gray-100 p-2 mb-3"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
          </div>
          {/* Err msg*/}
          <div className="text-red-400 mb-2 text-relative">
            {formik.touched.email && formik.errors.email}
          </div>
          <div className="flex flex-col">
            <label className="text-black relative">Password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
          </div>
          {/* Err msg*/}
          <div className="text-red-400 mb-2 text-relative">
            {formik.touched.password && formik.errors.password}
          </div>

          {/* Check for loading */}
          {loading ? (
            <button
              disabled
              className="w-full py-3 mt-8 bg bg-indigo-600 hover:bg-indigo-500 text-white relative"
            >
              {" "}
              loading please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 mt-8 bg bg-indigo-600 hover:bg-indigo-500 text-white relative"
            >
              Sign Up
            </button>
          )}
         
        </form>
      </div>
    </div>
  );
};

export default Register;
