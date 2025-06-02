import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    Slide,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SweetAlertComponent({ confirm, cancel, title, subtitle, open }) {
    return (
        <Dialog
            open={open}
            onClose={cancel}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    px: 3,
                    py: 2,
                    textAlign: 'center',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <WarningAmberRoundedIcon sx={{ fontSize: 60, color: '#FF6F61' }} />
            </Box>

            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#d32f2f' }}>
                {title}
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ fontSize: '1rem', color: '#555', mt: 1 }}>
                    {subtitle}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', mt: 3 }}>
                <Button
                    onClick={cancel}
                    variant="outlined"
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        px: 4,
                        fontWeight: 600,
                    }}
                >
                    Cancel
                </Button>

                <Button
                    onClick={confirm}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(135deg, #FF6F61, #FF4B2B)',
                        color: '#fff',
                        borderRadius: '999px',
                        textTransform: 'none',
                        px: 4,
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(255, 111, 97, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #FF4B2B, #FF6F61)',
                        },
                    }}
                >
                    Yes, delete it
                </Button>
            </DialogActions>
        </Dialog>
    );
}
