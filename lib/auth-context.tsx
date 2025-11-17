"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
  register: (username: string, email: string, password: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_EMAIL = "method@123"
const ADMIN_PASSWORD = "method123"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const register = (username: string, email: string, password: string): boolean => {
    if (!username || !email || password.length < 6) return false

    const isAdminUser = email === ADMIN_EMAIL && password === ADMIN_PASSWORD

    setIsAuthenticated(true)
    setIsAdmin(isAdminUser)
    return true
  }

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}