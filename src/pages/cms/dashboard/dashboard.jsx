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
    Avatar,
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
       
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'price',
            headerName: 'Price',
            width: 120,
            renderCell: (params) => (
                <Typography fontWeight="bold" color="primary">
                    ₹ {params.value}
                </Typography>
            ),
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
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
            renderCell: (params) => (
                <Typography
                    variant="caption"
                    sx={{
                        backgroundColor: '#E8F5E9',
                        color: '#388E3C',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
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
            width: 180,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit" arrow>
                        <Button
                            href={`/cms/edit/${params.row._id}`}
                            startIcon={<EditIcon />}
                            size="small"
                            sx={{
                                background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                                color: '#fff',
                                textTransform: 'none',
                                px: 2,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
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
                                background: 'linear-gradient(135deg, #FF6F61, #FF4B2B)',
                                color: '#fff',
                                textTransform: 'none',
                                px: 2,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #FF4B2B, #FF6F61)',
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
        id: index, // required for DataGrid
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
                        background: 'linear-gradient(to bottom, #fff, #f3f4f6)',
                    }}
                >
                    <CircularProgress size={60} sx={{ color: '#FF6F61' }} />
                </Box>
            ) : (
                <Fade in timeout={500}>
                    <Box
                        sx={{
                            px: { xs: 2, md: 6 },
                            py: { xs: 4, md: 6 },
                            minHeight: '100vh',
                            background: 'linear-gradient(to bottom, #ffffff, #f5f7fa)',
                        }}
                    >
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mb={4}
                            textAlign="center"
                            sx={{ color: '#333' }}
                        >
                            Product Dashboard
                        </Typography>

                        <Box sx={{ height: 600, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10, 20, 50]}
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            />
                        </Box>

                        {open && (
                            <SweetAlertComponent
                                open={open}
                                confirm={handleDelete}
                                cancel={() => setOpen(false)}
                                title="Are you sure?"
                                subtitle="You will not be able to recover this product!"
                            />
                        )}
                    </Box>
                </Fade>
            )}
        </>
    );
}
