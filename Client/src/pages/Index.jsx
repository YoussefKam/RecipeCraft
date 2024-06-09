import React, { useState, useEffect} from 'react';
import CoverImage from '../assets/cover_image.jpeg'
import GOOGLE_ICON from '../assets/google-icon-logo.svg'
import logo from "../assets/logo.png";
import '../index.css';
import VisNavbar from "../Components/VisNavbar";
import Footer from "../Components/Footer";
import { PiBowlFoodFill } from "react-icons/pi";
import { PiCookingPotFill } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import Aboutimg from '../assets/about-img.jpg';
import Aboutimg2 from '../assets/about-img2.jpg';
import RecipeItem from '../Components/RecipeItem';
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";


const Index = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://fridge-craft-server.vercel.app/api/recipes');
      const data = await response.json();
      setRecipes(getRandomRecipes(data, 6)); // Select 3 random recipes
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    }
  };

  const getRandomRecipes = (recipes, count) => {
    let shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  return (
    <>  
    <VisNavbar/>
    <div
      id="home"
      className="custombg bgoverlay relative overflow-hidden bg-primary p-[120px] md:p-[130px] lg:p-[160px]"
    >   
      <div className="container">
        <div className=''>
        
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div
              className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
              data-wow-delay=".2s"
            >
              <h1
                className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]"
              >
                Unleash Flavor with AI: Unique Recipes Created for Your Tastes
              </h1>
              <p
                className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]"
              >
                Experience a new way of cooking with our AI-powered recipe generator.
              </p>
              <ul
                className="mb-10 flex flex-wrap items-center justify-center gap-5"
              >
                <Link to="/Register">
                <button className="rounded border bg-white border-White py-3 px-8 text-base font-medium leading-normal text-gray-900Green transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-gray-900Green">
                 Start Now
              </button>
              </Link>
              <Link to="/Login">
                <button className="rounded border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-gray-900Green">
                 Login
              </button>
                </Link>
              </ul>
              <div>
                <p className="mb-4 text-center text-base font-medium text-white">
                  Built with latest technology
                </p>
                <div
                  className="wow fadeInUp flex items-center justify-center gap-4 text-center"
                  data-wow-delay=".3s"
                >
                   <FaNodeJs className='text-4xl text-[#abb9ac]' />
                  

                  <a
                    
                    className="text-white/60 duration-300 ease-in-out hover:text-white"
                    target="_blank"
                  >
                    <svg
                      className="fill-current"
                      width="41"
                      height="26"
                      viewBox="0 0 41 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      
                      <g mask="url(#mask0_2005_10783)">
                        <path
                          d="M20.5214 0.980713C15.1882 0.980713 11.8546 3.64743 10.5214 8.98071C12.5214 6.31399 14.8546 5.31399 17.5214 5.98071C19.043 6.36103 20.1302 7.46495 21.3342 8.68667C23.295 10.6771 25.5642 12.9807 30.5214 12.9807C35.8546 12.9807 39.1882 10.314 40.5214 4.98071C38.5214 7.64743 36.1882 8.64743 33.5214 7.98071C31.9998 7.60039 30.9126 6.49651 29.7086 5.27479C27.7478 3.28431 25.4786 0.980713 20.5214 0.980713ZM10.5214 12.9807C5.18819 12.9807 1.85459 15.6474 0.521393 20.9807C2.52139 18.314 4.85459 17.314 7.52139 17.9807C9.04299 18.361 10.1302 19.465 11.3342 20.6867C13.295 22.6771 15.5642 24.9807 20.5214 24.9807C25.8546 24.9807 29.1882 22.314 30.5214 16.9807C28.5214 19.6474 26.1882 20.6474 23.5214 19.9807C21.9998 19.6004 20.9126 18.4965 19.7086 17.2748C17.7478 15.2843 15.4786 12.9807 10.5214 12.9807Z"
                        />
                      </g>
                    </svg>
                  </a>

                  <a
                   
                    className="text-white/60 duration-300 ease-in-out hover:text-white"
                    target="_blank"
                  >
                    <svg
                      className="fill-current"
                      width="41"
                      height="36"
                      viewBox="0 0 41 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M40.5214 17.9856C40.5214 15.3358 37.203 12.8245 32.1154 11.2673C33.2894 6.08177 32.7678 1.95622 30.4686 0.63539C29.9386 0.325566 29.3186 0.178806 28.6422 0.178806V1.99699C29.017 1.99699 29.3186 2.07037 29.5714 2.20897C30.6802 2.84493 31.1614 5.26645 30.7862 8.38101C30.6966 9.14741 30.5498 9.95457 30.3706 10.7781C28.7726 10.3867 27.0278 10.0851 25.1934 9.88937C24.0926 8.38101 22.951 7.01125 21.8014 5.81273C24.4594 3.34229 26.9542 1.98883 28.6502 1.98883V0.170654C26.4082 0.170654 23.473 1.7687 20.505 4.54081C17.5374 1.78501 14.6022 0.203266 12.3598 0.203266V2.02145C14.0478 2.02145 16.5506 3.36673 19.2086 5.82089C18.0674 7.01941 16.9258 8.38101 15.8414 9.88937C13.9986 10.0851 12.2538 10.3867 10.6558 10.7862C10.4686 9.97089 10.3298 9.18001 10.2318 8.42177C9.84859 5.30721 10.3218 2.88569 11.4222 2.24157C11.667 2.09483 11.985 2.0296 12.3598 2.0296V0.211422C11.675 0.211422 11.0554 0.358178 10.5174 0.668006C8.22619 1.98883 7.71259 6.10626 8.89499 11.2754C3.82339 12.8409 0.521393 15.3439 0.521393 17.9856C0.521393 20.6354 3.8398 23.1466 8.9274 24.7039C7.7534 29.8894 8.27499 34.0149 10.5742 35.3358C11.1042 35.6456 11.7242 35.7923 12.409 35.7923C14.651 35.7923 17.5862 34.1943 20.5542 31.4222C23.5218 34.178 26.457 35.7597 28.699 35.7597C29.3842 35.7597 30.0038 35.613 30.5418 35.3031C32.833 33.9823 33.3466 29.8649 32.1642 24.6957C37.2194 23.1385 40.5214 20.6273 40.5214 17.9856ZM29.9058 12.5473C29.6042 13.5991 29.229 14.6835 28.805 15.7679C28.471 15.1156 28.1202 14.4634 27.737 13.8111C27.3622 13.1588 26.9626 12.5229 26.563 11.9032C27.7206 12.0745 28.8378 12.2864 29.9058 12.5473ZM26.1718 21.2306C25.5358 22.3313 24.8834 23.3749 24.2066 24.3451C22.9918 24.4511 21.7606 24.5082 20.5214 24.5082C19.2902 24.5082 18.059 24.4511 16.8526 24.3533C16.1758 23.3831 15.5154 22.3476 14.8794 21.2551C14.2598 20.187 13.697 19.1026 13.1834 18.01C13.689 16.9175 14.2598 15.8249 14.871 14.7569C15.507 13.6562 16.1594 12.6126 16.8362 11.6423C18.051 11.5363 19.2822 11.4793 20.5214 11.4793C21.7526 11.4793 22.9838 11.5363 24.1902 11.6342C24.867 12.6044 25.5274 13.6399 26.1634 14.7324C26.783 15.8005 27.3458 16.8849 27.8594 17.9774C27.3458 19.07 26.783 20.1625 26.1718 21.2306ZM28.805 20.1707C29.2454 21.2632 29.6206 22.3557 29.9302 23.4157C28.8622 23.6766 27.737 23.8967 26.571 24.0679C26.9706 23.4401 27.3702 22.796 27.7454 22.1356C28.1202 21.4833 28.471 20.8229 28.805 20.1707ZM20.5378 28.8702C19.7794 28.0875 19.021 27.2151 18.271 26.2611C19.005 26.2938 19.755 26.3182 20.5134 26.3182C21.2798 26.3182 22.0378 26.3019 22.7798 26.2611C22.0462 27.2151 21.2878 28.0875 20.5378 28.8702ZM14.4718 24.0679C13.3138 23.8967 12.197 23.6847 11.129 23.4238C11.4306 22.3721 11.8054 21.2877 12.2294 20.2033C12.5638 20.8555 12.9142 21.5078 13.2974 22.1601C13.6806 22.8123 14.0722 23.4483 14.4718 24.0679ZM20.497 7.10093C21.255 7.88365 22.0134 8.75605 22.7634 9.70998C22.0298 9.67737 21.2798 9.65293 20.5214 9.65293C19.755 9.65293 18.9966 9.66922 18.2546 9.70998C18.9886 8.75605 19.747 7.88365 20.497 7.10093ZM14.4634 11.9032C14.0642 12.531 13.6646 13.1751 13.2894 13.8356C12.9142 14.4878 12.5638 15.1401 12.2294 15.7923C11.7894 14.6998 11.4142 13.6073 11.1042 12.5473C12.1726 12.2946 13.2974 12.0745 14.4634 11.9032ZM7.08459 22.1111C4.19859 20.88 2.33139 19.2657 2.33139 17.9856C2.33139 16.7055 4.19859 15.083 7.08459 13.86C7.78579 13.5583 8.55219 13.2893 9.34339 13.0365C9.80779 14.6346 10.4194 16.2979 11.1778 18.0019C10.4278 19.6978 9.82419 21.3529 9.36779 22.9428C8.56059 22.69 7.79419 22.4128 7.08459 22.1111ZM11.4714 33.7622C10.3626 33.1262 9.8814 30.7047 10.2566 27.5901C10.3462 26.8237 10.493 26.0166 10.6722 25.1931C12.2702 25.5844 14.015 25.8861 15.8494 26.0818C16.9502 27.5901 18.0918 28.9599 19.2414 30.1584C16.5834 32.6289 14.0886 33.9823 12.3926 33.9823C12.0258 33.9742 11.7158 33.9008 11.4714 33.7622ZM30.811 27.5494C31.1942 30.6639 30.721 33.0855 29.6206 33.7296C29.3758 33.8763 29.0578 33.9415 28.683 33.9415C26.995 33.9415 24.4922 32.5963 21.8342 30.1421C22.9754 28.9436 24.117 27.582 25.2014 26.0736C27.0442 25.8779 28.789 25.5763 30.387 25.1768C30.5742 26.0003 30.721 26.7911 30.811 27.5494ZM33.9498 22.1111C33.2486 22.4128 32.4822 22.6819 31.6914 22.9346C31.2266 21.3366 30.615 19.6733 29.857 17.9693C30.607 16.2734 31.2102 14.6183 31.667 13.0284C32.4742 13.2811 33.2406 13.5583 33.9582 13.86C36.8442 15.0912 38.7114 16.7055 38.7114 17.9856C38.7034 19.2657 36.8362 20.8881 33.9498 22.1111Z"
                      />
                      <path
                        d="M20.5134 21.7133C22.5714 21.7133 24.2394 20.0451 24.2394 17.9873C24.2394 15.9294 22.5714 14.2612 20.5134 14.2612C18.4558 14.2612 16.7874 15.9294 16.7874 17.9873C16.7874 20.0451 18.4558 21.7133 20.5134 21.7133Z"
                      />
                    </svg>
                  </a>

                  <SiMongodb className='text-4xl text-[#abb9ac]' />


                 
                  <SiExpress className='text-4xl text-[#abb9ac]' />

                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      </div>
    </div>
    {/* <!-- ====== Hero Section End -->

    <!-- ====== Features Section Start --> */}
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px] flex justify-center w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-8 lg:px-0">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[485px] text-center lg:mb-[70px]">
              <h2
                className="mb-3 text-3xl font-bold text-gray-900  sm:text-4xl md:text-[40px] md:leading-[1.2]"
              >
                Main Features
              </h2>
              <p className="text-base text-body-color dark:text-gray-900-6">
              Discover our application’s main features designed to transform your culinary journey.
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".1s">
              <div
                className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-DarkGreen"
              >
                <PiBowlFoodFill className='text-3xl text-white'/>

              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900">
              Create Unique Recipes
              </h4>
              <p className="mb-8 text-body-color dark:text-gray-900-6 lg:mb-9">
              Our advanced AI technology crafts personalized recipes based on your available ingredients.
              </p>
              
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".15s">
              <div
                className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-DarkGreen"
              >
          
                <PiCookingPotFill className='text-3xl text-white'/>
              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 ">
              Cook Like a Pro
              </h4>
              <p className="mb-8 text-body-color dark:text-gray-900-6 lg:mb-9">
              Our detailed, step-by-step cooking instructions guide you through each recipe with ease.
              </p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".2s">
              <div
                className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-DarkGreen"
              >
                <FaSearch className='text-3xl text-white'/>

              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 ">
              Find Exactly What You Need
              </h4>
              <p className="mb-8 text-body-color dark:text-gray-900-6 lg:mb-9">
              Use our advanced search to find recipes that meet specific criteria
              </p>
              
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12" data-wow-delay=".25s">
              <div
                className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-DarkGreen"
              >
                <FaShare className='text-3xl text-white'/>

              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 ">
              Share Your Culinary Creations
              </h4>
              <p className="mb-8 text-body-color dark:text-gray-900-6 lg:mb-9">
              Easily upload and share your own recipes with the community.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- ====== Features Section End -->

    <!-- ====== About Section Start --> */}
    <section
      id="about"
      className=" pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px] flex justify-center w-full lg:mx-auto px-6 md:px-8 lg:px-0 bg-[#f9fafb]"
    >
      <div className="container w-full lg:max-w-[1240px]">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2
                  className="mb-5 text-3xl font-bold leading-tight text-gray-900 sm:text-[40px] sm:leading-[1.2]"
                >
                  Welcome to Your Ultimate Recipe Hub
                </h2>
                <p
                  className="mb-10 text-base leading-relaxed text-body-color dark:text-gray-900-6"
                >
                  At RecipeCraft, we're redefining the way you cook and share recipes. Built with the latest technologies like React and TailwindCSS, our platform is designed to offer a seamless and intuitive user experience. Whether you're a culinary novice or a seasoned chef, our innovative features will enhance your cooking journey.
                  <br />
                  <br />
                  Join us and transform your kitchen into a hub of creativity and inspiration. At RecipeCraft, we believe that cooking should be a fun, interactive, and personalized experience. Dive in and start your culinary adventure today!
                </p>

                <Link to="/Register">
                <button className="rounded border border-DarkGreen bg-DarkGreen py-3 px-8 text-base font-medium  leading-normal text-White transition duration-150 ease-in-out hover:bg-LightGreen hover:text-gray-900Green hover:border-LightGreen">
                  Get Started Today
                </button> {/*Primary Button*/}
                </Link>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className="mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]"
                  >
                    <img
                      src={Aboutimg}
                      alt="about image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className="mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]"
                  >
                    <img
                      src={Aboutimg2}
                      alt="about image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- ====== About Section End -->

    <!-- ====== CTA Section Start --> */}
    <section
      className="relative z-10 overflow-hidden bg-DarkGreen py-20 lg:py-[115px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[600px] text-center">
                <h2
                  className="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]"
                >
                  Try Our AI-Powered Recipe Generation
                </h2>
                <p
                  className="mx-auto mb-6 max-w-[600px] text-base leading-[1.5] text-white"
                >
                  Discover personalized recipes tailored to your kitchen ingredients with our cutting-edge AI technology. Get started now and elevate your cooking experience to new heights!
                </p>
                <Link to="/Register">
                <button className="rounded border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-gray-900Green">
                   Sign Up Now
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              stroke-opacity="0.08"
              stroke-width="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              stroke-opacity="0.04"
              stroke-width="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              stroke-opacity="0.06"
              stroke-width="13"
            />
          </svg>
        </span>
      </div>
    </section>
    {/* <!-- ====== CTA Section End --> */}

