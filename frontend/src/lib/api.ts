import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors safely
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Validate response structure
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    throw new Error('Invalid response status')
  },
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        window.location.href = '/signin'
      }
    }

    if (error.response?.status === 403) {
      console.error('Access forbidden')
    }

    // Log error safely (don't expose sensitive data)
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
    })

    return Promise.reject(error)
  }
)

export default api
