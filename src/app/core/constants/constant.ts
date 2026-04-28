
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
        UPDATE_CATEGORY:'farmerCategories/update-category/'
        
    },
    VALIDATION_MESSAGE:{
        REQUIRED:"This is Required",
        MOBILE:'Max and Min 10 Char Needed'
    }
}