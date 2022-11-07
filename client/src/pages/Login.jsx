import React from "react";
import lognImg from "../images/login.webp";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginUserAction } from "../redux/slices/userSlices";

//Form schema
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  //redirect
  const store = useSelector((state) => state?.users);
  console.log("loginstore", store);
  const { userAuth, loading, serverErr, appErr } = store;
  if (userAuth) {
    navigate("/home");
  }
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
          <h2 className="text-4xl font-bold text-center py-4">SIGN IN</h2>
          {/* display err */}
          {serverErr || appErr ? (
            <h2 className="text-red-500">
              {serverErr} - {appErr}
            </h2>
          ) : null}

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
          {/* Err message */}
          <div className="text-red-400 mb-2">
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
          {/* Err msg */}
          <div className="text-red-400 mb-2">
            {formik.touched.password && formik.errors.password}
          </div>
          {/* Login btn */}
          {loading ? (
            <button className="w-full py-3 mt-8 bg bg-indigo-600 hover:bg-indigo-500 text-white relative">
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 mt-8 bg bg-indigo-600 hover:bg-indigo-500 text-white relative"
            >
              Sign In
            </button>
          )}

         
        </form>
      </div>
    </div>
  );
};

export default Login;
