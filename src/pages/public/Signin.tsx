import { FormEvent, useContext, useEffect, useState } from "react"
import FormButton from "../../components/FormButton"
import InputGroup from "../../components/InputGroup"
import Layout from "./Layout"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../components/toast/ToastContext"
import { ApiResponse, ToastContextType } from "../../types"
import { fetchFromServer } from "../../helper"
import useNonce from "../../useNonce"

const Signin: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useContext(ToastContext) as ToastContextType
  const {nonce, error, refresh} = useNonce()

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate('/')
    }
  }, [])

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    let data: Record<string, string> ={}
    formData.forEach((val, key) => {
      data[key] = val as string;
    })

    if(error){
      addToast("error", error as string)
      setLoading(false)
      return;
    }

    if(data.password.length < 8){
      addToast("error", "Password should be 8 characters long.")
      setLoading(false)
      return;
    }

    try{
      const res = await fetchFromServer<ApiResponse<{token: string}>>('/login', false, 'POST', data, nonce)
      if(res && res.status){
        addToast("success", res.message)
        localStorage.setItem("token", res.token)
        navigate(0)
      }
    }catch(error){
      addToast("error", (error as Error).message)
    }finally{
      setLoading(false)
      refresh()
    }
  }

  return (
    <Layout>
    <div className='mx-auto px-2 max-w-md min-h-[75vh] grid place-items-center'>
      <form className='block w-full p-6 sm:p-8 shadow-xl rounded-lg' onSubmit={formHandler}>
        <h3 className='font-semibold text-2xl mb-8'>Sign in to your account</h3>
        <InputGroup type='email' label='Email Address' name='email' />
        <InputGroup type='password' label='Password' name='password' />
        <FormButton loading={loading} arrow>Sign In</FormButton>
      </form>
    </div>
    </Layout>
  )
}

export default Signin