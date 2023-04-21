import './index.scss';

import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { PaginationComponent } from '../../components/pagination';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useActions } from '../../redux';
import { useSelector } from 'react-redux';

export const HomePage = () => {
    const dispatch = useDispatch();
    const actions = useActions();

    const videos = useSelector((state: any) => state.video.videos);

    const total: any = useSelector((state: any) => state.video.total);
    const pageSize: any = useSelector((state: any) => state.video.pageSize);
    const pageIndex: any = useSelector((state: any) => state.video.pageIndex);

    // load
    useEffect(() => {
        dispatch(actions.VideoActions.loadListVideo());
    }, []);

    return (
        <div className="HomePage">
            {videos.map((video: any, index: any) => {
                let description = video.description;

                const maxlength = 600;

                if (description?.length > maxlength)
                    description = description.slice(0, maxlength - 3) + '...';

                let vote_value = 0;
                vote_value = video?.your_vote?.vote_value
                    ? video?.your_vote?.vote_value
                    : 0;

                return (
                    <div className="VideoComponent">
                        <div className="VideoPanel">
                            <ReactPlayer
                                url={video.url}
                                width={300}
                                height={200}
                            />
                        </div>
                        <div className="VideoInfoPanel">
                            <div className="Title">{video.title}</div>
                            <div className="Description">
                                ShareBy: {video?.share_by_user?.email}
                            </div>
                            <div className="ReactionPanel">
                                <div
                                    className="ReactionItem"
                                    style={{
                                        color:
                                            vote_value === 1 ? 'blue' : 'black',
                                    }}
                                >
                                    {video.like}{' '}
                                    <AiFillLike
                                        className="ReactionIcon"
                                        onClick={() => {
                                            dispatch(
                                                actions.VideoActions.likeVideo(
                                                    video._id,
                                                ),
                                            );
                                        }}
                                    />
                                </div>
                                <div
                                    className="ReactionItem"
                                    style={{
                                        color:
                                            vote_value === -1
                                                ? 'blue'
                                                : 'black',
                                    }}
                                >
                                    {video.dislike}{' '}
                                    <AiFillDislike
                                        onClick={() => {
                                            dispatch(
                                                actions.VideoActions.dislikeVideo(
                                                    video._id,
                                                ),
                                            );
                                        }}
                                        className="ReactionIcon"
                                    />
                                </div>
                            </div>
                            <div className="Description">
                                Description: {description}
                            </div>
                        </div>
                    </div>
                );
            })}
            <PaginationComponent
                total={total}
                onChange={(_page: any, _pageSize: any) => {
                    if (_pageSize !== pageSize) {
                        dispatch(
                            actions.VideoActions.updatePageSize(_pageSize),
                        );
                        return;
                    }

                    if (_page !== pageIndex) {
                        dispatch(actions.VideoActions.updatePageIndex(_page));
                    }
                }}
                current={pageIndex}
                pageSize={pageSize}
                showSizeChanger={true}
            />
        </div>
    );
};
