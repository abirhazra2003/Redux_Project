import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Avatar,
    IconButton,
    CircularProgress,
    Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerform } from "../../../redux/slice/authSlice";


const RegisterForm = () => {
    const dispatch = useDispatch();
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    });

    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.Auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        let Data = {
            "name": data.name,
            "email": data.email,
            "password": data.password
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await dispatch(registerform(Data)).unwrap();
            if (response) {
                navigate("/auth/otp");
            }
        } catch (error) {
            console.error("Registration failed", error);
        }


    };






    return (
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mt: 10,
                    mb: 6,
                    borderRadius: 4,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                }}
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Fill in your details to get started
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>


                    {/* Form Inputs */}
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        fullWidth
                        sx={{
                            fontWeight: 600,
                            borderRadius: "12px",
                            marginTop: "20px",
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
                            "Sign Up"
                        )}
                    </Button>

                    {/* Redirect to login */}
                    <Box mt={3} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <MuiLink component={Link} to="/" underline="hover" color="primary" fontWeight={500}>
                                Login here
                            </MuiLink>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default RegisterForm;
