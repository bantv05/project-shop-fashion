import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartArr',
    initialState: {
        cartArr: [],
    },
    reducers: {
        addProductCart: (state, action) => {
            const productIndex = state.cartArr.findIndex((p) => p.id === action.payload.id);
            if (productIndex !== -1) {
                state.cartArr[productIndex].quantity += 1;
            } else {
                state.cartArr.push({ ...action.payload, quantity: 1 });
            }
        },
        deleteProductCart: (state, action) => {
            state.cartArr = state.cartArr.filter((p) => p.id !== action.payload.id);
        },
        updateQuantity: (state, action) => {
            const productIndex = state.cartArr.findIndex((p) => p.id === action.payload.id);
            if (productIndex !== -1) {
                state.cartArr[productIndex].quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.cartArr = [];
        },
    },
});

export const { addProductCart, deleteProductCart,clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;