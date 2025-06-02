import React from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Grid,
    CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/slice/cmsSlice";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.Cms);

    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        price: yup.string().required("Price is required"),
        description: yup.string().required("Description is required"),
        category: yup.string().required("Category is required"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const ClickFunction = async (data) => {
        const productData = {
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
        };
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const response = await dispatch(createProduct(productData)).unwrap();
            if (response) {
                navigate("/cms/dashboard");
            }
        } catch (error) {
            console.error("Product Creation failed", error);
        }

        reset();
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "100vh",
                background: "#f5f5f5",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    px: 4,
                    py: 5,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    textAlign="center"
                    sx={{ color: "#333" }}
                >
                    Create Product
                </Typography>

                <form onSubmit={handleSubmit(ClickFunction)} encType="multipart/form-data">
                    <Stack spacing={3}>
                        <TextField
                            {...register("name")}
                            label="Product Name"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                        />

                        <TextField
                            {...register("price")}
                            label="Product Price"
                            variant="outlined"
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            fullWidth
                        />

                        <TextField
                            {...register("description")}
                            label="Product Description"
                            multiline
                            rows={2}
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            fullWidth
                        />

                        <TextField
                            {...register("category")}
                            label="Product Category"
                            variant="outlined"
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            sx={{
                                fontWeight: 600,
                                borderRadius: "10px",
                                height: 50,
                                backgroundColor: "#ff6f00",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#388E3C",
                                },
                                boxShadow: "0 4px 12px rgba(255,111,0,0.3)",
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Create Product"
                            )}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Grid>
    );
};

export default ProductCreate;
