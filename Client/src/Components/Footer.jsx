import React from "react";
import { Link } from "react-router-dom";

const sections = [
    {
        title: "Quick Links",
        items: ["Recipes", "Generate", "Add Recipe"],
      } 
];


const Footer = () => {
  return (
    <div className="w-full bg-DarkGreen text-White py-10 lg:pt-10 lg:pb-10">
      

      <div className="flex flex-col max-w-[1240px]  mx-auto justify-center sm:flex-row text-center text-White">
      <p className='text-base'>2024 Recipe Craft. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;