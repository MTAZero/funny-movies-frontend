import React from 'react';
import {
    render,
    RenderResult,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import { TopBar } from '../../components/top-bar';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import { act } from 'react-dom/test-utils';
import { AuthActions } from '../../redux/auth/actions';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'antd';
import { SharePage } from '../../pages';

describe('<Header />', () => {
    afterEach(() => {
        jest.clearAllMocks();

        store.dispatch(AuthActions.logout());
    });

    let store: any = null;

    beforeEach(() => {
        const makeTestStore = () => {
            const _store = makeStore();
            const origDispatch = _store.dispatch;
            _store.dispatch = jest.fn(origDispatch);
            return _store;
        };

        store = makeTestStore();
    });

    it('Test login', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TopBar />
                </Provider>
            </BrowserRouter>,
        );

        const emailInput = await screen.findByTestId('EmailInput');
        const passwordInput = await screen.findByTestId('PasswordInput');
        const ButtonLogin = await screen.findByTestId('LoginButton');

        act(async () => {
            await fireEvent.change(emailInput, {
                target: { value: 'xuanthuy3996@gmail.com' },
            });
            await fireEvent.change(passwordInput, {
                target: { value: '123456' },
            });
            await fireEvent.click(ButtonLogin);
        });

        setTimeout(() => {
            expect(store.dispatch).lastCalledWith(
                AuthActions.login('xuanthuy3996@gmail.com', '123456'),
            );
        }, 300);
    });
});
