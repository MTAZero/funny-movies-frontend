import { all, takeEvery, fork, put, select } from 'redux-saga/effects';
import actions from './actions';
import videoActions from '../video/actions';

// helper
import { APIServices, NotificationsService, setLocalData } from '../../utils';
import { key_const } from '../../const';

function* saga_Login(action: any) {
    try {
        const { email, password } = action.payload;

        let LoginResponse: Promise<any> = yield APIServices.Auth.login(
            email,
            password,
        );
        let response: any = LoginResponse;
        response = response.data;

        if (response.access_token) {
            let sessionKey = response.access_token;
            setLocalData(key_const.session_key, sessionKey);
            const userInfo = response.user;

            // login success
            yield put(
                actions.action.updateState({
                    session_key: sessionKey,
                    isLoggedIn: true,
                    isLoading: false,
                    userInfo,
                    current_user_info: userInfo,
                }),
            );

            yield put(videoActions.action.loadListVideo());

            NotificationsService.success('Login success', '');
        } else {
            NotificationsService.error('Login Error');
        }
    } catch (ex: any) {
        console.log('[Auth] Login Error : ', ex.message);

        // login error
        yield put(actions.action.register(action.payload.email, action.payload.password));
    }
}

function* saga_Register(action: any) {
    try {
        const { email, password } = action.payload;

        let _response: Promise<any> = yield APIServices.Auth.register(
            email,
            password,
        );
        let response: any = _response;
        response = response.data;

        if (response.access_token) {
            let sessionKey = response.access_token;
            setLocalData(key_const.session_key, sessionKey);
            const userInfo = response.user;

            // login success
            yield put(
                actions.action.updateState({
                    session_key: sessionKey,
                    isLoggedIn: true,
                    isLoading: false,
                    userInfo,
                    current_user_info: userInfo,
                }),
            );

            NotificationsService.success('Register success', 'Thông báo');
        } else {
            NotificationsService.error('Register Error');
        }
    } catch (ex: any) {
        console.log('[Auth] saga_Register Error : ', ex.message);

        // login error
        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
                isLoading: false,
            }),
        );

        NotificationsService.error(
            'Email or Password incorrect',
            'Login Error',
        );
    }
}

function* saga_Logout() {
    try {
        setLocalData(key_const.session_key, null);
        NotificationsService.success('Logout success', 'Goodbye', 'top-center');

        yield put(actions.action.resetState());

        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
                isLoading: false,
            }),
        );

        yield put(videoActions.action.loadListVideo());
    } catch (ex: any) {
        console.log('[Auth] Logout Error : ', ex.message);
    }
}

function* saga_CheckSessionKey() {
    try {
        let _req: Promise<any> = yield APIServices.Auth.getUserInfo();
        let req: any = _req;

        let userInfo = req.data;

        yield put(
            actions.action.updateState({
                userInfo,
                current_user_info: userInfo,
            }),
        );
    } catch (ex: any) {
        console.log('[Auth] saga_CheckSessionKey error : ', ex.message);

        yield put(
            actions.action.updateState({
                session_key: null,
                isLoggedIn: false,
                userInfo: null,
            }),
        );
        setLocalData(key_const.session_key, null);
    }
}

function* listen() {
    yield takeEvery(actions.type.LOGIN, saga_Login);
    yield takeEvery(actions.type.REGISTER, saga_Register);

    yield takeEvery(actions.type.CHECK_SESSION, saga_CheckSessionKey);
    yield takeEvery(actions.type.LOGOUT, saga_Logout);
}

export default function* authSaga() {
    yield all([fork(listen)]);
}
