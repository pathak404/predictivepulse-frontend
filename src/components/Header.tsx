import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


const Header = () => {
  return (
    <header className="sticky -top-2 md:-top-3 backdrop-blur-sm z-20 pt-6 pb-4 md:pt-9 md:pb-6 bg-white/70">
      <div className="mx-auto w-11/12 xl:px-3 flex justify-between items-center">
        <div className="lg:w-1/4">
          <Link to={"/"} className="text-gray-800 text-lg font-semibold inline-flex gap-2">
            <img src="/logo.png" alt="logo" className="w-7 relative md:-top-px"/>
            <p className="hidden md:inline-block">PredictivePulse</p>
          </Link>
        </div>
        <div className="lg:w-3/4 flex justify-between items-center">
          <ul className="hidden lg:flex flex-row items-center justify-center lg:gap-10">
            <li>
              <HashLink smooth to={"/#home"} className="font-normal text-inherit transition-colors hover:text-gray-800">Home</HashLink>
            </li>
            <li>
              <HashLink smooth to={"/#features"} className="font-normal text-inherit transition-colors hover:text-gray-800">Features</HashLink>
            </li>
            <li>
              <HashLink smooth to={"/#support"} className="font-normal text-inherit transition-colors hover:text-gray-800">Support</HashLink>
            </li>
          </ul>

          <div>
            <Link to={"/sign-in"} className="mr-5 font-normal text-inherit transition-colors hover:text-gray-800">Sign In</Link>
            <HashLink smooth to={"/#buy"} className="px-4 py-2 md:px-7 md:py-3 bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors duration-300 rounded-3xl text-slate-50">
              Buy Now
            </HashLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
