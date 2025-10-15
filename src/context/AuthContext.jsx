import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('user')
    
    if (loggedInStatus === 'true' && userData) {
      setIsLoggedIn(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const signup = (userData) => {
    // Save user credentials to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))
    
    // Automatically log in the user
    login(userData)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
  }

  const value = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

