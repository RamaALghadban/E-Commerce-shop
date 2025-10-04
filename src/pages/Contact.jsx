import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 6 }, bgcolor: "#fff" }}>
      {/* Breadcrumb */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Home / <span style={{ color: "#000" }}>Contact</span>
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side - Contact Info */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              {/* Call To Us */}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "error.main",
                    color: "#fff",
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhoneIcon />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  Call To Us
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                We are available 24/7, 7 days a week.
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                Phone: +8801611222222
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* Write To Us */}
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    bgcolor: "error.main",
                    color: "#fff",
                    width: 45,
                    height: 45,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmailIcon />
                </Box>
                <Typography variant="h6" fontWeight="bold">
                  Write To Us
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Fill out our form and we will contact you within 24 hours.
              </Typography>
              <Typography variant="body2">
                Emails: <br />
                <strong>customer@exclusive.com</strong>
                <br />
                <strong>support@exclusive.com</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Contact Form */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Your Name *" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Your Email *" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField fullWidth label="Your Phone *" variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    px: 4,
                    py: 1,
                    fontWeight: "bold",
                    borderRadius: 1.5,
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;