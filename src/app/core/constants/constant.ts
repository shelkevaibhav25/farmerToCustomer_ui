
export const GlobalConstant = {
    LOCAL_LOGIN_KEY:"farmerLoginData",
    TOKEN_KEY: 'farmer_token',
    API_ENDPOINTS:{
        LOGIN:'farmerUsers/login',
        GET_USERS:"farmerUsers/get-all-users",
        GET_USER_BY_ID:'getUser?id=',
        GET_ROLES: 'farmerRoles/get-all-roles',
        CREATE_USER:'farmerUsers/create-user',

        CREATE_CATEGORY:"farmerCategories/create-category",
        CREATE_ROLE:'farmerRoles/create-role',
        GET_CATEGORY:'farmerCategories/get-all-categories',
        GET_ROLE:'farmerRoles/get-all-roles',
        UPDATE_ROLE:'farmerRoles/update-role/',
        UPDATE_CATEGORY:'farmerCategories/update-category/',

        GET_ALL_FARMER_PRODUCTS_BYCATID:'farmerFarmerProducts/getFarmerProductByCateId?categoryId=',
        GET_FARMER_PRODUCTS:'farmerFarmerProducts/get-all-farmer-products-with-joins',
        GET_FARMER_PRODUCTS_BYID:'farmerFarmerProducts/get-farmer-products-by-farmer/',
        CREATE_FARMER_PRODUCT:'farmerFarmerProducts/create-farmer-product',
        UPDATE_FARMER_PRODUCT:'farmerFarmerProducts/update-farmer-product/',
        DELETE_FARMER_PRODUCT:'farmerFarmerProducts/delete-farmer-product/',
        GET_PRODUCT_MASTER_PRODUCTS:'farmerProducts/get-all-products-with-joins',
        CREATE_MASTER_PRODUCT:'farmerProducts/create-product',
        UPDATE_MASTER_PRODUCT:'farmerProducts/update-product/',
        DELETE_MASTER_PRODUCT:'farmerProducts/delete-product/',

        ADD_TO_CART:"farmerCart/add-to-cart",
        GET_CART_ITEMS:"farmerCart/get-cart-by-customer-with-joins/",
        DELETE_CART_ITEM_BY_CARTID:"farmerCart/delete-cart/",

        PLACE_ORDER:"farmerOrders/create-order"

        
    },
    VALIDATION_MESSAGE:{
        REQUIRED:"This is Required",
        MOBILE:'Max and Min 10 Char Needed'
    }
}
