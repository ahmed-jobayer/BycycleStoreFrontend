import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { SlArrowUp } from "react-icons/sl";
import logo from "../../assets/images/logo/logo.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";
import ContactUs from "../modals/ContactUs";
import { useState } from "react";

const Footer = () => {
  // modal open close state
  const [modal2Open, setModal2Open] = useState(false);

  // open modal contact us
  const handleClick = () => {
    setModal2Open(true);
  };

  return (
    <footer className=" w-full  relative lg:h-[10vh]  2xl:h-[20vh] bg-green ">
      <div className="w-full bg-gradient-to-t  from-green to-white px-2 bg-green flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[30px]">
        {/* motto */}
        <h3 className="text-2xl font-semibold font-serif">
          ☘️Safe Journey With Nature🌿
        </h3>

        {/* logo */}
        <img
          src={logo}
          alt="logo"
          className="w-[5rem] border-2  rounded-full bg-white"
        />

        <p className="text-[0.9rem] text-center sm:text-start text-black">
          High level experience in web design and development knowledge,
          producing quality work.
        </p>

        <CustomButton textName="Contact Us" handleAnything={handleClick} />

        {/* Render modal conditionally */}
        <ContactUs modal2Open={modal2Open} setModal2Open={setModal2Open} />

        <div className="flex gap-[15px] text-black mt-4">
          <Link
            to={""}
            className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110 bg-white text-[#424242] shadow-md"
          >
            <CgFacebook />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsTwitter />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsInstagram />
          </Link>
          <Link
            to={""}
            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-[#d8e0e1] hover:scale-110  bg-white text-[#424242] shadow-md"
          >
            <BsLinkedin />
          </Link>
        </div>
      </div>

      <div className="z-30 fixed  bottom-2 right-2 ">
        {/* go to top */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <SlArrowUp className="p-2 rounded-full border border-black cursor-pointer text-[2rem] text-black  hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      {/* <img
        src="https://i.ibb.co/zNk7XT4/Rectangle-97.png"
        alt="background/image"
        className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      />
      <img
        src="https://i.ibb.co/0mp2FwS/Rectangle-95.png"
        alt="background/image"
        className="absolute bottom-0 left-0 right-0 z-10 rounded-t-xl w-full"
      /> */}
    </footer>
  );
};

export default Footer;
