import React, { ReactNode, useEffect, useRef, useState } from "react"
import Sidebar from "../../components/private/Sidebar"
import { HiMenuAlt2 } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const ProtectedLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("token")
    const [sidebarStatus, setSidebarStatus] = useState<boolean>(false)
    const sidebarRef = useRef<HTMLDivElement>(null)

    
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/")
        }
    }, [])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLDivElement;
          if (target.tagName === 'ASIDE') {
            setSBStatus();
          }
        };
        sidebarRef.current?.addEventListener('click', handleClick);
      
        return () => {
          sidebarRef.current?.removeEventListener('click', handleClick);
        };
    }, [sidebarRef]);


    const setSBStatus = () => {
        setSidebarStatus((prevStatus) => !prevStatus)
    }


    return (
          isLoggedIn && <>
            <Sidebar isOpen={sidebarStatus} sidebarRef={sidebarRef} />
            <div className="bg-slate-50 p-4 md:ml-64 md:ps-8 min-h-screen">
              <div className="w-full mb-10 block md:hidden">
                <HiMenuAlt2 className="w-8 h-8 -ms-1" onClick={ setSBStatus } />
              </div>
              {children}
            </div>
        </>
    )
}

export default ProtectedLayout