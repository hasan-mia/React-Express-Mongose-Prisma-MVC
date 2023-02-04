import config from './config';

const url = {};

// Auth / User Url
url.authRegister = `${config.baseUrl}/api/v1/auth/register`;
url.authLogin = `${config.baseUrl}/api/v1/auth/login`;
url.userInfo = `${config.baseUrl}/api/v1/auth/user`;

export default url;
