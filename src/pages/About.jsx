import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Services from "../components/Services/Services";
import photoAbout from "../assets/images/photo-about.png";
import servicesShop from "../assets/images/Services-shop .png";
import servicesDollar from "../assets/images/Services-dollar .png";
import servicesMoney from "../assets/images/Services-mony(3).png";
import servicesBag from "../assets/images/Services-bag.png";
import tomImage from "../assets/images/tom.png";
import emaImage from "../assets/images/ema.png";
import willImage from "../assets/images/will.png";

const AboutPage = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#fff",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Top Navigation - Breadcrumb */}
      <Typography
        variant="body2"
        sx={{
          mb: 5,
          fontSize: "14px",
          color: "#666",
        }}
      >
        Home / <span style={{ color: "#000" }}>About</span>
      </Typography>

      {/* Story Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Heading: Our Story */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: "36px", md: "54px" },
            fontWeight: "bold",
            color: "#000",
            mb: 4,
            lineHeight: 1.2,
          }}
        >
          Our Story
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" }, alignItems: "flex-start" }}>
          {/* Text Content */}
          <Box sx={{ flex: 1 }}>
            {/* Paragraph 1 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", md: "16px" },
                color: "#333",
                lineHeight: 1.8,
                mb: 3,
                textAlign: "justify",
              }}
            >
              Launched in 2015, Exclusive is South Asia's premier online shopping
              marketplace with an active presence in Bangladesh. Supported by wide
              range of tailored marketing, data and service solutions, Exclusive
              has 10,500 sellers and 300 brands and serves 3 million customers
              across the region.
            </Typography>

            {/* Paragraph 2 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "15px", md: "16px" },
                color: "#333",
                lineHeight: 1.8,
                textAlign: "justify",
              }}
            >
              Exclusive has more than 1 Million products to offer, growing at a
              very fast rate. Exclusive offers a diverse assortment in categories
              ranging from consumer goods to electronics.
            </Typography>
          </Box>

          {/* Image - Smaller and Next to Text */}
          <Box
            sx={{
              width: { xs: "100%", md: "400px" },
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                bgcolor: "#FF6B9D",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={photoAbout}
                alt="Two happy young women looking at smartphone with colorful shopping bags"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ mt: { xs: 6, md: 10 }, mb: 4, display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          {/* Sellers active on site */}
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                component="img"
                src={servicesShop}
                alt="Store icon"
                sx={{
                  width: 60,
                  height: 60,
                  margin: "0 auto 16px",
                  display: "block",
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 1, fontSize: { xs: "24px", md: "32px" } }}
              >
                10.5k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sellers active on our site
              </Typography>
            </Card>
          </Grid>

          {/* Monthly Product Sale - Highlighted */}
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                bgcolor: "#DB4444",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(219, 68, 68, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(219, 68, 68, 0.4)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                component="img"
                src={servicesDollar}
                alt="Sales icon"
                sx={{
                  width: 60,
                  height: 60,
                  margin: "0 auto 16px",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 1, fontSize: { xs: "24px", md: "32px" } }}
              >
                33k
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Monthly Product Sale
              </Typography>
            </Card>
          </Grid>

          {/* Customer active on site */}
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                component="img"
                src={servicesBag}
                alt="Customer icon"
                sx={{
                  width: 60,
                  height: 60,
                  margin: "0 auto 16px",
                  display: "block",
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 1, fontSize: { xs: "24px", md: "32px" } }}
              >
                45.5k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer active on our site
              </Typography>
            </Card>
          </Grid>

          {/* Annual gross sale */}
          <Grid item xs={6} sm={6} md={3}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                px: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-4px)",
                },
              }}
            >
              <Box
                component="img"
                src={servicesMoney}
                alt="Money bag icon"
                sx={{
                  width: 60,
                  height: 60,
                  margin: "0 auto 16px",
                  display: "block",
                }}
              />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mb: 1, fontSize: { xs: "24px", md: "32px" } }}
              >
                25k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Annual gross sale in our site
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box
        sx={{
          mt: { xs: 8, md: 12 },
          mb: 6,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          px: { xs: 2, md: 4 },
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Tom Cruise - Founder & Chairman */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              {/* Profile Image */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "360px",
                  bgcolor: "#F5F5F5",
                  borderRadius: 1,
                  overflow: "hidden",
                  mb: 2,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={tomImage}
                  alt="Tom Cruise"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Name and Title */}
              <Typography
                variant="h5"
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  mb: 0.5,
                  color: "#000",
                  textAlign: "left",
                }}
              >
                Tom Cruise
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: "#666",
                  mb: 1.5,
                  textAlign: "left",
                }}
              >
                Founder & Chairman
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-start" }}>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Emma Watson - Managing Director */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              {/* Profile Image */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "360px",
                  bgcolor: "#F5F5F5",
                  borderRadius: 1,
                  overflow: "hidden",
                  mb: 2,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={emaImage}
                  alt="Emma Watson"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Name and Title */}
              <Typography
                variant="h5"
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  mb: 0.5,
                  color: "#000",
                  textAlign: "left",
                }}
              >
                Emma Watson
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: "#666",
                  mb: 1.5,
                  textAlign: "left",
                }}
              >
                Managing Director
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-start" }}>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Will Smith - Product Designer */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                position: "relative",
              }}
            >
              {/* Profile Image */}
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "360px",
                  bgcolor: "#F5F5F5",
                  borderRadius: 1,
                  overflow: "hidden",
                  mb: 2,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={willImage}
                  alt="Will Smith"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Name and Title */}
              <Typography
                variant="h5"
                sx={{
                  fontSize: "24px",
                  fontWeight: 600,
                  mb: 0.5,
                  color: "#000",
                  textAlign: "left",
                }}
              >
                Will Smith
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: "#666",
                  mb: 1.5,
                  textAlign: "left",
                }}
              >
                Product Designer
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-start" }}>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  sx={{
                    color: "#000",
                    padding: "6px",
                    "&:hover": { color: "#DB4444" },
                  }}
                  size="small"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Pagination Dots */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            mt: 6,
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#DB4444",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#DB4444",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "2px solid #DB4444",
              bgcolor: "#fff",
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#DB4444",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#DB4444",
              opacity: 0.5,
            }}
          />
        </Box>
      </Box>

      {/* Services Section */}
      <Services />
    </Box>
  );
};

export default AboutPage;