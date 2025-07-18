import { assets } from "../assets/assets.js";
import {useNavigate} from "react-router-dom"
import { useAppContext } from "../Context/AppContext.jsx";

const Navbar = () => {


const {navigate , token} = useAppContext()

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:ms-20 xl:mx-32 ">
      <img onClick={()=> navigate('/')} src={assets.logo} alt="" className=" w-32 sm:w-44 cursor-pointer " />
      <button onClick={()=> navigate('/admin')}  className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
