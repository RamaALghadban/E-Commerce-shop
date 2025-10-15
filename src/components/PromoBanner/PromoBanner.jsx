import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from '@mui/material'
import jblImage from '../../assets/images/JBL.png'

const PromoBanner = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown timer logic
  useEffect(() => {
    // Set target date (5 days from now)
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 5)
    targetDate.setHours(targetDate.getHours() + 23)
    targetDate.setMinutes(targetDate.getMinutes() + 59)
    targetDate.setSeconds(targetDate.getSeconds() + 35)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeCircle = ({ value, label }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: 60, md: 70 },
          height: { xs: 60, md: 70 },
          borderRadius: '50%',
          border: '2px solid white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          mb: 1,
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '20px', md: '24px' },
            fontWeight: 'bold',
          }}
        >
          {value.toString().padStart(2, '0')}
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '10px', md: '11px' },
            textTransform: 'capitalize',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box
        sx={{
          backgroundColor: '#000',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: { xs: 'auto', md: '500px' },
        }}
      >
        {/* Left Column - Text and CTAs */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 4, md: 6, lg: 8 },
          }}
        >
          {/* Category Label */}
          <Typography
            sx={{
              color: '#00FF66',
              fontSize: { xs: '14px', md: '16px' },
              fontWeight: 600,
              mb: 3,
              letterSpacing: '0.5px',
            }}
          >
            Categories
          </Typography>

          {/* Main Headline */}
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '32px', md: '48px', lg: '56px' },
              fontWeight: 'bold',
              lineHeight: 1.2,
              mb: 4,
              maxWidth: '500px',
            }}
          >
            Enhance Your Music Experience
          </Typography>

          {/* Countdown Timer */}
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            sx={{ mb: 5 }}
          >
            <TimeCircle value={timeLeft.days} label="Days" />
            <TimeCircle value={timeLeft.hours} label="Hours" />
            <TimeCircle value={timeLeft.minutes} label="Minutes" />
            <TimeCircle value={timeLeft.seconds} label="Seconds" />
          </Stack>

          {/* Call-to-Action Button */}
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{
                backgroundColor: '#00FF66',
                color: 'white',
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 600,
                px: { xs: 4, md: 6 },
                py: { xs: 1.5, md: 2 },
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#00CC52',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(0, 255, 102, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Buy Now!
            </Button>
          </Box>
        </Box>

        {/* Right Column - Product Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            p: { xs: 4, md: 2 },
          }}
        >
          {/* Glow Effect Behind Image */}
          <Box
            sx={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,255,102,0.2) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Product Image */}
          <Box
            component="img"
            src={jblImage}
            alt="JBL Portable Speaker"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: { xs: '300px', md: '450px' },
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 20px 40px rgba(0, 255, 102, 0.2))',
            }}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default PromoBanner

