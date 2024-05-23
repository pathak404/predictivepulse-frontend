import { useEffect, useState } from "react"
import { fetchFromServer } from "./helper"
import { ApiResponse } from "./types"

const useNonce = () => {
    const [nonce, setNonce] = useState<string>("")
    const [error, setError] = useState<string|undefined>()

    useEffect(()=>{
        getNonce();
    }, [])

    const getNonce = async () => {
        try{
            const res = await fetchFromServer<ApiResponse<{nonce: string}>>("/nonce")
            setNonce(res.nonce)
        }catch(error: any){
            setError(error.message)
        }
    }

  return {
    nonce,
    error,
    refresh: getNonce
  }
}

export default useNonce