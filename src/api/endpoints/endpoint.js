import ProductCreate from "../../pages/cms/productCreate/productCreate";

export const endPoints = {
    auth: {
        signin: `/login/user`,
        signup: `/create/user`,
        verifyOtp: `/verify-otp`,
        updatePassword: `/update/password`,
    },

    cms: {
        ProductCreate: `/user/create/product`,
        dashboard: `/get/product`,
        delete: `/delete/product`,
        update: `/update/product`,
        edit: `/get/product`
    }

}

