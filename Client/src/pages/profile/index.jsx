// import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Camera from "../../assets/camera.svg";
// import avatar from "../../assets/user-avatar.svg";
import axiosInstance from "../../api/config";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../Components/Navbar";
import { getCurrentUser } from "../../api/services/auth.service";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  //fetch the user details from the redux store
  const { data, user, profileLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // const [user, setUser] = useState();

  //variables for updating formData
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  //method for capturing form values
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getProfileDetails = async () => {
    try {
      const response = await axiosInstance.get(`/users/${data?.data?._id}`);
      const profileData = response?.data?.data;
      setUserData(profileData);
      setFormData({
        firstName: profileData?.firstName,
        lastName: profileData?.lastName,
        userName: profileData?.userName,
        email: profileData?.email,
        password: "",
      });
    } catch (e) {
      console.log(e.response.data.error);
    }
  };
  //methodd for updating profile
  const handleProfileUpdate = async (e) => {
    e?.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/users/profile/${user?._id}`,
        formData
      );
      const responseData = response.data;
      toast.success("Profile Update Successfully", {
        autoClose: 1500,
        position: "top-right",
      });
      dispatch(getCurrentUser(data?.data?._id));

      // getProfileDetails();
      return responseData;
    } catch (e) {
      console.log("error", e);
      toast.error(e?.response?.data?.error, {
        autoClose: 1500,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, [data?.data?._id]);

  return (
    <>
      <div className="h-20  shadow-sticky bg-white backdrop-blur-sm top-0 w-full">
        <Header firstName={userData?.firstName} lastName={userData?.lastName} />
      </div>

      {profileLoading ? (
        <div className="flex justify-center  items-center h-screen">
          <CircularProgress color="success" size={40} />
        </div>
      ) : (
        <div className="w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-8 lg:px-0">
          <div className="mt-16">
            <ToastContainer />
            <p className="lg:text-2xl 2xl:text-[36px] text-xl font-semibold py-6 border-b-4 border-borderColor">
              Edit Your Profile
            </p>
            <form
              className="flex flex-wrap mt-10"
              onSubmit={handleProfileUpdate}
            >
              <div className="lg:mt-10 -mt-5 ">
                <p className="lg:text-[2rem] text-xl lg:font-normal font-semibold">
                  Profile Information
                </p>
                <div className="flex flex-wrap w-1/2 lg:w-full md:w-full">
                  <div className="flex flex-col xl:pt-5 lg:mt-2 mt-5">
                    <label className="mb-2 lg:font-normal font-semibold lg:text-[1.4rem] text-[1rem]">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData?.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
               lg:w-[28rem] min-w-[18rem]  p-3 rounded-lg text-base lg:font-normal mr-2"
                    />
                  </div>

                  <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5 lg:ml-10">
                    <label className="mb-2 lg:font-normal  font-semibold lg:text-[1.4rem] text-[1rem]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData?.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
                lg:w-[28rem]    min-w-[18rem]  p-3 rounded-lg text-base lg:font-normal"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-1/2 lg:w-full md:w-full">
                  <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5">
                    <label className="mb-2 lg:font-normal font-semibold lg:text-[1.4rem] text-[1rem]">
                      User Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      value={formData?.userName}
                      onChange={handleInputChange}
                      placeholder="Enter User Name"
                      className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
            lg:w-[28rem]   min-w-[18rem]  p-3 rounded-lg text-base lg:font-normal mr-2"
                    />
                  </div>
                  <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5 lg:ml-10">
                    <label className="mb-2 lg:font-normal font-semibold lg:text-[1.4rem] text-[1rem]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                      className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
                lg:w-[28rem]   min-w-[18rem]  p-3 rounded-lg text-base lg:font-normal"
                    />
                  </div>
                </div>
                <div className="flex flex-col  xl:pt-5 lg:mt-2 mt-5">
                  <label className="mb-2 lg:font-normal font-semibold lg:text-[1.4rem] text-[1rem]">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="outline-none border-2 bg-secondary border-secondary50 2xl:w-[500px]
              lg:w-[28rem] w-[18rem]  p-3 rounded-lg text-base lg:font-normal mr-2"
                  />
                  <p className="text-slate-400 mt-2">
                    Please enter min 6 characters{" "}
                  </p>
                </div>

                <div className="xl:w-80 lg:h-[3rem] block w-[8rem] 2xl:mt-20 lg:mt-10 mb-10 mt-5">
                  <button
                    type="submit"
                    className={`   ${"bg-DarkGreen"} lg:w-52  rounded-3xl  text-white text-lg px-5 py-3 w-max`}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
