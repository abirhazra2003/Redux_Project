import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slice/authSlice";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isAuhenticated } = useSelector((state) => state.Auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        const credentials = {
            email: data.email,
            password: data.password,
        };

        try {
            const response = await dispatch(login(credentials));
            if (response.payload.status === true) {
                navigate("/cms/dashboard");
            }
        } catch (error) {
            console.error("Login error", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 12, display: "flex", justifyContent: "center", marginBottom: "80px" }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 5,
                        borderRadius: 4,
                        width: "100%",
                        maxWidth: 420,
                        bgcolor: "#f9fafc",
                        boxShadow: "0px 10px 25px rgba(0,0,0,0.05)",
                    }}
                >
                    <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Please enter your credentials to log in.
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            {...register("email")}
                            error={Boolean(errors?.email)}
                            helperText={errors.email?.message}
                            sx={{ bgcolor: "#fff", borderRadius: 1 }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            variant="outlined"
                            {...register("password")}
                            error={Boolean(errors?.password)}
                            helperText={errors.password?.message}
                            sx={{ bgcolor: "#fff", borderRadius: 1 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            fullWidth
                            sx={{
                                fontWeight: 600,
                                borderRadius: "12px",
                                mt: 1,
                                height: 50,
                                backgroundColor: "#ff6f00",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#388E3C",
                                },
                                boxShadow: "0 6px 18px rgba(255,111,0,0.3)",
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Don&apos;t have an account?{" "}
                        <MuiLink
                            component={Link}
                            to="/auth/register"
                            underline="hover"
                            color="primary"
                            fontWeight={500}
                        >
                            SignUp here
                        </MuiLink>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginForm;
