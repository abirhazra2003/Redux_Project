import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { edit, update } from '../../../redux/slice/cmsSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.Cms);

    const { editData } = useSelector((state) => state.Cms);

    const { id } = useParams();

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
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const ClickFunction = async (fetchedData) => {
        let formData = {
            name: fetchedData.name,
            price: fetchedData.price,
            description: fetchedData.description,
            category: fetchedData.category,
        };

        try {
            if (id) {
                await new Promise((resolve) => setTimeout(resolve, 1500));
                const response = await dispatch(update({ id, formData })).unwrap();
                if (response) {
                    navigate("/cms/dashboard");
                }
            }
        } catch (error) {
            console.error("Product Update failed", error);
        }
    }


    useEffect(() => {
        if (editData) {
            setValue("name", editData.name);
            setValue("price", editData.price);
            setValue("description", editData.description);
            setValue("category", editData.category);
        }
    }, [editData, setValue]);

    useEffect(() => {
        dispatch(edit(id));
    }, [dispatch]);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "100vh",
                background: "#f3f4f6",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
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
                    Update Product
                </Typography>

                <form onSubmit={handleSubmit(ClickFunction)} encType="multipart/form-data">
                    <Stack spacing={3}>
                        <TextField
                            {...register("name")}
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                },
                            }}
                        />

                        <TextField
                            {...register("price")}
                            variant="outlined"
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                },
                            }}
                        />

                        <TextField
                            {...register("description")}
                            multiline
                            rows={3}
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                },
                            }}
                        />

                        <TextField
                            {...register("category")}
                            variant="outlined"
                            error={!!errors.category}
                            helperText={errors.category?.message}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ddd',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#ff6f00',
                                    },
                                },
                            }}
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
                                "Update Product"
                            )}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Grid>
    );
}