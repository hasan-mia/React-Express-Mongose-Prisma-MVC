import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './config';
import url from './url';

const name = 'auth';
const auth = {};
auth.authRegister = createAsyncThunk(`${name}/authRegister`, async () => {
    const res = await axios.post(url.authRegister, config.basicHeader);
    return res;
});
auth.authLogin = createAsyncThunk(`${name}/authLogin`, async () => {
    const res = await axios.post(url.authLogin, config.basicHeader);
    return res;
});
auth.userInfo = createAsyncThunk(`${name}/userInfo`, async (id) => {
    const res = await axios.get(url.userInfo, config.paramsWithHeader({ id }));
    return res;
});
// auth.userLogout = async () => {
//     const res = await axios
//         .get(url.userLogout, config.authHeader(config.token()))
//         .then((response) => response)
//         .catch((error) => error.response);
//     return res;
// };
export default auth;
