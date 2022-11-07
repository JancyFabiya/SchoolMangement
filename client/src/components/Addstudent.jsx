import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStudentAction } from "../redux/slices/studentSlices";
import Dropzone from "react-dropzone";
import styled from "styled-components";

//Form schema
const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("address is required"),
  phone: Yup.string().required("Number is required"),
  description: Yup.string().required("About of the student is required"),
  clz: Yup.string().required("Class details is required"),
  image: Yup.string().required("Image is required"),
});

// CSS for Dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: gray;
  transition: border 0.24s ease-in-out;
`;
const Addstudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //select store data
  const student = useSelector((state) => state?.student);
  const { isCreated, loading, appErr, serverErr } = student;

  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  // preview
  const [preview, setPreview] = useState("");
  //formik
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      description: "",
      clz: "",
      image: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        name: values?.name,
        address: values?.address,
        phone: values?.phone,
        description: values?.description,
        clz: values?.clz,
        image: values?.image,
      };
      dispatch(createStudentAction(data));
    },
    validationSchema: formSchema,
  });
//   console.log('addcre',isCreated)
//   if (isCreated) {
//     navigate("/home");
//   }

  let image = formik?.values?.image;
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <section className="min-h-screen  py-0  bg-white overflow-hidden">
      <div className="container px-1 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
            Student Details
          </h2>
          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
              {serverErr} {appErr}
            </p>
          ) : null}
        </div>

        <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 drop-shadow-lg rounded-lg px-10 border border-gray-300 ">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>

                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>

                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    id="address"
                    name="address"
                    type="address"
                    autoComplete="address"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Contact Number
                </label>

                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                    id="phone"
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.phone && formik.errors.phone}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class Details
                </label>

                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.clz}
                    onChange={formik.handleChange("clz")}
                    onBlur={formik.handleBlur("clz")}
                    id="clz"
                    name="clz"
                    type="clz"
                    autoComplete="clz"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.clz && formik.errors.clz}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student Photo
                </label>
                {preview ? (
                  <img
                    src={preview}
                    alt=""
                    onClick={() => {
                      setPreview(null);
                    }}
                  />
                ) : (
                  <Container className="container bg-gray-700">
                    <Dropzone
                      onBlur={formik.handleBlur("image")}
                      accept="image/jpeg, image/png"
                      onDrop={(acceptedFiles) => {
                        formik.setFieldValue("image", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="container">
                          <div
                            {...getRootProps({
                              className: "dropzone",
                              onDrop: (event) => event.stopPropagation(),
                            })}
                          >
                            <input {...getInputProps()} />
                            <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                              Click here to select image
                            </p>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </Container>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  About Student
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full  px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading Please Wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Details
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addstudent;
