import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        listTransport: {
            currentTransport: null,
            isFetching: false,
            error: false
        },
        listDiscount: {
            currentDiscount: null,
            isFetching: false,
            error: false
        },

        listStatusOrder: {
            currentStatusOrder: null,
            isFetching: false,
            error: false
        },


    },
    reducers: {
        listTransportStart: (state) => {
            state.listTransport.isFetching = true
        },
        listTransportSuccess: (state, action) => {
            state.listTransport.isFetching = false
            state.listTransport.currentTransport = action.payload;
            state.listTransport.error = false;
        },
        listTransportError: (state) => {
            state.listTransport.isFetching = false
            state.listTransport.error = true;
        },

        listDiscountStart: (state) => {
            state.listDiscount.isFetching = true
        },
        listDiscountSuccess: (state, action) => {
            state.listDiscount.isFetching = false
            state.listDiscount.currentDiscount = action.payload;
            state.listDiscount.error = false;
        },
        listDiscountError: (state) => {
            state.listDiscount.isFetching = false
            state.listDiscount.error = true;
        },

        listStatusOrderStart: (state) => {
            state.listStatusOrder.isFetching = true
        },
        listStatusOrderSuccess: (state, action) => {
            state.listStatusOrder.isFetching = false
            state.listStatusOrder.currentStatusOrder = action.payload;
            state.listStatusOrder.error = false;
        },
        listStatusOrderError: (state) => {
            state.listStatusOrder.isFetching = false
            state.listStatusOrder.error = true;
        }
    }
})

export const {
    listTransportStart,
    listTransportSuccess,
    listTransportError,
    listDiscountStart,
    listDiscountSuccess,
    listDiscountError,
    listStatusOrderStart,
    listStatusOrderSuccess,
    listStatusOrderError
} = orderSlice.actions;
export default orderSlice.reducer;