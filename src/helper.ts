import { ApiResponse } from "./types"

export const acronym = (str: string): string =>
  str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");

export const getSymbol = (str: string): string => str.split(":")[1];



export const fetchFromServer = async <T = Record<string, unknown>>(
  path: string,
  method: string = "GET",
  body?: Object
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const options: RequestInit = {
      method,
      credentials: "include",
      cache: "no-cache",
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(import.meta.env.VITE_API_URL + path, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`${response.statusText} ${errorResponse.message}`);
    }

    const jsonResponse = await response.json();
    const { status, message, ...data } = jsonResponse;
    return { status, message, data } as ApiResponse<T>;

  } catch (error) {
    throw error;
  }
}



