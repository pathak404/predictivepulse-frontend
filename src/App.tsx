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
import { AuthContext } from "./AuthContext"
import Loading from "./components/Loading"
import { LoginApiResponseType } from "./types"
import { fetchFromServer } from "./helper"
import ToastContextProvider from "./components/toast/ToastContext"
import CreatePassword from "./pages/public/CreatePassword"


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)
  const [nonce, setNonce] = useState<string>("")

  const logout: () => void = async () => {
    try{
      const res = await fetchFromServer('/logout')
      if(res && res.data){
        setIsLoggedIn(false)
      }
    }catch(error){
      alert((error as Error).message)
      console.log((error as Error).message)
    }
  }

  useEffect(() => {
    checkIsLoggedIn();
  }, [])

  const checkIsLoggedIn = async () => {
    try{
      const res = await fetchFromServer<LoginApiResponseType>('/login')
      if(res && res.data){
        setIsLoggedIn(res.data.isLoggedIn)
        setNonce(res.data.nonce)
      }
    }catch(error){
      alert((error as Error).message)
      console.log((error as Error).message)
    }
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: isLoggedIn == null ? <Loading /> : isLoggedIn ? <ProtectedLayout><Home /></ProtectedLayout> : <Landing />
    },
    {
      path: '/sign-in',
      element: isLoggedIn == null ? <Loading /> : <Signin />
    },
    {
      path: '/create-password/:key',
      element: <CreatePassword nonce={nonce} isLoggedIn={isLoggedIn} />
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
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, logout, nonce, setNonce}}>
      <ToastContextProvider>
        <RouterProvider router={router} />
      </ToastContextProvider>
    </AuthContext.Provider>
  )
}

export default App
