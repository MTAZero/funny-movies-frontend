import { Input, Form, Button } from 'antd';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useActions } from '../../redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterLinks } from '../../const';

export const SharePage = () => {
    const dispatch = useDispatch();
    const actions = useActions();
    const navigate = useNavigate();

    // handle
    const onFinish = (values: any) => {
        dispatch(
            actions.VideoActions.shareVideo(values.url, () => {
                navigate(RouterLinks.HOME_PAGE);
            }),
        );
    };

    const onFinishFailed = (errorInfo: any) => {};

    return (
        <div className="SharePage">
            <div className="ShareForm">
                <div className="Title">Share a Youtube Movie</div>
                <Form
                    name="ShareForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="url"
                        label="Youtube URL"
                        rules={[
                            {
                                required: true,
                                message: 'Incorrect Youtube URL',
                            },
                            {
                                pattern: new RegExp(
                                    `^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$`,
                                ),
                                message: 'Incorrect Youtube URL',
                                // eslint-disable-next-line
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="ControlPanel">
                        <Button
                            className="LoginButton"
                            type="primary"
                            htmlType="submit"
                        >
                            Share
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
