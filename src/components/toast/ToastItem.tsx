import { memo } from 'react'
import { ToastItemProps } from '../../types'
import { PiWarningCircleFill, PiInfoFill, PiXCircleFill, PiCheckCircleFill } from 'react-icons/pi'
import { AiOutlineClose } from 'react-icons/ai'
import { ToastType } from '../../types'

const ToastItem: React.FC<ToastItemProps> = ({ id, type, message, onClose }) => {
    const closeIcon : JSX.Element = (
        <AiOutlineClose className="w-5 h-5" />
    )

    const toastType : ToastType = {
        error: {
            icon: <PiXCircleFill className="w-5 h-5" />,
            className: 'text-red-500 bg-red-100'
        },
        success: {
            icon: <PiCheckCircleFill className="w-5 h-5" />,
            className: 'text-green-500 bg-green-100'
        },
        warning: {
            icon: <PiWarningCircleFill className="w-5 h-5" />,
            className: 'text-orange-500 bg-orange-100'
        },
        info: {
            icon: <PiInfoFill className="w-5 h-5" />,
            className: 'text-blue-500 bg-blue-100'
        }
    }

  return (
    <div className="flex items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow animate-right-to-left" role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${toastType[type].className}`}>
            {toastType[type].icon}
            <span className="sr-only">{type} icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white" aria-label="Close" onClick={() => onClose(id)}>
            <span className="sr-only">Close</span>
            {closeIcon}
        </button>
    </div>
  )
}

export default memo(ToastItem, (prevProps : ToastItemProps, nextProps : ToastItemProps) => prevProps.id !== nextProps.id)