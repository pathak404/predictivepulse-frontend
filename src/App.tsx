import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./pages/public/Landing"
import Privacy from "./pages/public/Privacy"
import Refund from "./pages/public/Refund"
import Terms from "./pages/public/Terms"
import Signin from "./pages/public/Signin"
import Home from "./pages/private/Home"
import CryptoCurrencies from "./pages/private/CryptoCurrencies"
import CurrencyCrosses from "./pages/private/CurrencyCrosses"
import Stocks from "./pages/private/Stocks"
import Indices from "./pages/private/Indices"
import Crypto from "./pages/private/single/Crypto"
import CurrencyCross from "./pages/private/single/CurrencyCross"
import Index from "./pages/private/single/Index"
import Stock from "./pages/private/single/Stock"
import ProtectedLayout from "./pages/private/ProtectedLayout"
import { useEffect, useState } from "react"
import ToastContextProvider from "./components/toast/ToastContext"
import CreatePassword from "./pages/public/CreatePassword"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(localStorage.getItem("token"))

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(null)
  }

  useEffect(() => {
    checkIsLoggedIn();
  }, [])

  const checkIsLoggedIn = () => {
    if(!isLoggedIn){
      logout();
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn != null ? <ProtectedLayout><Home /></ProtectedLayout> : <Landing />
    },
    {
      path: '/sign-in',
      element: <Signin />
    },
    {
      path: '/create-password/:key',
      element: <CreatePassword />
    },
    {
      path: '/privacy-policy',
      element: <Privacy />
    },
    {
      path: 'refund-policy',
      element: <Refund />
    },
    {
      path: 'terms-and-conditions',
      element: <Terms />
    },

    {
      path: '/stocks',
      element: <ProtectedLayout><Stocks /></ProtectedLayout>
    },
    {
      path: '/stocks/:symbol',
      element: <ProtectedLayout><Stock /></ProtectedLayout>
    },

    {
      path: '/indices',
      element: <ProtectedLayout><Indices /></ProtectedLayout>
    },
    {
      path: '/indices/:symbol',
      element: <ProtectedLayout><Index /></ProtectedLayout>
    },

    {
      path: '/crypto-currencies',
      element: <ProtectedLayout><CryptoCurrencies /></ProtectedLayout>
    },
    {
      path: '/crypto-currencies/:symbol',
      element: <ProtectedLayout><Crypto /></ProtectedLayout>
    },

    {
      path: '/currency-crosses',
      element: <ProtectedLayout><CurrencyCrosses /></ProtectedLayout>
    },
    {
      path: '/currency-crosses/:symbol',
      element: <ProtectedLayout><CurrencyCross /></ProtectedLayout>
    },
  ])

  return (
    <ToastContextProvider>
      <RouterProvider router={router} />
    </ToastContextProvider>
  )
}

export default App
