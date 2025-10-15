import React, { useState, useEffect } from 'react'
import { Fab, Zoom } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(true)

  // Always show button for now, you can add scroll detection later
  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('.main-content')
      if (mainContent) {
        setIsVisible(mainContent.scrollTop > 300)
      } else {
        setIsVisible(window.pageYOffset > 300)
      }
    }

    const mainContent = document.querySelector('.main-content')
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    const mainContent = document.querySelector('.main-content')
    
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Zoom in={isVisible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          backgroundColor: '#F5F5F5',
          color: '#000',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            backgroundColor: '#d32f2f',
            color: 'white',
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(211, 47, 47, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <KeyboardArrowUp sx={{ fontSize: 28 }} />
      </Fab>
    </Zoom>
  )
}

export default BackToTop

