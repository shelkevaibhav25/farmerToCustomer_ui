
export const GlobalConstant = {
    LOCAL_LOGIN_KEY:"farmerLoginData",
    TOKEN_KEY: 'farmer_token',
    API_ENDPOINTS:{
        LOGIN:'farmerUsers/login',
        GET_USER_BY_ID:'getUser?id=',
        GET_ROLES: 'farmerRoles/get-all-roles',
        CREATE_USER:'farmerUsers/create-user',
        CREATE_CATEGORY:"farmerCategories/create-category",
        CREATE_ROLE:'farmerRoles/create-role',
        GET_CATEGORY:'farmerCategories/get-all-categories',
        GET_ROLE:'farmerRoles/get-all-roles',
        UPDATE_ROLE:'farmerRoles/update-role/',
        UPDATE_CATEGORY:'farmerCategories/update-category/',
        GET_FARMER_PRODUCTS:'farmerProducts/get-all-farmer-products',
        CREATE_FARMER_PRODUCT:'farmerProducts/create-farmer-product',
        UPDATE_FARMER_PRODUCT:'farmerProducts/update-farmer-product/',
        DELETE_FARMER_PRODUCT:'farmerProducts/delete-farmer-product/',
        GET_PRODUCT_MASTER_PRODUCTS:'farmerProducts/get-all-products-with-joins',
        CREATE_MASTER_PRODUCT:'farmerProducts/create-product',
        UPDATE_MASTER_PRODUCT:'farmerProducts/update-product/',
        DELETE_MASTER_PRODUCT:'farmerProducts/delete-product/'
        
    },
    VALIDATION_MESSAGE:{
        REQUIRED:"This is Required",
        MOBILE:'Max and Min 10 Char Needed'
    }
}
