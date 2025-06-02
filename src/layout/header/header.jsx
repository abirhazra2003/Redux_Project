import * as React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Tooltip,
    MenuItem,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';

const pages = ['Dashboard', 'Create'];

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuhenticated } = useSelector((state) => state.Auth);
    const name = localStorage.getItem("name");

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        handleCloseUserMenu();
    };

    const handleUpdatePassword = () => {
        navigate('/auth/updatePassword');
        handleCloseUserMenu();
    };

    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(90deg, #388E3C 0%, #2A2F45 100%)',
                boxShadow: '0 4px 20px rgba(0, 191, 166, 0.2)',
                borderBottom: '2px solid #00BFA6',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    {/* Logo - Desktop */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        <AdbIcon sx={{ color: '#00BFA6', mr: 1 }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                color: '#E0E0E0',
                                fontWeight: 700,
                                textDecoration: 'none',
                                letterSpacing: '.1rem',
                                '&:hover': { color: '#64FFDA' },
                            }}
                        >
                            {name}
                        </Typography>
                    </Box>

                    {/* Logo - Mobile */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                        <AdbIcon sx={{ color: '#00BFA6', mr: 1 }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                color: '#E0E0E0',
                                fontWeight: 700,
                                textDecoration: 'none',
                                letterSpacing: '.1rem',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 2 }}>
                        {isAuhenticated &&
                            pages.map((page) => (
                                <MenuItem key={page}>
                                    <Typography
                                        component={Link}
                                        to={`/cms/${page.toLowerCase()}`}
                                        sx={{
                                            color: '#E0E0E0',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            '&:hover': {
                                                color: '#64FFDA',
                                            },
                                        }}
                                    >
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}

                        {/* Avatar and Dropdown */}
                        {isAuhenticated && (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleUpdatePassword}>
                                        <Typography textAlign="center">Update Password</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center" color="error">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
