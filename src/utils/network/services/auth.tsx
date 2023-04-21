import createApiServices from '../createApiServices';

const api = createApiServices();

// auth
const login = (email = '', password = '') => {
    const body = {
        password: password,
        email: email,
    };
    return api.makeRequest({
        url: '/auth/login',
        method: 'POST',
        data: body,
    });
};

const register = (email = '', password = '') => {
    const body = {
        password: password,
        email: email,
    };
    return api.makeRequest({
        url: 'auth/register',
        method: 'POST',
        data: body,
    });
};

const getUserInfo = () => {
    return api.makeAuthRequest({
        url: 'auth/my-info',
        method: 'GET',
        data: {},
    });
};

export const Auth = {
    login,
    getUserInfo,
    register
};
