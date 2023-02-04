const config = {};
config.baseUrl = process.env.REACT_APP_BASE_URL;
config.authorization = process.env.REACT_APP_AUTH_KEY;

config.basicHeader = {
    headers: {
        'Content-Type': 'application/json',
        authorization: config.authorization,
    },
};
config.paramsWithHeader = (param) => {
    const params = {
        params: param,
        headers: {
            'Content-Type': 'application/json',
            authorization: config.authorization,
        },
    };
    return params;
};
config.authHeader = (token) => {
    const header = {
        headers: {
            'Content-Type': 'application/json',
            authorization: config.authorization,
            token,
        },
    };
    return header;
};
// config.token = () => {
//     const session = localStorage.getItem('session');
//     let user = null;
//     if (session) {
//         user = JSON.parse(helpers.decrypt(session));
//     }
//     return user.token;
// };

export default config;
