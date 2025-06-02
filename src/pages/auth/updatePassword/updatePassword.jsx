import React from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../redux/slice/authSlice";


const schema = yup.object().shape({

    password: yup
        .string()
        .min(6, "New password must be at least 6 characters")
        .required("New password is required"),

});

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.Auth);

    const use_id = localStorage.getItem("user_id")
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Form data submitted:");
        const payload = {
            user_id: use_id,
            password: data.password,
        };
        
        dispatch(updatePassword(payload));
    };



    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 10, mb: 10 }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: "#f5f7fa" }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Update Password
                    </Typography>

                    {/*  Email Display Field (Read-only) */}


                    <form >

                        <TextField
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            {...register("password")}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            color="primary"
                            fullWidth
                            sx={{ mt: 3, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default UpdatePassword;