import { AuthActions } from './auth/actions';
import { VideoActions } from './video/actions';

export const useActions = () => {
    const actions = {
        AuthActions,
        VideoActions,
    };

    return actions;
};
