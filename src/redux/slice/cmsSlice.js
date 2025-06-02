import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../api/axios/axios";
import { endPoints } from "../../api/endpoints/endpoint";

const initialState = {
    loading: false,
    error: null,
    fetchedData: null,
    userList: [{}],
    editData: {},
};

export const createProduct = createAsyncThunk(
    "createProduct",
    async (formData, { rejectWithValue }) => {
        try {
            let response = await AxiosInstance.post(endPoints.cms.ProductCreate, formData);
            let result = response?.data;
            return result;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Product creation failed" }
            );
        }
    }
);


export const dashboard = createAsyncThunk("dash", async () => {
    let response = await AxiosInstance.get(endPoints.cms.dashboard);
    let result = response?.data;
    return result;
});

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.delete(`${endPoints.cms.delete}/${formData}`);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Delete failed!');
        }
    }
);

export const update = createAsyncThunk(
    "update",
    async ({ id, formData }) => {
        console.log(formData, "jj");

        let response = await AxiosInstance.put(`${endPoints.cms.update}/${id}`, formData);
        let result = response?.data;
        return result;
    }
);

export const edit = createAsyncThunk(
    'edit',
    async (id, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(`${endPoints.cms.edit}/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Update failed');
        }
    }
);

export const cmsSlice = createSlice({
    name: "cms",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {

        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                if (payload.status === true) {
                    toast.success(payload.message)
                    state.loading = false;
                }
            })
            .addCase(createProduct.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload.message;
                toast.error(payload.message);
            })


            .addCase(dashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dashboard.fulfilled, (state, { payload }) => {
                if (payload.status === true) {
                    state.loading = false;
                    state.userList = payload.product;
                }
            })
            .addCase(dashboard.rejected, (state, { payload }) => {
                state.loading = false;
            })


            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                if (payload.status === true) {
                    state.userList = payload.product;
                    state.loading = false;
                    toast.success(payload.message)
                }
            })
            .addCase(deleteProduct.rejected, (state, { payload }) => {
                state.loading = false;
                toast.error(payload.message)
            })


            .addCase(update.pending, (state) => {
                state.loading = true;

            })
            .addCase(update.fulfilled, (state, { payload }) => {
                if (payload.status === true) {
                    toast.success(payload.message)
                }
            })
            .addCase(update.rejected, (state, { payload }) => {
                state.loading = false;
                toast.error(payload.message);
            })

            .addCase(edit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(edit.fulfilled, (state, { payload }) => {
                if (payload.status === true) {
                    state.loading = false;
                    toast.success(payload.message)
                    state.editData = payload.product;
                }
            })
            .addCase(edit.rejected, (state, { payload }) => {
                state.loading = false;
                toast.error(payload.message)
            })
    },
});

export default cmsSlice.reducer;
