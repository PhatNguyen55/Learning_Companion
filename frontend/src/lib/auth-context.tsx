'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  full_name: string
}

interface AuthError {
  type: string
  message: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  isLoadingPublicSettings: boolean
  authError: AuthError | null
  authChecked: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkUserAuth: () => Promise<void>
  navigateToLogin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true)
  const [authError, setAuthError] = useState<AuthError | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    checkUserAuth()
  }, [])

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true)
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        setIsAuthenticated(false)
        setAuthError({ type: 'auth_required', message: 'No token found' })
        return
      }

      // TODO: Fetch user từ API
      // const response = await api.get('/api/auth/me')
      // setUser(response.data)
      // setIsAuthenticated(true)
    } catch (error: any) {
      setIsAuthenticated(false)
      setAuthError({
        type: error.response?.data?.error_type || 'auth_error',
        message: error.message,
      })
    } finally {
      setIsLoadingAuth(false)
      setIsLoadingPublicSettings(false)
      setAuthChecked(true)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoadingAuth(true)
      // TODO: Call login API
      // const response = await api.post('/api/auth/login', { email, password })
      // localStorage.setItem('auth_token', response.data.token)
      // setUser(response.data.user)
      // setIsAuthenticated(true)
    } catch (error: any) {
      setAuthError({
        type: error.response?.data?.error_type || 'auth_error',
        message: error.message,
      })
      throw error
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const logout = async () => {
    try {
      // TODO: Call logout API
      localStorage.removeItem('auth_token')
      setUser(null)
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigateToLogin = () => {
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        authChecked,
        login,
        logout,
        checkUserAuth,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}