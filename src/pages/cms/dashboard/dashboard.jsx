import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard, deleteProduct } from '../../../redux/slice/cmsSlice';
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Stack,
    Tooltip,
    Typography,
    Paper,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SweetAlertComponent from '../../../components/sweetAlert/sweetAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { userList, loading } = useSelector((state) => state.Cms);
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(dashboard());
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteProduct(selectedId)).then(() => {
            dispatch(dashboard());
        });
        setOpen(false);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Product Name',
            width: 220,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Typography fontWeight={600} color="primary">
                    ₹ {params.value}
                </Typography>
            ),
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 260,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Typography variant="body2" color="text.secondary" noWrap>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <Typography
                    variant="caption"
                    sx={{
                        backgroundColor: '#e1f5fe',
                        color: '#0277bd',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600,
                    }}
                >
                    {params.value}
                </Typography>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 190,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit" arrow>
                        <Button
                            href={`/cms/edit/${params.row._id}`}
                            startIcon={<EditIcon />}
                            size="small"
                            sx={{
                                background: 'linear-gradient(45deg, #66bb6a, #388e3c)',
                                color: '#fff',
                                textTransform: 'none',
                                px: 2,
                                boxShadow: 1,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #388e3c, #66bb6a)',
                                },
                            }}
                        >
                            Edit
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                        <Button
                            onClick={() => {
                                setSelectedId(params.row._id);
                                setOpen(true);
                            }}
                            startIcon={<DeleteIcon />}
                            size="small"
                            sx={{
                                background: 'linear-gradient(45deg, #ef5350, #d32f2f)',
                                color: '#fff',
                                textTransform: 'none',
                                px: 2,
                                boxShadow: 1,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #d32f2f, #ef5350)',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    const rows = userList?.map((item, index) => ({
        id: index,
        ...item,
    }));

    return (
        <>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
                    }}
                >
                    <CircularProgress size={60} sx={{ color: '#26a69a' }} />
                </Box>
            ) : (
                <Fade in timeout={500}>
                    <Box
                        sx={{
                            px: { xs: 2, md: 6 },
                            py: { xs: 4, md: 6 },
                            minHeight: '100vh',
                            background: 'linear-gradient(to bottom right, #fafafa, #e0f2f1)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mb={4}
                            textAlign="center"
                            sx={{
                                color: '#004d40',
                                letterSpacing: 1,
                                textShadow: '1px 1px #cfd8dc',
                            }}
                        >
                            Product Dashboard
                        </Typography>

                        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 20, 50]}
                                sx={{
                                    backgroundColor: '#fff',
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: '#e0f2f1',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        color: '#004d40',
                                    },
                                    '& .MuiDataGrid-cell': {
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                    },
                                    '& .MuiDataGrid-cell:hover': {
                                        backgroundColor: '#f1f8e9',
                                    },
                                }}
                            />
                        </Paper>

                        {open && (
                            <SweetAlertComponent
                                open={open}
                                confirm={handleDelete}
                                cancel={() => setOpen(false)}
                                title="Are you sure?"
                                subtitle="This action cannot be undone!"
                            />
                        )}
                    </Box>
                </Fade>
            )}
        </>
    );
}
