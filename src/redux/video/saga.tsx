import { all, takeEvery, fork, put, select } from 'redux-saga/effects';
import actions from './actions';

// helper
import { APIServices, NotificationsService, setLocalData } from '../../utils';
import { key_const } from '../../const';

function* saga_LoadListVideo(action: any) {
    try {
        const { params } = action.payload;

        // init params
        let _pageIndex: Promise<any> = yield select(
            (state: any) => state.video.pageIndex,
        );
        let pageIndex: any = _pageIndex;
        let _pageSize: Promise<any> = yield select(
            (state: any) => state.video.pageSize,
        );
        let pageSize: any = _pageSize;

        // real params
        if (params.pageIndex) pageIndex = params.pageIndex;
        if (params.pageSize) pageSize = params.pageSize;

        const _isLoggedIn : Promise<any> = yield select(
            (state: any) => state.auth.isLoggedIn,
        );
        let isLoggedIn: any = _isLoggedIn;

        // call api
        let _response: Promise<any>;
        let response: any;
        if (isLoggedIn) {
            _response = yield APIServices.Video.GetListVideo(
                '',
                pageSize,
                pageIndex,
            );
            response = _response;
        } else {
            _response = yield APIServices.Video.GetListPublicVideo(
                '',
                pageSize,
                pageIndex,
            );
            response = _response;
        }

        let data: any = response.data;

        let entitys = data.items;
        yield put(actions.action.loadListVideoSuccess(entitys));

        // update pagesize, pageIndex
        yield put(
            actions.action.updateState({
                pageSize: data.size,
                pageIndex: data.page,
                total: data.total,
            }),
        );
    } catch (ex: any) {
        console.log('[Video] saga_LoadListVideo Error : ', ex.message);
    }
}

function* saga_UpdagePageSize(action: any) {
    try {
        let pageIndex = 1;
        let pageSize = action.payload.pageSize;

        yield put(
            actions.action.loadListVideo({
                pageIndex,
                pageSize,
            }),
        );
    } catch (ex: any) {
        console.log('[Video] saga_UpdagePageSize Error : ', ex.message);
    }
}

function* saga_UpdagePageIndex(action: any) {
    try {
        let pageIndex = action.payload.pageIndex;

        yield put(
            actions.action.loadListVideo({
                pageIndex,
            }),
        );
    } catch (ex: any) {
        console.log('[Video] saga_UpdagePageIndex Error : ', ex.message);
    }
}

function* saga_ShareVideo(action: any) {
    try {
        const { url, callback } = action.payload;

        yield APIServices.Video.ShareVideo(url);

        if (callback) callback();

        yield put(actions.action.loadListVideo({}));

        NotificationsService.success('Share video success');
    } catch (ex: any) {
        console.log('[Video] saga_ShareVideo Error : ', ex.message);
    }
}

function* saga_LikeVideo(action: any) {
    try {
        const { id } = action.payload;

        yield APIServices.Video.LikeVideo(id);

        yield put(actions.action.loadListVideo({}));
    } catch (ex: any) {
        console.log('[Video] saga_LikeVideo Error : ', ex.message);
    }
}

function* saga_DislikeVideo(action: any) {
    try {
        const { id } = action.payload;

        yield APIServices.Video.DislikeVideo(id);

        yield put(actions.action.loadListVideo({}));
    } catch (ex: any) {
        console.log('[Video] saga_DislikeVideo Error : ', ex.message);
    }
}

function* listen() {
    yield takeEvery(actions.type.LOAD_LIST_VIDEO, saga_LoadListVideo);
    yield takeEvery(actions.type.UPDATE_PAGE_SIZE, saga_UpdagePageSize);
    yield takeEvery(actions.type.UPDATE_PAGE_INDEX, saga_UpdagePageIndex);

    yield takeEvery(actions.type.SHARE_VIDEO, saga_ShareVideo);
    yield takeEvery(actions.type.LIKE_VIDEO, saga_LikeVideo);
    yield takeEvery(actions.type.DISLIKE_VIDEO, saga_DislikeVideo);
}

export default function* videoSaga() {
    yield all([fork(listen)]);
}
