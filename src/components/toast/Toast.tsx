import ToastItem from './ToastItem'
import { ToastProps } from '../../types'

const Toast: React.FC<ToastProps> = ({ toastList }) => {
  return (
    <div className="fixed top-20 md:top-24 end-2 z-50 w-full max-w-xs max-h-screen overflow-y-auto overflow-x-hidden p-1">
      {toastList.map(({type, message, id, onClose}) => 
        <ToastItem type={type} message={message} key={id} id={id} onClose={onClose}/>
      )}
    </div>
  )
}

export default Toast