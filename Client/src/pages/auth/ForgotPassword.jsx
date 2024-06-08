import { useState } from "react";
//import {Link} from 'react-router-dom'
import CoverImage from "../../assets/cover_image.jpeg";
import LoginLogo from "../../assets/login_logo.jpg";
// import { AuthenticationContext } from "../../Components/AuthenticationProvider";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../api/config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/otps/sendOTP?email=${email}`);
      const data = response.data;
      navigate(`/verify-otp?email=${email}`);
      console.log("data", data);
    } catch (e) {
      toast.error(e?.response?.data?.error, {
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSendOTP}>
        <div className="w-full h-screen  flex items-start">
          <div className="relative w-1/2 h-full flex flex-col lg:block md:block hidden">
            <img src={CoverImage} className="w-full h-full object-cover" />
          </div>

          <div className="lg:w-1/2 md:w-1/2 w-full h-full bg-[#F7F7F7] flex flex-col p-20 justify-between items-center">
            <div className="w-151 h-90 mr-auto   ">
            </div>

            <div className="w-full flex flex-col max-w-[500px] ">
              <div className="w-full flex flex-col mb-2">
              <img src={LoginLogo} width="100px" className="mb-16"/>
                <h3 className="text-3xl font-semibold mb-2 ">
                  Forgot Password?
                </h3>

                <p className="text-base mb-2 ">
                  {" "}
                  No worries, we’ll send you reset instructions
                </p>
              </div>

              <div className="w-full flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none 
                    ${emailError && "border-b-2 border-red-600"}
                  `}
                />
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-black hover:text-white"
                >
                  {loading ? (
                    <CircularProgress color="success" />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-[#060606] ">
                <Link to="/login">
                  <span className="font-semibold underline underline-offset-2 cursor-pointer  hover:text-DarkGreen">
                    Go back to Login
                  </span>{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
