import { useRef, useState } from "react";
//import {Link} from 'react-router-dom'
import CoverImage from "../../assets/cover_image.jpeg";
import LoginLogo from "../../assets/login_logo.jpg";
// import { AuthenticationContext } from "../../Components/AuthenticationProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../api/config";
import { jwtDecode } from "jwt-decode";

const VerifyOTP = () => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input
    const newCodes = [...codes];
    newCodes[index] = value.slice(-1); // Only take the last character
    setCodes(newCodes);

    // Focus on the next input field if not the last one
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move focus to the previous input field if backspace is pressed in an empty field
    if (e.key === "Backspace" && codes[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `/otps/verifyOTP?email=${email}&otp=${codes?.join("")}`
      );
      const data = response.data;
      const token = data?.token;
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      const userId = decodedToken?.userId;
      navigate(`/reset-password?userId=${userId}`);
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
      <form onSubmit={handleVerifyOTP}>
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
                  Email Verification Code
                </h3>

                <p className="text-base mb-2 ">
                  {" "}
                  Enter the code we just sent on your email
                </p>
              </div>

              <div className="w-full flex">
                {codes.map((code, index) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    type="text"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    style={{
                      width: "4.2rem",
                      height: "3.5rem",
                      margin: "0.5rem",
                      textAlign: "center",
                      border: "1px solid black",
                      borderRadius: "0.25rem",
                      fontSize: "1.5rem",
                    }}
                  />
                ))}
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#2E5834] rounded-md p-4 text-center justify-center cursor-pointer hover:bg-black hover:text-white"
                >
                  Verify
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-[#060606] ">
                <Link to="/login">
                  <span className="font-semibold underline underline-offset-2 cursor-pointer  hover:text-white">
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

export default VerifyOTP;
