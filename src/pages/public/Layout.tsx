import { ReactNode } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

const Layout: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout