import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { TopBar } from '../components/top-bar';
import { Provider } from 'react-redux';
import { makeStore } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { AuthActions } from '../redux/auth/actions';
import { act } from 'react-dom/test-utils';
import { HomePage, SharePage } from '../pages';
import { VideoActions } from '../redux/video/actions';

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
    })

    it('Test render top bar', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TopBar />
                </Provider>
            </BrowserRouter>,
        );
        const linkElement = screen.getByText('Funny Movies');
        expect(linkElement).toBeInTheDocument();
        expect(screen.getByText('Login / Register')).toBeInTheDocument();
    });

    it('Test test topbar UI after login', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <TopBar />
                </Provider>
            </BrowserRouter>,
        );

        const userInfo = {
            email: 'xuanthuy3996@gmail.com',
        };
        const sessionKey = '123';

        act(() => {
            store.dispatch(
                AuthActions.updateState({
                    session_key: sessionKey,
                    isLoggedIn: true,
                    isLoading: false,
                    userInfo,
                    current_user_info: userInfo,
                }),
            );
        });

        const linkElement = screen.getByText('xuanthuy3996@gmail.com');
        expect(linkElement).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
        expect(screen.getByText('Share a Movie')).toBeInTheDocument();
    });

    it('Test share video page', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <SharePage />
                </Provider>
            </BrowserRouter>,
        );

        expect(screen.getByText('Share a Youtube Movie')).toBeInTheDocument();
        expect(screen.getByText('Youtube URL')).toBeInTheDocument();
        expect(screen.getByText('Share')).toBeInTheDocument();
    });

    it('Test Home page', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <HomePage />
                </Provider>
            </BrowserRouter>,
        );

        const mockVideo: any = [
            {
                _id: '6444d74cdd6bbdf380f7978a',
                share_by: '6444d730dd6bbdf380f79786',
                url: 'https://www.youtube.com/watch?v=9SFTIpbv-Qw',
                title: 'Nga cũng bắn 1 mũi tên trúng 3 chim nhưng chim không hề hay biết! | Bình luận bản tin chiến sự 23-04',
                description:
                    'Tại sao Nga "án binh bất động" và cố tỏ vẻ kém cỏi? Tại sao Nga không chiếm trọng các cứ điểm trên khắp chiến tuyến? Bao giờ thì Nga "bung lụa"? trên chiến trường? Tổng hợp những thông tin quan trọng liên quan đến cuộc chiến trong tuần... Nga cũng bắn 1 mũi tên trúng 3 chim nhưng chim không hề hay biết! | Bình luận bản tin chiến sự 23-04',
                last_update: 1682233164081,
                created_date: 1682233164081,
                __v: 0,
                share_by_user: {
                    _id: '6444d730dd6bbdf380f79786',
                    email: 'tqd52417@nezid.com',
                    password_hash:
                        '$2b$10$5qjw9Co9YK/uwEwqXhnxwu/XkEQWbPI4pFWn6MkrA2I4b7gWvKznq',
                    last_update: 1682233136063,
                    created_date: 1682233136063,
                    status: 'active',
                    __v: 0,
                },
                like: 2,
                dislike: 0,
            },
            {
                _id: '64437a03dd6bbdf380f79721',
                share_by: '644379c6dd6bbdf380f7970a',
                url: 'https://www.youtube.com/watch?v=5oH9Nr3bKfw',
                title: 'Tom & Jerry | A Bit of Fresh Air! | Classic Cartoon Compilation | @WB Kids',
                description:
                    "Tom & Jerry thrive most outside, and they can't wait for the nice weather to come around! Enjoy this compilation with the best moments in the fresh air!\n\nCatch up with Tom & Jerry as they chase each other, avoid Spike, and play with friends like Little Quacker and Butch the cat.\n\nWB Kids is the home of all of your favorite clips featuring characters from the Looney Tunes, Scooby-Doo, Tom and Jerry and More!\n\n#WBKids #KidsCartoons #TomandJerry\n\nTom & Jerry available on digital!\n\nMORE VIDEOS HERE \n►https://www.youtube.com/wbkids\nMORE GAMES & ACTIVITIES HERE \n►https://www.wbkidsgo.com/\n\nAll Warner Bros. related characters and elements © & ™ Warner Bros. Entertainment Inc. (s22)",
                last_update: 1682143747191,
                created_date: 1682143747191,
                __v: 0,
                share_by_user: {
                    _id: '644379c6dd6bbdf380f7970a',
                    email: 'quynhpham308@gmail.com',
                    password_hash:
                        '$2b$10$AzCNM4e.NwTE77jgOD31je8D8t1yX1uCXZJ2k7HUqTICyjxYdTkcC',
                    last_update: 1682143686293,
                    created_date: 1682143686293,
                    status: 'active',
                    __v: 0,
                },
                like: 3,
                dislike: 0,
            },
            {
                _id: '6442d90d5a54f82783f66351',
                share_by: '6442d8ec5a54f82783f66334',
                url: 'https://www.youtube.com/watch?v=L2pwSZwm_u0',
                title: 'Tân Lộc Đỉnh Ký 2   Châu Tinh Trì',
                description: null,
                last_update: 1682102541533,
                created_date: 1682102541533,
                __v: 0,
                share_by_user: {
                    _id: '6442d8ec5a54f82783f66334',
                    email: 'nguyenvanhai@gmail.com',
                    password_hash:
                        '$2b$10$E0bVUaZrRb7rpdBFFAuJ6ORfMf8WFWLPULuOwnPKuQncirBM11/PW',
                    last_update: 1682102507940,
                    created_date: 1682102507940,
                    status: 'active',
                    __v: 0,
                },
                like: 4,
                dislike: 0,
            },
            {
                _id: '6442d8a25a54f82783f66305',
                share_by: '6442d8615a54f82783f662fa',
                url: 'https://www.youtube.com/watch?v=wzvnp3SLufs',
                title: 'Bao Công xử án - Châu Tinh Trì - Thuyết minh',
                description: 'Cười lên đi để cuộc sống thêm tươi đẹp.',
                last_update: 1682102434223,
                created_date: 1682102434223,
                __v: 0,
                share_by_user: {
                    _id: '6442d8615a54f82783f662fa',
                    email: 'zindousm@gmail.com',
                    password_hash:
                        '$2b$10$qcszfWieLfZbLeQO5x9xNuX1e3HCo8mv4//sZUVF70YGYoO8hxxY2',
                    last_update: 1682102368948,
                    created_date: 1682102368948,
                    status: 'active',
                    __v: 0,
                },
                like: 6,
                dislike: 0,
            },
            {
                _id: '6442c77e22b30d42df43d519',
                share_by: '6440e2e588ba5890ff4e1984',
                url: 'https://www.youtube.com/watch?v=6LyDXsGa3tw',
                title: 'American Dad Season 12 Ep. 23 Full Episode - American Dad 2023 Full UnCuts #1080prica',
                description:
                    'American Dad Season 12 Ep. 23 Full Episode - American Dad 2023 Full UnCuts #1080prica',
                last_update: 1682098046319,
                created_date: 1682098046319,
                __v: 0,
                share_by_user: {
                    _id: '6440e2e588ba5890ff4e1984',
                    email: 'buithuy3996@gmail.com',
                    password_hash:
                        '$2b$10$MGdgO8n.LwusSyGTMhAmbuHZtK26Ah5bGSAxGYcKIDGGugMYY6xOu',
                    last_update: 1681973989051,
                    created_date: 1681973989051,
                    status: 'active',
                    __v: 0,
                },
                like: 5,
                dislike: 1,
            },
        ];

        act(() => {
            store.dispatch(VideoActions.loadListVideoSuccess(mockVideo));
        });

        expect((await screen.findAllByTestId('VideoComponent')).length).toEqual(
            5,
        );
        expect(
            (await screen.findAllByTestId('Video-Title'))[0].innerHTML,
        ).toEqual(mockVideo[0].title);
        expect(
            (await screen.findAllByTestId('Video-Title'))[2].innerHTML,
        ).toEqual(mockVideo[2].title);
        expect(
            (await screen.findAllByTestId('Video-Title'))[4].innerHTML,
        ).toEqual(mockVideo[4].title);
    });

    it('Test video action', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <HomePage />
                </Provider>
            </BrowserRouter>,
        );

        act(() => {
            store.dispatch(VideoActions.updatePageIndex(2));
        });
        expect(store.dispatch).lastCalledWith(
            VideoActions.updatePageIndex(2),
        );

        act(() => {
            store.dispatch(VideoActions.updatePageSize(5));
        });
        expect(store.dispatch).lastCalledWith(
            VideoActions.updatePageSize(5),
        );

        act(() => {
            store.dispatch(VideoActions.likeVideo("video-1"));
        });
        expect(store.dispatch).lastCalledWith(
            VideoActions.likeVideo("video-1")
        );
    });
});
