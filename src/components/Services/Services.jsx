import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
} from '@mui/material'
import {
  LocalShipping,
  HeadsetMic,
  VerifiedUser,
} from '@mui/icons-material'

const Services = () => {
  const services = [
    {
      id: 1,
      icon: LocalShipping,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140',
    },
    {
      id: 2,
      icon: HeadsetMic,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support',
    },
    {
      id: 3,
      icon: VerifiedUser,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days',
    },
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => {
          const IconComponent = service.icon
          return (
            <Grid item xs={12} sm={4} key={service.id}>
              <Stack
                alignItems="center"
                spacing={2}
                sx={{
                  textAlign: 'center',
                }}
              >
                {/* Icon Circle */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#C0C0C0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: '#000',
                    },
                  }}
                >
                  <IconComponent
                    sx={{
                      fontSize: 32,
                      color: 'white',
                      zIndex: 1,
                    }}
                  />
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '16px', md: '18px' },
                    color: '#000',
                    textTransform: 'uppercase',
                  }}
                >
                  {service.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '14px',
                  }}
                >
                  {service.description}
                </Typography>
              </Stack>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Services

