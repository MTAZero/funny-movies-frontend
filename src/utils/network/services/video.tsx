import createApiServices from '../createApiServices';

const api = createApiServices();

const ShareVideo = (url = '') => {
    const body = {
        url,
    };
    return api.makeAuthRequest({
        url: 'video-shares',
        method: 'POST',
        data: body,
    });
};

const GetListVideo = (textSearch = '', pageSize = '10', pageIndex = '1') => {
    return api.makeAuthRequest({
        url: `video-shares?keyword=${textSearch}&pageSize=${pageSize}&pageIndex=${pageIndex}`,
        method: 'GET',
    });
};

const GetListPublicVideo = (
    textSearch = '',
    pageSize = '10',
    pageIndex = '1',
) => {
    return api.makeRequest({
        url: `video-shares/public?keyword=${textSearch}&pageSize=${pageSize}&pageIndex=${pageIndex}`,
        method: 'GET',
    });
};

const LikeVideo = (videoid = '') => {
    return api.makeAuthRequest({
        url: `video-shares/like/${videoid}`,
        method: 'POST',
    });
};

const DislikeVideo = (videoid = '') => {
    return api.makeAuthRequest({
        url: `video-shares/dislike/${videoid}`,
        method: 'POST',
    });
};

export const Video = {
    ShareVideo,
    GetListVideo,
    LikeVideo,
    DislikeVideo,
    GetListPublicVideo,
};
