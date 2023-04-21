import AuthReducer from './auth/reducer';
import VideoReducer from './video/reducer';

const rootReducer = {
    auth: AuthReducer,
    video: VideoReducer,
};

export default rootReducer;
