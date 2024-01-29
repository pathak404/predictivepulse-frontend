import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

import { FormButtomProps } from "../types"


const FormButton: React.FC<FormButtomProps> = ({ children, loading, arrow }) => {


  return (
    <button type="submit" className="inline-flex gap-3 items-center text-white bg-indigo-600 focus:outline-none font-medium rounded-3xl text-sm w-fit px-8 md:px-10 py-4 text-center">
      { 
        loading ? <><AiOutlineLoading3Quarters className="inline w-4 h-4 text-gray-100 animate-spin" /><span>Please Wait ...</span></> : <>{ children }{ arrow && <HiOutlineArrowNarrowRight className="w-5 h-5"/> }</>
      }
    </button>
  )
}

export default FormButton