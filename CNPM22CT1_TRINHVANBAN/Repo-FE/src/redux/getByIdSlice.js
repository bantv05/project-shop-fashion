import { createSlice } from '@reduxjs/toolkit';

export const getBySlice = createSlice({
    name: 'getById',
    initialState: {
        byProduct: {
            currentList: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        byProductStart: (state) => {
            state.byProduct.isFetching = true;
        },
        byProductSuccess: (state, action) => {
            state.byProduct.isFetching = false;
            state.byProduct.currentUser = action.payload;
            state.byProduct.error = false;
        },
        byProductError: (state) => {
            state.byProduct.isFetching = false;
            state.byProduct.error = true;
        },
    },
});

export const {
    byProductStart,
    byProductSuccess,
    byProductError,
} = getBySlice.actions;

export default getBySlice.reducer;