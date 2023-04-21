const prefix = 'video/';

const type = {
    UPDATE_STATE: prefix + 'update_state',

    LOAD_LIST_VIDEO: prefix + 'load_list_video',
    LOAD_LIST_VIDEO_SUCCESS: prefix + 'load_list_video_success',

    UPDATE_PAGE_INDEX: prefix + 'update_page_index',
    UPDATE_PAGE_SIZE: prefix + 'update_page_size',

    SHARE_VIDEO: prefix + 'share_video',
    LIKE_VIDEO: prefix + 'like_video',
    DISLIKE_VIDEO: prefix + 'dislike_video',
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

    loadListVideo: (params = {}) => {
        return {
            type: type.LOAD_LIST_VIDEO,
            payload: {
                params,
            },
        };
    },
    loadListVideoSuccess: (videos = []) => {
        return {
            type: type.LOAD_LIST_VIDEO_SUCCESS,
            payload: {
                videos,
            },
        };
    },

    updatePageSize: (pageSize = 10) => {
        return {
            type: type.UPDATE_PAGE_SIZE,
            payload: {
                pageSize,
            },
        };
    },
    updatePageIndex: (pageIndex = 1) => {
        return {
            type: type.UPDATE_PAGE_INDEX,
            payload: {
                pageIndex,
            },
        };
    },
    shareVideo: (url = '', callback: any = () => {}) => {
        return {
            type: type.SHARE_VIDEO,
            payload: {
                url,
                callback,
            },
        };
    },
    likeVideo: (id = '') => {
        return {
            type: type.LIKE_VIDEO,
            payload: {
                id,
            },
        };
    },
    dislikeVideo: (id = '') => {
        return {
            type: type.DISLIKE_VIDEO,
            payload: {
                id,
            },
        };
    },
};

export const VideoActions = action;

export default {
    type,
    action,
};
