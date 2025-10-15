import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import loginImage from '../assets/images/log in .png'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.emailOrPhone || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Find matching user
    const user = users.find(
      u => u.emailOrPhone === formData.emailOrPhone && u.password === formData.password
    )

    if (user) {
      // Successful login
      login({
        name: user.name,
        emailOrPhone: user.emailOrPhone
      })
      
      // Redirect to home page
      navigate('/')
    } else {
      setError('Invalid email/phone or password')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: 'calc(100vh - 200px)',
        bgcolor: '#fff',
      }}
    >
      {/* Left Side - Visual Section */}
      <Box
        sx={{
          flex: { xs: '0', md: '1' },
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#CBE4E8',
          p: 4,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt="Shopping"
          sx={{
            maxWidth: '80%',
            maxHeight: '600px',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Right Side - Form Section */}
      <Box
        sx={{
          flex: { xs: '1', md: '1' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '28px', md: '36px' },
              mb: 2,
              color: '#000',
            }}
          >
            Log in to Exclusive
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              color: '#000',
              mb: 4,
            }}
          >
            Enter your details below
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Email or Phone Input */}
            <TextField
              fullWidth
              name="emailOrPhone"
              placeholder="Email or Phone Number"
              value={formData.emailOrPhone}
              onChange={handleChange}
              variant="standard"
              inputProps={{
                autoComplete: 'username',
              }}
              sx={{
                mb: 4,
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#e0e0e0',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#999',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 0',
                },
              }}
            />

            {/* Password Input */}
            <TextField
              fullWidth
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              variant="standard"
              inputProps={{
                autoComplete: 'current-password',
              }}
              sx={{
                mb: 4,
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#e0e0e0',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#999',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#000',
                },
                '& .MuiInputBase-input': {
                  padding: '8px 0',
                },
              }}
            />

            {/* Login Button and Forgot Password - Same Row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#DB4444',
                  color: '#fff',
                  py: 1.5,
                  px: 5,
                  fontSize: '16px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: '#C13939',
                  },
                }}
              >
                Log In
              </Button>

              {/* Forgot Password Link */}
              <Link
                to="/forgot-password"
                style={{
                  color: '#DB4444',
                  textDecoration: 'none',
                  fontSize: '16px',
                }}
              >
                Forget Password?
              </Link>
            </Box>
            </form>
        </Box>
      </Box>
    </Box>
  )
}

export default Login
