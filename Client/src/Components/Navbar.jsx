import React, { useEffect, useState } from "react";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ProfileDropDown from "./ProfileDropDown";

const Header = ({firstName, lastName}) => {
  const { auth, data, user } = useSelector((state) => state.auth);
  const route= useLocation();

  let Links = [
    { name: "Home", link: "/" },
    { name: "Generate", link: "/aigeneration" },
    { name: "Recipes", link: "/Search" },
    { name: "Add a Recipe", link: "/add-a-recipe" },
  ];

  let [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const anchorOpen = Boolean(anchorEl);
  const id = anchorOpen ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <container className="shadow-md bg-white flex flex-col items-center">
      <div className="w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-8 lg:px-0">
        <div className="flex items-center justify-between bg-white py-4">
          {/* logo section */}
          <div className="cursor-pointer flex items-center">
            <img src={logo} width="100" />
          </div>

          {/* linke items */}
          
          {/* Menu icon */}
          <div
            onClick={() => setOpen(!open)}
            className=" cursor-pointer lg:hidden w-7 h-7"
          >
            {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>

          <ul
            className={`shadow-md lg:shadow-none lg:flex items-center lg:pb-0 pb-6 absolute lg:static bg-White 
            md:z-auto z-[1] left-0 w-full lg:w-auto  px-6 md:px-8 lg:px-0 transition-all duration-500 ease-in ${
              open ? "top-20" : "top-[-490px]"
            }`}
          >
            {auth && (
              <div className="bg-DarkGreen p-2 lg:hidden block">
                <div
                  className="flex w-[10rem] items-center mr-2 cursor-pointer lg:hidden"
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  <div className="mr-2">
                    <Avatar
                      sx={{ width: 56, height: 56, background: "white", color:"black"}}
                    >
                      {user?.firstName?.charAt(0)?.toUpperCase() +
                        " " +
                        user?.lastName?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                  </div>
                  <div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {user?.firstName + " " + user?.lastName}
                      </p>
                    
                    </div>
                    <div>
                      <p className="text-white text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <span className="pr-2">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
                <ProfileDropDown
                  open={anchorOpen}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  id={id}
                />
              </div>
            )}
            {Links.map((link, index) => (
              <li
                className="lg:ml-5 lg:py-0 py-4 text-base font-medium border-b lg:border-0"
                key={index}
              >
                <Link
                  to={link.link}
                  className="text-LightBlack hover:text-DarkGreen duration-500"
                  onClick={()=>setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {!auth && (
              <button className="mt-6 lg:mt-0 rounded border border-DarkGreen bg-DarkGreen lg:ml-5 py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-DarkGreen hover:border-LightGreen">
                Login/Signup
              </button>
            )}
            {auth && (
              <>
                <div
                  className="lg:flex w-[10rem] items-center mr-2 cursor-pointer  hidden ml-10"
                  onClick={handleClick}
                  aria-describedby={id}
                >
                  <div className="mr-2">
                    <Avatar
                      sx={{ width: 36, height: 36, background: "#2E5834" }}
                    >
                      {user?.firstName?.charAt(0)?.toUpperCase() +
                        " " + ""
                      }
                    </Avatar>
                  </div>
                  <div>
                    <div>
                   
                        <p className="text-black text-sm font-medium">
                          {user?.firstName + " " + user?.lastName}
                        </p>
                    </div>
                    <div>
                      <p className="text-black text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <span className="pr-2">
                    <svg
                      width="10"
                      height="8"
                      viewBox="0 0 10 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.99529 7.99023L0.669544 0.497818L9.32104 0.497818L4.99529 7.99023Z"
                        fill="#2E5834"
                      />
                    </svg>
                  </span>
                </div>
                <ProfileDropDown
                  open={anchorOpen}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  id={id}
                />
              </>
            )}
          </ul>
          {/* button */}
        </div>
      </div>
    </container>
  );
};

export default Header;
