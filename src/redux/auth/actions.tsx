const prefix = 'auth/';

const type = {
    UPDATE_STATE: prefix + 'update_state',

    LOGIN: prefix + 'LOGIN',
    LOGOUT: prefix + 'LOGOUT',
    REGISTER: prefix + 'REGISTER',

    CHECK_SESSION: prefix + 'check_session',

    RESET_STATE: prefix + 'reset_state'
};

const action = {
    updateState: (state = {}) => {
        return {
            type: type.UPDATE_STATE,
            payload: {
                state,
            },
        };
    },

    login: (email = '', password = '') => {
        return {
            type: type.LOGIN,
            payload: {
                email,
                password,
            },
        };
    },
    register: (email = '', password = '') => {
        return {
            type: type.REGISTER,
            payload: {
                email,
                password,
            },
        };
    },
    logout: () => {
        return {
            type: type.LOGOUT,
            payload: {},
        };
    },

    checkSession: () => {
        return {
            type: type.CHECK_SESSION,
            payload: {},
        };
    },

    resetState: () => {
        return {
            type: type.RESET_STATE,
            payload: {},
        };
    },
};

export const AuthActions = action;

export default {
    type,
    action,
};
