import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Grid,
} from '@mui/material'
import ps5Image from '../../assets/images/ps5.png'
import womenImage from '../../assets/images/woman.png'
import speakerImage from '../../assets/images/speaker.png'
import perfumeImage from '../../assets/images/perfum.png'

const NewArrival = () => {
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/products')
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Section Header */}
      <Box sx={{ mb: 4 }}>
        {/* Featured Label with Red Rectangle */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 20,
              height: 40,
              backgroundColor: '#d32f2f',
              borderRadius: '4px'
            }}
          />
          <Typography
            sx={{
              color: '#d32f2f',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            Featured
          </Typography>
        </Stack>

        {/* Main Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: { xs: '28px', md: '36px' },
          }}
        >
          New Arrival
        </Typography>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={3} justifyContent="center">
        {/* Left Section - PlayStation 5 */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              height: { xs: '400px', md: '600px' },
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* PS5 Image */}
            <Box
              component="img"
              src={ps5Image}
              alt="PlayStation 5"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 30,
                left: 30,
                right: 30,
                zIndex: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '24px', md: '32px' },
                  mb: 2,
                }}
              >
                PlayStation 5
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: { xs: '14px', md: '16px' },
                  mb: 3,
                  maxWidth: '300px',
                }}
              >
                Black and White version of the PS5 coming out on sale.
              </Typography>
              <Button
                onClick={handleShopNow}
                sx={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    textDecoration: 'underline',
                    backgroundColor: 'transparent',
                    color: '#00FF66',
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right Section - 3 Stacked Items */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            {/* Top Right - Women's Collections */}
            <Box
              sx={{
                position: 'relative',
                height: { xs: '250px', md: '286px' },
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Women's Collections Image */}
              <Box
                component="img"
                src={womenImage}
                alt="Women's Collections"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: { xs: '20px', md: '24px' },
                    mb: 1,
                  }}
                >
                  Women's Collections
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: { xs: '12px', md: '14px' },
                    mb: 2,
                    maxWidth: '250px',
                  }}
                >
                  Featured woman collections that give you another vibe.
                </Typography>
                <Button
                  onClick={handleShopNow}
                  sx={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textTransform: 'none',
                    padding: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      textDecoration: 'underline',
                      backgroundColor: 'transparent',
                      color: '#00FF66',
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Box>

            {/* Bottom Right - Two Smaller Items */}
            <Grid container spacing={3}>
              {/* Speakers */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '250px', md: '284px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Speakers Image */}
                  <Box
                    component="img"
                    src={speakerImage}
                    alt="Amazon Speakers"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '18px', md: '20px' },
                        mb: 1,
                      }}
                    >
                      Speakers
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '11px', md: '12px' },
                        mb: 1.5,
                      }}
                    >
                      Amazon wireless speakers
                    </Typography>
                    <Button
                      onClick={handleShopNow}
                      sx={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        textTransform: 'none',
                        padding: 0,
                        minWidth: 'auto',
                        '&:hover': {
                          textDecoration: 'underline',
                          backgroundColor: 'transparent',
                          color: '#00FF66',
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Perfume */}
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '250px', md: '284px' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Perfume Image */}
                  <Box
                    component="img"
                    src={perfumeImage}
                    alt="Gucci Perfume"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 20,
                      left: 20,
                      right: 20,
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: { xs: '18px', md: '20px' },
                        mb: 1,
                      }}
                    >
                      Perfume
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: { xs: '11px', md: '12px' },
                        mb: 1.5,
                      }}
                    >
                      GUCCI INTENSE OUD EDP
                    </Typography>
                    <Button
                      onClick={handleShopNow}
                      sx={{
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        textTransform: 'none',
                        padding: 0,
                        minWidth: 'auto',
                        '&:hover': {
                          textDecoration: 'underline',
                          backgroundColor: 'transparent',
                          color: '#00FF66',
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewArrival

