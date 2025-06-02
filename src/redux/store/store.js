import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slice/authSlice";
import { cmsSlice } from "../slice/cmsSlice";


export const store = configureStore({
    reducer: {
        Auth: authSlice.reducer,
        Cms: cmsSlice.reducer,
    },
});
