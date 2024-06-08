import React, { useState } from 'react';
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.png'
import { FaSearch } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { PiUserCircleLight } from "react-icons/pi";





const Header = () => {
    let Links =[
        {name:"Recipes",link:"/Search"},
        {name:"Generate",link:"/"},
        {name:"Contact",link:"/"},
      ];
      let [open, setOpen] =useState(false);

    return (
        <container className='shadow-md bg-white flex flex-col items-center'>
        <div className='w-full lg:max-w-[1240px] lg:mx-auto px-6 md:px-8 lg:px-0'>
           <div className='flex items-center justify-between bg-white py-4'>
            {/* logo section */}
            <div className="cursor-pointer flex items-center gap-1">
                <img src={logo} width="100px"/>
            </div>
  
            {/* linke items */}
            <div className="flex border rounded-full items-center flex-row py-2 px-3.5 border-LightBlack ml-0 lg:ml-5">
                    <input type='text' className='min-w-[80%] md:min-w-[300px] outline-0 text-LightBlack text-base' placeholder='Search'/>
                    <FaSearch className='cursor-pointer'/>

                </div>
                {/* Menu icon */}
                <div onClick={()=>setOpen(!open)} className=' cursor-pointer lg:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon/> : <Bars3BottomRightIcon />
                }
            </div>

            <ul className={`shadow-md lg:shadow-none lg:flex lg:items-center lg:pb-0 absolute lg:static bg-White md:z-auto z-[1] left-0 w-full lg:w-auto  px-6 md:px-8 lg:px-0 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                {
                    Links.map((link) => (
                    <li className='lg:ml-5 lg:py-0 py-4 text-base font-medium border-b lg:border-0'>
                        <a href={link.link} className='text-LightBlack hover:text-DarkGreen duration-500'>{link.name}</a>
                    </li>))

                    
                }
                <li className='lg:hidden py-4 text-base font-medium border-b'>
                    <a href='#' className='text-LightBlack hover:text-DarkGreen duration-500'>Favorites</a>
                </li>
                <li className='lg:hidden py-4 text-base font-medium border-b'>
                    <a href='#' className='text-LightBlack hover:text-DarkGreen duration-500'>Profile</a>
                </li>
                <li className='lg:hidden py-4 text-base font-medium'>
                    <a href='#' className='text-LightBlack hover:text-DarkGreen duration-500'>Signout</a>
                </li>
                <CiBookmark className='hidden lg:block cursor-pointer w-7 h-7 lg:ml-5' />
                <PiUserCircleLight className='hidden lg:block cursor-pointer w-8 h-8 lg:ml-2' />


                
            </ul>
            {/* button */}
           </div>
        </div>
        </container>
        
    );
};

export default Header;