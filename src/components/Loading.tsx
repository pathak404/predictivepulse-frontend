import { AiOutlineLoading3Quarters } from "react-icons/ai"
import logo from '../assets/images/logo.png'

const Loading = () => {
  return (
    <div className='w-full min-h-screen m-auto bg-black/20 flex items-center justify-center'>
            <div className="bg-white shadow-md relative p-3 rounded-lg w-min flex items-center justify-center">
                <AiOutlineLoading3Quarters className="w-20 h-20 animate-spin text-black" />
                <img src={logo} alt="logo" className='w-10 h-10 absolute' />
            </div>
    </div>
  )
}

export default Loading