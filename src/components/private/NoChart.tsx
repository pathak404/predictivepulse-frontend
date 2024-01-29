import { PiXCircleFill } from "react-icons/pi"

const NoChart = () => {
  return (
    <div className="w-full my-5 h-auto">
        <div className="inline-flex items-center p-2 gap-2 bg-rose-500 text-white rounded-md text-base">
            <PiXCircleFill className="w-6 h-6" />
            <p className="font-Poppins">Chart Not Available for this asset</p>
        </div>
    </div>
  )
}

export default NoChart