<section
      className="relative z-20 overflow-hidden bg-white pb-20 pt-20 dark:bg-dark lg:pb-[120px] lg:pt-[120px] lg:max-w-[1240px] w-full lg:mx-auto px-6 md:px-8 lg:px-0"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[600px] text-center">
    
              <h2
                className="mb-3 text-3xl font-bold leading-[1.2] text-gray-900 dark:text-white sm:text-4xl md:text-[40px]"
              >
                Browse Some of our Recipes
              </h2>
              
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch">
        {recipes.map(recipe => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <div>

      </div>
    </section>

    <div
      className="custombg2 bgoverlay relative overflow-hidden bg-primary p-[80px] md:p-[80px] lg:p-[80px] w-full lg:mx-auto px-6 md:px-8 lg:px-0 flex justify-center"
    >   
      <div className="container lg:max-w-[1240px]">
        <div className=''>
        
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div
              className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
              data-wow-delay=".2s"
            >
              <h1
                className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]"
              >
                Unleash Flavor with AI: Unique Recipes Created for Your Tastes
              </h1>
              <p
                className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white sm:text-lg sm:leading-[1.44]"
              >
                Experience a new way of cooking with our AI-powered recipe generator.
              </p>
              <ul
                className="mb-10 flex flex-wrap items-center justify-center gap-5"
              >
                <Link to="/Register">
                <button className="rounded border bg-white border-White py-3 px-8 text-base font-medium leading-normal text-gray-900Green transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-gray-900Green">
                 Start Now
              </button>
              </Link>
              <Link to="/Login">
                <button className="rounded border border-White py-3 px-8 text-base font-medium leading-normal text-White transition duration-150 ease-in-out hover:border-White hover:bg-White hover:text-gray-900Green">
                 Login
              </button>
                </Link>
              </ul>
              
            </div>
          </div>

          
        </div>
      </div>
      </div>
    </div>
        <Footer />
  </>
  )
}

export default Index