import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import videoSaga from './video/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        videoSaga()
    ]);
}
