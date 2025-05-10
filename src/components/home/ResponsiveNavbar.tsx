/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

// react icons
import { BsArrowRight } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GrUserAdmin } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/images/logo/logo.png";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { setFilter } from "../../redux/features/filterSlice/filterSlice"; // Import the filter action
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomButton from "../shared/CustomButton";
import { Search, ShoppingCart } from "lucide-react";
// import { MdDashboard } from "react-icons/md";

const ResponsiveNavbar = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const products = useAppSelector((state) => state.cart.products);

  // navigation
  const navigate = useNavigate();

  // dispatch
  const dispatch = useAppDispatch();

  // check if user is logged in
  const user = useAppSelector(useCurrentUser);
  //console.log(user)

  // login
  const handleLogin = () => {
    navigate("/login");
  };

  // logout
  const handleLogout = () => {
    const toastId = toast.loading("Loading...");

    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      dispatch(logout());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(`Something went wrong: ${error}`, { id: toastId });
    }
  };

  // Handle search submission
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchText.trim()) {
      dispatch(setFilter({ search: searchText }));
      navigate("/AllBicycles");
      // Close mobile sidebar if open
      if (mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    }
  };

  // user role leading dashboard
  const toDashboard = user ? `/dashboard/${user?.role}/my-dashboard` : "/";

  // NavLink is active
  const activeLink = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "text-[#000] font-medium transition-all duration-300"
      : "text-[#f8f8f8] hover:text-[#000] transition-all duration-300";
  };

  // reusable menu block
  const termsLinks = (
    <>
      <li className="flex items-center gap-[7px] transition-all duration-300">
        <BsArrowRight className="text-[0.9rem]" />
        <NavLink to="/terms" end className={activeLink}>
          <span className="text-black">Terms</span>
        </NavLink>
      </li>
      <li className=" w-full flex items-center gap-[7px] transition-all duration-300">
        <BsArrowRight className="text-[0.9rem]" />
        <NavLink to="/terms/policies" className={activeLink}>
          <span className="text-black">Privacy Policies</span>
        </NavLink>
      </li>
    </>
  );

  /* desktop nav links */
  const desktopNavLinks = (
    <ul className="items-center gap-[20px] text-[1rem]  md:flex hidden">
      <li className="transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] capitalize">
        <NavLink to="/" className={activeLink}>
          home
        </NavLink>
      </li>

      <li className="  transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] ">
        <NavLink to="/AllBicycles" className={activeLink}>
          All Bicycle
        </NavLink>
      </li>

      <li className="transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] capitalize">
        <NavLink to="/about" className={activeLink}>
          About Us
        </NavLink>
      </li>

      <li className="transition-all duration-500 cursor-pointer dark:text-[#abc2d3]  capitalize flex items-center gap-[3px] group relative">
        Terms & Conditions
        <MdKeyboardArrowDown className="text-[1.5rem] text-black  transition-all duration-500 group-hover:rotate-[180deg]" />
        <article className="p-4  bg-white rounded-md boxShadow w-[200px] absolute top-[40px] z-[-1] dark:bg-slate-800 group-hover:translate-y-0 translate-y-[-20px] group-hover:opacity-100 opacity-0 group-hover:z-30 transition-all duration-300 shadow-lightGrey shadow-lg">
          <div className="grid grid-cols-2 ">
            <ul className="flex flex-col gap-[7px] text-black  w-max ">
              {termsLinks}
            </ul>
          </div>
        </article>
      </li>
    </ul>
  );

  // Mobile search component
  const mobileSearch = (
    <form onSubmit={handleSearch} className="w-full mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search Bicycle..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="text-white absolute end-[5px] cursor-pointer bottom-[5px] bg-green rounded-lg text-sm px-2 py-1"
        >
          Search
        </button>
      </div>
    </form>
  );

  // mobile sidebar
  const mobileSidebarLinks = (
    <ul className="items-start gap-[20px] text-[1rem] flex flex-col">
      {mobileSearch}

      <li className=" transition-all duration-300 capitalize cursor-pointer">
        <NavLink to="/" className={activeLink}>
          Home
        </NavLink>
      </li>

      <li className=" transition-all duration-300 capitalize cursor-pointer">
        <NavLink to="/AllBicycles" className={activeLink}>
          All Bicycle
        </NavLink>
      </li>

      <li className=" transition-all duration-300 capitalize cursor-pointer">
        <NavLink to="/about" className={activeLink}>
          About Us
        </NavLink>
      </li>

      {/* Terms Mobile Dropdown */}
      <li
        onClick={() => setMobileAboutUsOpen(!mobileAboutUsOpen)}
        className=" group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]"
      >
        Terms & Conditions
        <IoIosArrowDown
          className={`${
            mobileAboutUsOpen ? "rotate-[180deg]" : "rotate-0"
          } text-white  transition-all duration-300`}
        />
      </li>

      {mobileAboutUsOpen && (
        <div className="group font-[500] ml-6">
          <ul className="flex flex-col gap-[7px]">{termsLinks}</ul>
          {/* <div className="flex flex-col gap-[10px] mt-4">{featuresList}</div> */}
        </div>
      )}
    </ul>
  );

  // user account login
  const accountDropdown = (
    <div className="flex items-center gap-[15px]">
      {!user ? (
        <CustomButton textName="Login" handleAnything={handleLogin} />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer relative"
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
        >
          <div className="relative">
            <img
              src="https://i.ibb.co/qWzCvWm/avatar.gif"
              alt="avatar"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
          </div>

          {/* <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
            {user.email}
          </h1> */}

          <div
            className={`${
              accountMenuOpen
                ? "translate-y-0 opacity-100 z-[1]"
                : "translate-y-[10px] opacity-0 z-[-1]"
            } bg-white w-max rounded-md absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px] shadow-lg z-50 shadow-purple-600`}
          >
            <span className="px-4 py-1.5 bg-[#e4d4f4] text-[#7828c8] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
              {user.role === "admin" ? (
                <GrUserAdmin className="text-[1.3rem] text-[#7828c8]" />
              ) : (
                <FiUser className="text-[1.3rem] text-[#7828c8]" />
              )}
              {user.role === "admin" ? "Admin" : "Customer"}
            </span>
            <NavLink
              to={toDashboard}
              className={`flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 ${activeLink}`}
            >
              <FiUser />
              View Profile
            </NavLink>
            <NavLink
              to={`/dashboard/${user?.role}/manage-profile`}
              className={`flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50 ${activeLink}`}
            >
              <IoSettingsOutline />
              Settings
            </NavLink>

            {/* logout */}
            <div className="mt-3 border-t border-gray-200 pt-[5px]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50 w-full"
              >
                <TbLogout2 />
                Logout
              </button>
            </div>
          </div>

          <IoIosArrowUp
            className={`${
              accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
            } transition-all duration-300 text-gray-600 sm:block hidden`}
          />
        </div>
      )}
      <NavLink to="/cart">
        <div className="relative">
          <ShoppingCart />
          <span className="text-gdarkGreen absolute -top-2 -right-1 p-[1px] px-[3px] bg-white rounded-full text-xs">{products?.length}</span>
        </div>
      </NavLink>

      <CiMenuFries
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        className="text-[1.8rem] text-[#424242]c cursor-pointer md:hidden flex"
      />
    </div>
  );

  // Desktop search box
  const searchBox = (
    <form
      onSubmit={handleSearch}
      className="w-1/3 text-darkGrey hidden lg:grid"
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
          placeholder="Search Bicycle..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="hidden md:flex text-white absolute end-[5px] cursor-pointer bottom-[5px] bg-green rounded-lg text-sm px-2 py-1"
        >
          Search
        </button>
      </div>
    </form>
  );

  return (
    <nav className=" sticky top-0  z-50  w-full text-offWhite ">
      <div className="bg-gdarkGreen w-full px-6">
        <div className="container mx-auto">
          {/* nav links */}
          {desktopNavLinks}
        </div>
      </div>
      <div className=" bg-green px-2">
        <div className="flex items-center justify-between w-full h-14 container mx-auto">
          <div className="flex space-x-4 ">
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex">
              <li className="transition-all duration-500 cursor-pointer bg-offWhite rounded-full capitalize">
                <NavLink to="/">
                  {/* <MdDashboard className="h-20px w-20px" /> */}
                  {/* logo */}
                  <img
                    src={logo}
                    alt="logo"
                    className="w-[40px] border-2 border-offWhite rounded-full"
                  />
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Search box */}
          {searchBox}

          {/* user account login */}
          {accountDropdown}

          {/* mobile sidebar */}
          <aside
            className={`${
              mobileSidebarOpen
                ? "translate-x-0 opacity-100 z-20"
                : "translate-x-[200px] opacity-0 z-[-1] hidden"
            } md:hidden bg-gradient-to-bl from-gdarkGreen to-green boxShadow p-4 text-center absolute top-[65px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300  shadow-lg`}
          >
            {mobileSidebarLinks}
          </aside>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
