import { ApiResponse } from "./types"

export const acronym = (str: string): string =>
  str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");

export const getSymbol = (str: string): string => str.split(":")[1];



export const fetchFromServer = async <T = Record<string, unknown>>(
  path: string,
  isAuth: boolean = false,
  method: string = "GET",
  body?: Record<string, any>,
  nonce?: string,
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if(isAuth){
      const token = localStorage.getItem("token")
      if(!token) throw new Error("Auth:JWT not exist")
      headers["Authorization"] = "Bearer "+token
    }
    if(nonce){
      headers['X-Nonce'] = nonce
    }
    const options: RequestInit = {
      method,
      cache: "no-cache",
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(import.meta.env.VITE_API_URL + path, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse?.message || response.statusText);
    }

    const jsonResponse = await response.json();
    return jsonResponse as ApiResponse<T>;

  } catch (error) {
    throw error;
  }
}



