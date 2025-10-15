import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import loginImage from '../assets/images/log in .png'

function SignUp() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    if (!formData.name || !formData.emailOrPhone || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find(u => u.emailOrPhone === formData.emailOrPhone)
    
    if (existingUser) {
      setError('User with this email/phone already exists')
      return
    }

    // Save user credentials and log in
    signup(formData)
    
    setSuccess('Account created successfully! Redirecting...')
    
    // Redirect to home page after a brief delay
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google')
    // Add your Google sign up logic here
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
            Create an account
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

            {/* Success Message */}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {/* Name Input */}
            <TextField
              fullWidth
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              variant="standard"
              inputProps={{
                autoComplete: 'name',
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
                autoComplete: 'new-password',
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

            {/* Create Account Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#DB4444',
                color: '#fff',
                py: 1.5,
                fontSize: '16px',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 1,
                mb: 2,
                '&:hover': {
                  bgcolor: '#C13939',
                },
              }}
            >
              Create Account
            </Button>

            {/* Google Sign Up Button */}
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignUp}
              sx={{
                color: '#000',
                py: 1.5,
                fontSize: '16px',
                textTransform: 'none',
                fontWeight: 400,
                borderRadius: 1,
                borderColor: '#e0e0e0',
                mb: 3,
                '&:hover': {
                  borderColor: '#999',
                  bgcolor: 'transparent',
                },
              }}
              startIcon={
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
            >
                Sign up with Google
            </Button>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#666', fontSize: '16px' }}>
                Already have account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#000',
                    textDecoration: 'underline',
                    fontWeight: 500,
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>
            </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
