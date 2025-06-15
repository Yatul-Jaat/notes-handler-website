import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import Footer from "../../Components/Footer";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  let yearCards = [
    {
      number: "01",
      year: "First",
      notes: "150",
      image: "",
    },
    {
      number: "02",
      year: "Second",
      notes: "150",
      image: "",
    },
    {
      number: "03",
      year: "Third",
      notes: "150",
      image: "",
    },
    {
      number: "04",
      year: "Fourth",
      notes: "150",
      image: "",
    },
  ];

  //animation part by gsap---------------------------------

  // for the first part of the landing page------------------
  let topText1 = "We are a digital";
  let topText2 = "education";
  let topText3 = "providing agency";

  let topText1ref = useRef();
  let topText2ref = useRef();
  let topText3ref = useRef();

  useGSAP(() => {
    const letters1 = topText1ref.current.querySelectorAll("span");
    const letters2 = topText2ref.current.querySelectorAll("span");
    const letters3 = topText3ref.current.querySelectorAll("span");

    [letters1, letters2, letters3].map((hello) => {
      gsap.from(hello, {
        y: 100,
        stagger: 0.1,
        delay: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
      });
    });
  });

  // for the video section animation-----------------------

  let videoref = useRef();

  useGSAP(() => {
    gsap.from(videoref.current, {
      scaleY: 0.7,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: "power3.out",
    });
  });

  // for the what we do part of the page-------------------------

  let whatwedoref = useRef();
  let whatwePararef = useRef();

  useGSAP(() => {
    gsap.from(whatwePararef.current, {
      y: 100,
      opacity: 0,
      delay: 0.3,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: whatwePararef.current,
        scroll: "body",
        start: "top 95%",
      },
    });
    gsap.from(whatwedoref.current, {
      y: 100,
      opacity: 0,
      scale: 0.6,
      delay: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: whatwedoref.current,
        scroll: "body",
        start: "top 95%",
      },
    });
  });

  // now the animation for the study section---------------------------------------------------

  let studyText1ref = useRef();
  let studyText2ref = useRef();
  let studyIngref = useRef();
  let studyCardref = useRef();

  useGSAP(() => {
    [studyText1ref, studyText2ref].map((hello) => {
      gsap.from(hello.current, {
        y: 100,
        delay: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: studyText1ref.current,
          scroll: "body",
          start: "top 90%",
        },
      });
    });

    gsap.from(studyIngref.current, {
      scale: 0.5,
      y: 100,
      x: -40,
      delay: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: studyText1ref.current,
        scroll: "body",
        start: "top 90%",
      },
    });

    let cards = studyCardref.current.querySelectorAll("li");
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      delay: 0.3,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: studyCardref.current,
        scroll: "body",
        start: "top 80%",
      },
    });
  });

  // now the philosophy part of animation-------------------------------------------------

  let ourref = useRef();
  let philosophyref = useRef();
  let ourPararef = useRef();
  let ourImgref = useRef();

  useGSAP(() => {
    gsap.from([ourref.current, philosophyref.current], {
      y: 150,
      delay: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: [ourref.current, philosophyref.current],
        start: "top 80%",
      },
    });
    gsap.from([ourImgref.current, ourPararef.current], {
      y: 200,
      opacity: 0,
      scale: 0.9,
      delay: 0.1,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ourImgref.current,
        start: "top 90%",
      },
    });
  });

  return (
    <>
    <div>
      <div
        id="main-start"
        className="text-[4rem] lg:text-[6rem] text-base/30 px-[4rem] lg:px-[10rem] py-[8rem] "
      >
        <div className="h-30 overflow-hidden">
          <p ref={topText1ref}>
            {topText1.split("").map((char, index) => (
              <span key={index} style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center font-light gap-5 overflow-hidden ">
          <img src="/education.gif" className="h-25 w-40 rounded-full" />
          <i ref={topText2ref}>
            {topText2.split("").map((char, index) => (
              <span key={index} style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </i>
        </div>
        <div className="h-30 overflow-hidden">
          <p ref={topText3ref}>
            {topText3.split("").map((char, index) => (
              <span key={index} style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>
      </div>
      {/*------------------------------------------------------------*/}
      <div className="h-screen flex justify-center ">
        <img
          ref={videoref}
          src="/main.gif"
          alt="main"
          className="h-full w-full cover"
        />
      </div>
      {/*---------------------------------------------------------------------*/}
      <div className="flex flex-col lg:flex-row justify-around items-center gap-10 h-screen w-full">
        <img
          src="/wedo.gif"
          alt="we do"
          className=" h-[15rem] lg:h-[25rem] rounded-full"
        />
        <div className="w-xl flex flex-col gap-[2rem] items-center text-xl">
          <p ref={whatwePararef}>
            We provide a simple and easy-to-use platform where students can
            access study notes on various subjects. Our goal is to make learning
            more organized by helping you find the right material, understand
            topics better, and connect with others for discussion. Whether
            you're revising for exams or exploring new topics, we offer
            everything you need in one place.
          </p>
          <div
            ref={whatwedoref}
            className="px-[6rem] py-[3rem] lg:px-[8rem] lg:py-[4rem] border-2 rounded-full lg:self-start overflow-hidden cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
          >
            What we do
          </div>
        </div>
      </div>
      {/*----------------------------------------------------------------------*/}
      <div className="bg-black rounded-t-[5rem] overflow-x-hidden">
        <div className=" py-[8rem] px-[4rem] ">
          <div className="flex flex-col text-[4rem] lg:text-[6rem] px-[4rem] lg:px-[8rem] text-base/30 mb-10 text-white">
            <div className="px-[4rem] overflow-hidden">
              <p ref={studyText1ref}>Study</p>
            </div>
            <div className="flex items-center gap-4 font-light overflow-hidden">
              <img
                ref={studyIngref}
                src="/study.gif"
                alt="img"
                className="h-30 rounded-full"
              />
              <i ref={studyText2ref}>resources</i>
            </div>
          </div>
          <ul
            ref={studyCardref}
            className="flex pt-[2rem] gap-x-8 gap-y-10 justify-around  flex-wrap"
          >
            {yearCards.map((card) => {
              return (
                <li className=" h-[25rem] w-[20rem] p-10 bg-white rounded-[2rem] relative flex flex-col items-center ">
                  <p className="text-xl absolute top-5 left-5 bg-pink-300 h-12 w-12 flex items-center justify-center rounded-full">
                    {card.number}
                  </p>
                  <p className="mt-15 text-[5rem] text-base/15">
                    {card.year} <i className="text-[4rem]">year</i>
                  </p>
                  <p className="border-1 px-5 py-2 ml-5 rounded-full mt-3 self-start">
                    {card.notes}+ notes
                  </p>
                  <NavLink to={"/notes"} className="text-xl absolute bottom-5 right-5 px-6 py-3 rounded-full text-white bg-black flex items-center gap-2">
                    explore <MdArrowOutward />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/*----------------------------------------------------------------------*/}
        <div className=" bg-white flex flex-col w-full px-[6rem] lg:px-[10rem] pb-[4rem] pt-[8rem] rounded-t-[5rem] z-10">
          <div className=" text-[6rem] text-base/25 lg:text-[8rem] lg:text-base/35 mb-[4rem] ">
            <div className="overflow-hidden">
              <p ref={ourref}>Our</p>
            </div>
            <div className="overflow-hidden">
              <p ref={philosophyref} className="font-light italic">
                philosophy
              </p>
            </div>
          </div>
          <div className="flex justify-around mt-10 items-center">
            <div className="overflow-hidden">
              <img
                ref={ourImgref}
                src="/balls.gif"
                alt="img"
                className="hidden lg:flex h-[20rem] w-[20rem] cover mix-blend-multiply"
              />
            </div>
            <div className="overflow-hidden">
              <p ref={ourPararef} className="w-xl text-xl">
                Our website is made to help students easily find and study notes
                online. You can browse through, pick the topic you want, read
                the notes to understand the concepts. We aim to make learning
                simple, clear, and helpful for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Landing;