import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import reducer thay vì authSlice (slice bao gồm cả actions và reducer)
import productSlice from './productSlice';
import userSlice from './userSlice';
import listSlice from './listSlice';
import cartSlices from './cartSlice';
import getSlice from './getByIdSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import order from "./orderSlice";

const persistConfig = {
    key: "root",
    storage,
};
const userReducer = combineReducers({
    auth: authReducer,
    productsReducer: productSlice,
    list: listSlice,
    getById: getSlice,
    users: userSlice,
    order: order,
    cart: cartSlices
})
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

