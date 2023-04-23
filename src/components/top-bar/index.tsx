import './index.scss';
import { Link } from 'react-router-dom';
import { RouterLinks } from '../../const';
import { FaHome } from 'react-icons/fa';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useActions } from '../../redux';
import { useSelector } from 'react-redux';

export const TopBar: React.FC = () => {
    const dispatch = useDispatch();
    const actions = useActions();

    const isLogin = useSelector((state: any) => state.auth.isLoggedIn);
    const currentUser = useSelector((state: any) => state.auth.userInfo);

    const currentEmail = currentUser?.email ? currentUser?.email : '';

    // handle
    const onFinish = (values: any) => {
        const { email, password } = values;

        dispatch(actions.AuthActions.login(email, password));
    };

    const onFinishFailed = (errorInfo: any) => {};

    const handleLogout = () => {
        dispatch(actions.AuthActions.logout());
    };

    return (
        <div className="HeaderContainer">
            <div className="Header">
                <div className="TopBar">
                    <Link to={RouterLinks.HOME_PAGE} className="TopBarLeft">
                        <FaHome className="TopBarLogo" />
                        <div className="TopBarTitle">Funny Movies</div>
                    </Link>

                    {isLogin ? (
                        <>
                            <div className="TopBarRight">
                                <div className="TopBarItem">
                                    <div className="Title">{currentEmail}</div>
                                </div>
                                <Link
                                    to={RouterLinks.SHARE_PAGE}
                                    className="TopBarItem"
                                    data-testid="ShareButton"
                                >
                                    <div className="ShareButton">
                                        Share a Movie
                                    </div>
                                </Link>
                                <div
                                    className="TopBarItem"
                                    onClick={() => handleLogout()}
                                >
                                    <div className="LogoutButton">Logout</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Form
                                name="LoginForm"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                            >
                                <div className="TopBarRight">
                                    <div
                                        className="TopBarItem"
                                        style={{ marginTop: 26 }}
                                    >
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    type: 'email',
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Email"
                                                className="InputField"
                                                data-testid="EmailInput"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div
                                        className="TopBarItem"
                                        style={{ marginTop: 26 }}
                                    >
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                placeholder="Password"
                                                className="InputField"
                                                data-testid="PasswordInput"
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="TopBarItem">
                                        <Button
                                            className="LoginButton"
                                            type="primary"
                                            htmlType="submit"
                                            data-testid="LoginButton"
                                        >
                                            Login / Register
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
