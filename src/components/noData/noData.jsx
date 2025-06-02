import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

export default function NoData() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 3,
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 100, color: '#FF6F61', mb: 2 }} />

            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#333' }}>
                404 - Not Found
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, color: '#666' }}>
                Sorry, we couldn't find any data here.
            </Typography>

            <Button
                onClick={() => navigate('/')}
                variant="contained"
                sx={{
                    background: 'linear-gradient(135deg, #FF6F61, #FF4B2B)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #FF4B2B, #FF6F61)',
                    },
                }}
            >
                Go to Login Page
            </Button>
        </Box>
    );
}
