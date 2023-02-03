import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Slice/AuthSlice';
import CartSlice from './Slice/CartSlice';

const Store = configureStore({
    reducer: {
        cart: CartSlice,
        auth: AuthSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/authConfirm/fulfilled', 'auth/userInfo/fulfilled'],
            },
        }),
});
export default Store;
