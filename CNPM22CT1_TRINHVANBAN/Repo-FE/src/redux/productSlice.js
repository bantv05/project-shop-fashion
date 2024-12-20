import {createSlice} from '@reduxjs/toolkit'
export const productSlice = createSlice({
    name: 'productsReducer',
    initialState: {
        product: {
            currentProduct: null,
            isFetching: false,
            error: false
        },
        listProducts: {
            currentListProduct: null,
            isFetching: false,
            error: false
        },
        newProduct: {
            data: null,
            isFetching: false,
            error: false
        }

    },
    reducers: {
        createProductStart: (state) => {
            state.product.isFetching = true;
        },
        createProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.currentProduct = action.payload;
            state.product.error = false;

            state.newProduct.isFetching = false;
            state.newProduct.data = action.payload;
            state.newProduct.error = false;
        },
        createProductError: (state) => {
            state.product.isFetching = false;
            state.product.error = true;
        },

        listProductsStart: (state) => {
            state.listProducts.isFetching = true;
        },
        listProductsSuccess: (state, action) => {
            console.log("Payload received in createProductSuccess:", action.payload);
            state.listProducts.isFetching = false;
            state.listProducts.currentListProduct = action.payload;
            state.listProducts.totalPages = action.payload.totalPages;
            state.listProducts.totalElements = action.payload.totalElements;
            state.listProducts.error = false;
        },
        listProductsError: (state) => {
            state.listProducts.isFetching = false;
            state.listProducts.error = true;
        },

    }
})

export const {
    createProductStart,
    createProductSuccess,
    createProductError,
    listProductsStart,
    listProductsSuccess,
    listProductsError
} = productSlice.actions;

export default productSlice.reducer;