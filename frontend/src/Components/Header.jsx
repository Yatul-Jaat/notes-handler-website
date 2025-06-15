import React, { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoMdAdd } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Header = () => {
  let tl=gsap.timeline()
  useGSAP(()=>{
    tl.from(["#logo","#nav-icon li"],{
      y:-10,
      opacity:0,
      delay:0.4,
      duration:0.6,
      stagger:0.3,
      ease: "power2.out",
    })
  })

  return (
    <div className="relative flex justify-between py-5 sm:px-6 lg:px-10 items-center h-20">
      <NavLink to={"/"} id="logo" className="text-4xl font-semibold">8OG's</NavLink>
      <FaBars className="text-2xl lg:hidden cursor-pointer" />
      <ul id="nav-icon" className="sm:hidden  lg:flex items-center gap-6 text-xl *:uppercase *:cursor-pointer *:px-4 *:py-2 *:rounded-2xl">
        <NavLink className={({isActive})=>(isActive? "bg-gray-200":"bg-white")} to={"/notes"}>notes</NavLink>
        <NavLink className={({isActive})=>(isActive? "bg-gray-200":" bg-white")} to={"/pyq"}>PYQ</NavLink>
        <NavLink className={({isActive})=>(isActive? "bg-gray-200":"bg-white")} to={"/about"}>About</NavLink>
        <NavLink to={"/upload"} className="bg-green-500 px-4 rounded-2xl text-white flex items-center gap-2">
          <IoMdAdd className="text-2xl font-bold" />
          <p>notes</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Header;
