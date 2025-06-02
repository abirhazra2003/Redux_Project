import * as React from "react";
import {
    Container,
    Grid,
    Box,
    Typography,
    Link,
    Paper,
    IconButton
} from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function GuestFooter() {
    return (
        <Paper
            component="footer"
            square
            sx={{
                mt: 'auto',
                pt: 6,
                pb: 4,
                background: 'linear-gradient(90deg, #388E3C 0%, #2A2F45 100%)',
                color: '#e2e8f0',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
                    {/* Column 1: Logo */}
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <AdbIcon sx={{ color: '#38bdf8', mr: 1 }} />
                            <Typography variant="h6" fontWeight={700} color="#f1f5f9">
                                YourBrand
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="#94a3b8" textAlign="center">
                            Empowering digital experiences with clean and efficient interfaces.
                        </Typography>
                    </Grid>

                    {/* Column 2: Company */}
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom textAlign="center">
                            Company
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                            <Link href="/about" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                About Us
                            </Link>
                            <Link href="/careers" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                Careers
                            </Link>
                            <Link href="/blog" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                Blog
                            </Link>
                        </Box>
                    </Grid>

                    {/* Column 3: Support */}
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom textAlign="center">
                            Support
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1} alignItems="center">
                            <Link href="/help" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                Help Center
                            </Link>
                            <Link href="/contact" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                Contact Us
                            </Link>
                            <Link href="/status" underline="none" color="#cbd5e1" sx={{ '&:hover': { color: '#38bdf8' } }}>
                                System Status
                            </Link>
                        </Box>
                    </Grid>

                    {/* Column 4: Social */}
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom textAlign="center">
                            Follow Us
                        </Typography>
                        <Box display="flex" gap={2} justifyContent="center">
                            <IconButton href="#" sx={{ color: '#cbd5e1', '&:hover': { color: '#38bdf8' } }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton href="#" sx={{ color: '#cbd5e1', '&:hover': { color: '#38bdf8' } }}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href="#" sx={{ color: '#cbd5e1', '&:hover': { color: '#38bdf8' } }}>
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={6} textAlign="center" borderTop="1px solid #1e293b" pt={3}>
                    <Typography variant="body2" color="#64748b">
                        © {new Date().getFullYear()} YourCompany. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}
