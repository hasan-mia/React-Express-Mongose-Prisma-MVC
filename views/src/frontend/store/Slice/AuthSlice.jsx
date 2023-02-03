/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import auth from '../api/auth';
// import { signOut } from 'firebase/auth';
// import googleAuth from '../firebase/firebase';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isError: false,
        errors: null,
        message: null,
        isSuccess: false,
        issetPhone: false,
        user: null,
        userInfo: null,
    },
    reducers: {
        authUser: (state) => {
            const session = localStorage.getItem('session');
            if (session) {
                state.user = JSON.parse(helpers.decrypt(session));
            }
        },
        logOut: (state) => {
            state.user = null;
            state.userInfo = null;
            localStorage.removeItem('session');
            signOut(googleAuth);
        },
    },
    extraReducers: (builder) => {
        // login attempt
        builder.addCase(auth.auth.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.auth.fulfilled, (state) => {
            state.isLoading = false;
            state.issetPhone = true;
        });

        builder.addCase(auth.auth.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        // login confirmation
        builder.addCase(auth.authConfirm.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(auth.authConfirm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.issetPhone = true;
            const { response, data } = action.payload;
            if (response) {
                const { status, data: error } = response;
                if (status === 422) {
                    state.errors = error;
                }
                if (status === 406) {
                    state.message = 'Something went wrong? Please Try again';
                }
            } else {
                state.isSuccess = true;
                localStorage.setItem('session', helpers.encrypt(JSON.stringify(data)));
            }
        });

        builder.addCase(auth.authConfirm.rejected, (state) => {
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
            state.userInfo = data;
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
