/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import auth from '../api/auth';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isError: false,
        user: null,
    },

    extraReducers: (builder) => {
        // register attempt
        builder.addCase(auth.authRegister.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.authRegister.fulfilled, (state) => {
            state.isLoading = false;
            state.issetPhone = true;
        });

        builder.addCase(auth.authRegister.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        // login attempt
        builder.addCase(auth.authLogin.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.authLogin.fulfilled, (state) => {
            state.isLoading = false;
            state.issetPhone = true;
        });

        builder.addCase(auth.authLogin.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

        // user infos
        builder.addCase(auth.userInfo.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.userInfo.fulfilled, (state, action) => {
            const { data } = action.payload;
            state.isLoading = false;
            state.user = data;
        });

        builder.addCase(auth.userInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action);
        });
    },
});
export const { authUser, logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
