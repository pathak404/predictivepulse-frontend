import { useState, createContext, ReactNode } from 'react'
import Toast from './Toast'
import { ToastContextType, ToastItemProps } from '../../types'

export const ToastContext = createContext<ToastContextType | null>(null)

const ToastContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastList, setToastList] = useState<ToastItemProps[]>([])

    const removeToast = (id : string) : void => {
      setToastList((prevToastList) => prevToastList.filter((toast) => toast.id !== id))
    }

    const addToast = ( type: 'success' | 'error' | 'warning' | 'info', message: string, hideAfterSeconds:number = 5) : string => { 
        const id : string = 'toast_'+(Math.random() + 1).toString(36).substring(7)
        const newToast: ToastItemProps = { id, type, message, onClose:removeToast}
        setToastList((prevToastList) => [...prevToastList, newToast])
        setTimeout(()=> {
          removeToast(id)
        }, 1000 * hideAfterSeconds)
        return id
    }
    
  return (
    <ToastContext.Provider value={{addToast, removeToast}} >
        <Toast toastList={toastList}/>
        {children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider