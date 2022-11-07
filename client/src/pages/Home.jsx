import React, { useState, useEffect } from "react";
import { FaRegUser, FaSignOutAlt, FaUserGraduate } from "react-icons/fa";
import { BsArrowLeftShort, BsSearch, BsGlobe } from "react-icons/bs";
import Logo from "../images/logoo.jpg";
import { logoutAction } from "../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import Addstudent from "../components/Addstudent";

function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [userButton, setUserButton] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="flex ">
      <div
        className={`bg-dark-purple border border-dark-purple h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute
           -right-3 top-9 border border-dark-purple cursor-pointer ${
             !open && "rotate-180"
           }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <img
            src={Logo}
            alt=""
            className={`text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white text-lg block float-left cursor-pointer ${
              open && "mr-2"
            } `}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-white focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          <li
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2
                    "
          >
            <span className="text-2xl block float-left">
              <FaUserGraduate />
            </span>
            <span
              className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              onClick={() => {
                setAddStudent(!addStudent);
                setUserButton(false);
              }}
            >
              Add Student Details
            </span>
          </li>

          <li
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md 
                    "
          >
            <span className="text-2xl block float-left">
              <FaSignOutAlt />
            </span>
            <span
              className={`text-base font-medium flex-1 ${!open && "hidden"}`}
              onClick={() => dispatch(logoutAction())}
            >
              Logout
            </span>
          </li>
        </ul>
      </div>

      {/* table */}

      <div className="p-7 w-screen">
        {addStudent == true ? (
          <>
            <Addstudent />
          </>
        ) : (
          ""
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Home;
