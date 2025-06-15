import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <ul className="text-3xl font-medium w-full  *:flex *:items-center *:justify-between *:px-20 *:py-10 *:border-b-[0.5px] *:border-gray-600">
        <li className="uppercase text-lg">Quick Links</li>
        <NavLink to={"/notes"}>
          <p>Notes</p>
          <MdArrowOutward />
        </NavLink>
        <NavLink to={"/pyq"}>
          <p>PYQ</p>
          <MdArrowOutward />
        </NavLink>
        <NavLink to={"/about"}>
          <p>About</p>
          <MdArrowOutward />
        </NavLink>
        <NavLink to={"/upload"}>
          <p>Add Notes</p>
          <MdArrowOutward />
        </NavLink>
      </ul>
      <div className=" flex sm:flex-col sm:items-start md:flex-row md:justify-around py-20 px-10 gap-10 *:w-lg ">
        <p className="text-5xl font-semibold">8OG's</p>
        <p className="text-xl">
          Empowering students with quality study material and resources.
        </p>
      </div>
      <div className="h-screen w-full relative font-light flex items-end justify-center py-10 ">
        <div className="absolute w-full top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3.5rem] md:text-[6rem] lg:text-[8rem] flex flex-col items-center text-center ">
          <p>Have </p>
          <i className="mt-[-2rem]">an idea?</i>
          <p className="border-2 px-[2rem] lg:px-[4rem] rounded-full uppercase h-20 md:h-40 flex items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
            Tell us
          </p>
        </div>
        <div className="uppercase cursor-pointer">
          <p>privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

/*
<marquee direction="left" loop="true" scrollamount="5" classname="flex items-center justify-around">
        <li>
          <p>Notes</p>
          <MdArrowOutward />
        </li>
        <li>
          <p>Notes</p>
          <MdArrowOutward />
        </li>
        <li>
          <p>Notes</p>
          <MdArrowOutward />
        </li>
    </marquee>
*/


/*
<div className="flex sm:flex-col sm:items-start md:flex-row md:justify-around py-12 px-10 gap-10 *:w-xs  bg-amber-300">
      <div className=" md:w-2xs flex flex-col gap-3 ">
        <p className="text-4xl font-semibold">8OG's</p>
        <p className="">
          Empowering students with quality study material and resources.
        </p>
      </div>
      <div className="flex flex-col lg:items-center">
        <ul className="flex flex-col gap-1 text-md">
          <li className="text-xl font-semibold mb-2">Quick Links</li>
          <li className="flex items-center uppercase gap-2 cursor-pointer">Notes <MdArrowOutward /></li>
          <li className="flex items-center uppercase gap-2 cursor-pointer">PYQ <MdArrowOutward /></li>
          <li className="flex items-center uppercase gap-2 cursor-pointer">About <MdArrowOutward /></li>
          <li className="flex items-center uppercase gap-2 cursor-pointer">add notes <MdArrowOutward /></li>
        </ul>
      </div>
      <div>
        <p>For Getting early Access</p>
        <input type="text" name="email" id="email" />
      </div>
    </div>

*/
