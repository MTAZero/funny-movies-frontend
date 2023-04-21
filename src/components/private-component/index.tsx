import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RouterLinks } from '../../const';
import { useActions } from '../../redux';

export const PrivateRoute = (props: any) => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const location = useLocation();

    const dispatch = useDispatch();
    const actions = useActions();

    useEffect(() => {
        dispatch(actions.AuthActions.checkSession());
    }, [isLoggedIn]);

    return isLoggedIn ? (
        props.children
    ) : (
        <Navigate
            to={RouterLinks.LOGIN_PAGE}
            state={{
                from: location.pathname,
            }}
        />
    );
};
