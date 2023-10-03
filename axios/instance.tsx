import axios, { AxiosInstance } from 'axios'

const defaultBaseURL = 'http://localhost:3000'
const envBaseURL = process.env.NEXT_PUBLIC_HOSTING_URL

const baseURL = envBaseURL || defaultBaseURL

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
})

export default axiosInstance