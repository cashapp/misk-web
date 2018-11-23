import axios, { AxiosRequestConfig } from "axios"

export const get = async (url: string, config: AxiosRequestConfig = {}) => {
  try {
    const response = await axios.get(url, config)
    return response
  } catch (error) {
    return error
  }
}
