import { getSessionKey } from '../../utils';
import actions from './actions';

const initState = {
    videos: [],

    pageSize: 5,
    pageIndex: 1,
    textSearch: "",
    total: 0
};

const reducer = (state = initState, action: any) => {
    const {payload} = action

    switch (action.type) {
        case actions.type.UPDATE_STATE:
            return {
                ...state,
                ...action.payload.state,
            };

        case actions.type.LOAD_LIST_VIDEO:
            return state;

        case actions.type.LOAD_LIST_VIDEO_SUCCESS:
            return {
                ...state,
                ...{
                    videos: payload.videos
                }
            }

        case actions.type.UPDATE_PAGE_SIZE:
            return {
                ...state,
                ...{
                    pageIndex: 1,
                    pageSize: payload.pageSize
                }
            }

        case actions.type.UPDATE_PAGE_INDEX:
            return {
                ...state,
                ...{
                    pageIndex: payload.pageIndex
                }
            }

        default:
            return state;
    }
};

export default reducer;
