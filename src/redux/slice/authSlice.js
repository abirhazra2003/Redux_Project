import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AxiosInstance } from "../../api/axios/axios";
import { endPoints } from "../../api/endpoints/endpoint";
import { useNavigate } from "react-router-dom";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuhenticated: false,
};



// ✅ Login
export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(endPoints.auth.signin, formData);
      let result = response?.data;
      console.log(result, 'result');


      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// ✅ Register
export const registerform = createAsyncThunk(
  "auth/registerform",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(endPoints.auth.signup, formData);
      let result = response?.data;
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);




export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (formData, { rejectWithValue }) => {
    try {
      let response = await AxiosInstance.post(endPoints.auth.verifyOtp, formData);
      let result = response?.data;
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Verify failed" }
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(endPoints.auth.updatePassword, formData);
      const result = response?.data;
      return result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Password update failed" }
      );
    }
  }
);


export const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user_token");
      localStorage.removeItem("email")
      localStorage.removeItem("user_id");
      localStorage.removeItem("name");
      toast.success("Logout Successful")
      state.isAuhenticated = false;
    },

    check_token: (state) => {
      let token = localStorage.getItem("user_token");
      if (token) {
        state.isAuhenticated = true;
      }
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === true) {
          localStorage.setItem("user_token", payload.token)
          localStorage.setItem("user_id", payload.user?.id);
          localStorage.setItem("name", payload.user.name)

          state.token = payload.token;
          state.user = payload.user;
          state.isAuhenticated = true;
          toast.success(payload.message)
        }
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
        toast.error(payload.message);
      })

      // Register
      .addCase(registerform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerform.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === true) {
          localStorage.setItem("email", payload.user.email)
          toast.success(payload.message)

        }

      })
      .addCase(registerform.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
        toast.error(payload.message);
      })

      // OTP Verify
      .addCase(verifyOtp.pending, (state) => {

      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {

      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.loading = false;

      })


      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === true) {

          toast.success(payload.message);
        }
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
        toast.error(payload.message);
      })
  },
});

export const { logout, check_token } = authSlice.actions;
export default authSlice.reducer;
