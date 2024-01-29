import { FormEvent, useContext, useEffect, useState } from "react"
import FormButton from "../../components/FormButton"
import InputGroup from "../../components/InputGroup"
import Layout from "./Layout"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToastContext } from "../../components/toast/ToastContext"
import { ToastContextType } from "../../types"
import { fetchFromServer } from "../../helper"
import { PiCheckCircleFill, PiWarningCircleFill } from "react-icons/pi"
import Loading from "../../components/Loading"


const CreatePassword: React.FC<{isLoggedIn: boolean|null, nonce: string}> = ({isLoggedIn, nonce}) => {
  const { key } = useParams<{key: string}>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useContext(ToastContext) as ToastContextType

  const [response, setResponse] = useState<{status: string, message: string} | null>(null);
  const [isKeyCheck, setIsKeyCheck] = useState<boolean>(false)

  useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }
    checkKey()
  }, [])

  const checkKey = async () => {
    try{
      await fetchFromServer('/change-password/'+key)
    }catch(error){
      setResponse({
        status: "error",
        message: (error as Error).message
      })
    }finally{
      setIsKeyCheck(true)
    }
  }

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    let data: Record<string, string> ={}
    formData.forEach((val, key) => {
      data[key] = val as string;
    })

    if(data.password.length < 8){
      addToast("error", "Password should be 8 characters long.")
      setLoading(false)
      return;
    }
    if(data.password !== data.cpassword){
      addToast("error", "Password should be same in both fields")
      setLoading(false)
      return;
    }
    try{
      const res = await fetchFromServer('/change-password/'+key, 'POST', data)
      if(res && res.data){
        addToast("success", res.message)
        setResponse({
          status: "success",
          message: res.message
        })
      } 
    }catch(error){
      setResponse({
        status: "error",
        message: (error as Error).message
      })
    }finally{
      setLoading(false)
    }
  }

  return (
    isKeyCheck ? <Layout>
    <div className='mx-auto px-2 max-w-md min-h-[75vh] grid place-items-center'>
      {response == null ?<form className='block w-full p-6 sm:p-8 shadow-xl rounded-lg' onSubmit={formHandler}>
        <h3 className='font-semibold text-2xl mb-8'>Create Password</h3>
        <InputGroup type='text' label='Password' name='password' />
        <InputGroup type='password' label='Confirm Password' name='cpassword' />
        <InputGroup type="hidden" name="nonce" value={nonce} />
        <FormButton loading={loading} arrow>Set Password</FormButton>
      </form>:
      <div className='w-full p-6 sm:p-10 shadow-xl rounded-lg flex flex-col items-center justify-center gap-4'>
        {response.status === "error" ? <PiWarningCircleFill className="w-14 h-14 text-rose-600" /> : <PiCheckCircleFill className="w-14 h-14 text-green-500" />}
        <p className="font-Poppins">{response.message}</p>
        <Link className="px-10 py-3 bg-gray-800 rounded-3xl text-white inline-flex gap-3 items-center hover:bg-gray-700 transition-colors duration-300" to={"/"}>Back to Home</Link>
      </div>
      }
    </div>
    </Layout> : <Loading />
  )
}

export default CreatePassword