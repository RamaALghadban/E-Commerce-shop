import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        p: { xs: 1, md: 3 },
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Breadcrumb Navigation */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 8, textAlign: "left" }}
      >
        Home / <span style={{ color: "#000" }}>404 Error</span>
      </Typography>

      {/* Main Content - Centered */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          textAlign: "center",
          gap: 3,
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "48px", md: "72px" },
            fontWeight: "bold",
            color: "#000",
          }}
        >
          404 Not Found
        </Typography>

        {/* Sub-heading */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "14px", md: "16px" },
            color: "#666",
            mb: 2,
          }}
        >
          Your visited page not found. You may go home page.
        </Typography>

        {/* Button */}
        <Button
          onClick={handleGoHome}
          sx={{
            bgcolor: "#DB4444",
            color: "#fff",
            px: 5,
            py: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#C23333",
            },
          }}
        >
          Back to home page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;

