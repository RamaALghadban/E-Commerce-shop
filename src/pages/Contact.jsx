import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#fff",
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Breadcrumb */}
      <Typography
        variant="body2"
        sx={{
          mb: 5,
          fontSize: "14px",
          color: "#666",
        }}
      >
        Home / <span style={{ color: "#000" }}>Contact</span>
      </Typography>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left Side - Contact Information */}
        <Box
          sx={{
            flex: { xs: "1", md: "0 0 340px" },
            bgcolor: "#fff",
            p: 4,
            borderRadius: 1,
            boxShadow: "0 1px 13px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Call To Us Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#DB4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                Call To Us
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#000", mb: 2 }}
            >
              We are available 24/7, 7 days a week.
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#000", mb: 3 }}
            >
              Phone: +8801611112222
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Write To Us Section */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#DB4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EmailIcon sx={{ color: "#fff", fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontSize: "16px" }}
              >
                Write To Us
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#000", mb: 2 }}
            >
              Fill out our form and we will contact you within 24 hours.
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#000", mb: 1 }}
            >
              Emails: customer@exclusive.com
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#000" }}
            >
              Emails: support@exclusive.com
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Contact Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            p: 4,
            borderRadius: 1,
            boxShadow: "0 1px 13px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Top Row - Name, Email, Phone */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <TextField
                required
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />

              <TextField
                required
                name="email"
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />

              <TextField
                required
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </Box>

            {/* Message Field */}
            <TextField
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#f5f5f5",
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#DB4444",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "#C13939",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
