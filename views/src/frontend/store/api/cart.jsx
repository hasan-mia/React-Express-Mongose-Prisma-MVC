import axios from 'axios';
import config from './config';
import url from './url';

const cart = {};
// product order by cod
cart.productOrderByCod = async (credentials) => {
    const res = axios
        .post(url.productOrderByCod, credentials, config.authHeader(config.token()))
        .then((response) => response)
        .catch((error) => error.response);
    return res;
};
// product order by card
cart.productOrderByCard = async (credentials) => {
    const res = axios
        .post(url.productOrderByCard, credentials, config.authHeader(config.token()))
        .then((response) => response)
        .catch((error) => error.response);
    return res;
};
// product order by bkash
cart.productOrderBkash = async (credentials) => {
    const res = axios
        .post(url.productOrderBkash, credentials, config.authHeader(config.token()))
        .then((response) => response)
        .catch((error) => error.response);
    return res;
};
cart.productOrderBkashExecute = async (paymentId) => {
    const res = axios
        .get(url.productOrderBkashExecute + paymentId, config.authHeader(config.token()))
        .then((response) => response)
        .catch((error) => error.response);
    return res;
};
cart.productOrderBkashCancel = async (paymentId) => {
    const res = axios
        .get(url.productOrderBkashCancel + paymentId, config.authHeader(config.token()))
        .then((response) => response)
        .catch((error) => error.response);
    return res;
};
export default cart;
