import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:ms-20 xl:mx-32 ">
      <img src={assets.logo} alt="" className=" w-32 sm:w-44 " />
      <button className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">
        Login
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
