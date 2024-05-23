import { Link, NavLink, useNavigate } from "react-router-dom"
import { ToastContextType, navItemType } from "../../types"
import { BsCurrencyBitcoin, BsCurrencyExchange, BsBoxArrowLeft } from "react-icons/bs"
import { GoHomeFill } from "react-icons/go"
import { RiStockFill } from "react-icons/ri"
import { AiFillSignal } from "react-icons/ai"
import { RefObject, memo, useContext } from "react"
import { ToastContext } from "../toast/ToastContext"

const Sidebar: React.FC<{isOpen: boolean, sidebarRef: RefObject<HTMLDivElement>}> = ({isOpen, sidebarRef}) => {
  const navigate = useNavigate()
  const { addToast } = useContext(ToastContext) as ToastContextType

  const navItems: navItemType[] = [
    {
      name: "Home",
      path: "/",
      icon: <GoHomeFill className="w-6 h-6 text-gray-500 transition duration-75" />
    },
    {
      name: "Stocks",
      path: "/stocks",
      icon: <RiStockFill className="w-6 h-6 text-gray-500 transition duration-75" />
    },
    {
      name: "Indices",
      path: "/indices",
      icon: <AiFillSignal className="w-6 h-6 text-gray-500 transition duration-75" />
    },
    {
      name: "Crypto Currencies",
      path: "/crypto-currencies",
      icon: <BsCurrencyBitcoin className="w-6 h-6 text-gray-500 transition duration-75" />
    },
    {
      name: "Currency Crosses",
      path: "/currency-crosses",
      icon: <BsCurrencyExchange className="w-6 h-6 text-gray-500 transition duration-75" />
    },
  ]

  const logoutHandler = () => {
    localStorage.removeItem("token")
    addToast("success", "Logout successful")
    navigate('/')
  }

  return (
    <aside className={`fixed top-0 left-0 transition-transform h-screen md:translate-x-0 w-full md:w-auto z-40 bg-black/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} ref={sidebarRef}>
      <div className="h-full overflow-y-auto px-3 py-4 bg-white w-64">
        <Link to={"/"} className="inline-flex gap-2 mb-5 pl-2.5">
              <img src="/logo.png" alt="logo" className="w-7"/>
              <span className="text-gray-700 text-lg font-semibold font-Inter">PredictivePulse</span>
        </Link>

        <ul className="space-y-3 font-medium font-Inter text-base w-full">
          {navItems.map((navItem, index) => 
          <li key={index}>
            <NavLink to={navItem.path} className={({ isActive }) => "rounded-lg inline-flex p-3 gap-3 items-center w-full " + (isActive ? "text-white bg-black/90 hover:bg-black/80" : "hover:bg-slate-50") } >
              {navItem.icon}
              <span>{navItem.name}</span>
            </NavLink>
          </li>
        )}
        <li key="logout">
          <div className="rounded-lg inline-flex p-3 gap-3 items-center w-full hover:bg-slate-50 cursor-pointer" onClick={logoutHandler}>
              <BsBoxArrowLeft  className="w-6 h-6 text-gray-500 transition duration-75" />
              <span>Logout</span>
          </div>
        </li>
        </ul>
      </div>
    </aside>
  )
}

export default memo(Sidebar)