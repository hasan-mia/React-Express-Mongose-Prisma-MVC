/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from './config';
import url from './url';

const name = 'auth/';
const auth = {};
auth.auth = createAsyncThunk(`${name}auth`, async (phone) => {
    const res = await axios.post(url.auth, { phone }, config.basicHeader);
    return res;
});
export default auth;
