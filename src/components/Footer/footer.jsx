// src/assets/components/Footer/footer.jsx (المعدل)

import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Stack,
    Divider,
    IconButton,
    InputBase,
    Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './footer.css';

// مكون فرعي للروابط
const FooterLink = ({ children }) => (
    <Link href="#" className="footer-link">
        {children}
    </Link>
);


const Footer = () => {
    const quickLinks = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];
    const accountLinks = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];

    return (
        <Box
            component="footer"
            className="footer-root" // للخلفية السوداء
            sx={{
                py: { xs: 8, md: 10 },
                px: { xs: 2, md: 6 },
                pl: { xs: 2, md: 8, lg: 15 },
            }}
        >
            <Grid container spacing={{ xs: 5, md: 3, lg: 15 }}>

                {/* 1. Exclusive & Subscribe Column */}
                <Grid item xs={12} sm={6} md={2.5}>
                    <Stack spacing={2}>
                        <Typography variant="h5" fontWeight="bold">
                            Exclusive
                        </Typography>
                        <Typography variant="h6" fontWeight="medium">
                            Subscribe
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            Get 10% off your first order
                        </Typography>

                        {/* 💡 تعديل حقل الاشتراك: InputBase محاط بـ Box والزر داخله */}
                        <Box className="subscribe-box-v2">
                            <InputBase
                                placeholder="Enter your email"
                                className="subscribe-input-v2"
                            />
                            {/* زر الإرسال داخل الـ Input نفسه */}
                            <IconButton
                                className="subscribe-icon-v2"
                                aria-label="send email"
                            >
                                <SendIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Stack>
                </Grid>

                {/* 2. Support Column */}
                <Grid item xs={12} sm={6} md={3}>
                    <Stack spacing={2.5}>
                        <Typography variant="h6" fontWeight="bold">
                            Support
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            111 Bijoy sarani, Dhaka,
                            <br />
                            DH 1515, Bangladesh.
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            exclusive@gmail.com
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                            +88015-88888-9999
                        </Typography>
                    </Stack>
                </Grid>

                {/* 3. Account Column */}
                <Grid item xs={12} sm={4} md={2}>
                    <Stack spacing={2.5}>
                        <Typography variant="h6" fontWeight="bold">
                            Account
                        </Typography>
                        {accountLinks.map((text) => (
                            <FooterLink key={text}>{text}</FooterLink>
                        ))}
                    </Stack>
                </Grid>

                {/* 4. Quick Link Column */}
                <Grid item xs={12} sm={4} md={2}>
                    <Stack spacing={2.5}>
                        <Typography variant="h6" fontWeight="bold">
                            Quick Link
                        </Typography>
                        {quickLinks.map((text) => (
                            <FooterLink key={text}>{text}</FooterLink>
                        ))}
                    </Stack>
                </Grid>

                {/* 5. Download App Column */}
                <Grid item xs={12} sm={4} md={2.5}>
                    <Stack spacing={1.5}>
                        <Typography variant="h6" fontWeight="bold">
                            Download App
                        </Typography>
                        <Typography variant="body2" fontSize={12} sx={{ color: '#ccc' }}>
                            Save $3 with App New User Only
                        </Typography>

                        {/* 💡 تعديل منطقة QR Code: عرض الصور بشكل أفقي */}
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>

                            {/* Placeholder for QR Code */}
                            <Box className="qr-code-placeholder-v2" />

                            {/* صور المتاجر */}
                            <Stack spacing={0.5} sx={{ display: 'block' }}>
                                {/* يجب استبدال المسارات بصور حقيقية */}
                                <Box component="img" src="/google-play.png" alt="Google Play" className="app-store-img" />
                                <Box component="img" src="/app-store.png" alt="App Store" className="app-store-img" />
                            </Stack>
                        </Box>

                        {/* أيقونات التواصل الاجتماعي */}
                        <Stack direction="row" spacing={1.5} pt={1}>
                            <IconButton size="small" sx={{ color: '#fff', '&:hover': { color: 'error.main' } }}>
                                <FacebookIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#fff', '&:hover': { color: 'error.main' } }}>
                                <TwitterIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#fff', '&:hover': { color: 'error.main' } }}>
                                <InstagramIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#fff', '&:hover': { color: 'error.main' } }}>
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            <Divider sx={{ mt: { xs: 5, md: 7 }, mb: 2, bgcolor: '#333' }} />

            {/* Copyright Section */}
            <Box textAlign="center" py={1}>
                <Typography variant="caption" sx={{ color: '#666' }}>
                    © Copyright RImel 2022. All right reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;