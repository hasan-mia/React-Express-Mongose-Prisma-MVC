import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Slice/AuthSlice';
import CartSlice from './Slice/CartSlice';

const Store = configureStore({
    reducer: {
        auth: AuthSlice,
        cart: CartSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'auth/authRegister/fulfilled',
                    'auth/authLogin/fulfilled',
                    'auth/userInfo/fulfilled',
                ],
            },
        }),
});
export default Store;
