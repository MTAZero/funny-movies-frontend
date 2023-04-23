import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '../components/top-bar';

// // image
// import ScrollIcon from '../assets/images/icon_scroll.png';

import './index.scss';
import { useDispatch } from 'react-redux';
import { useActions } from '../redux';

const MainLayout = () => {
    const [displayScroll, setDisplayScroll] = useState<boolean>(false);

    const dispatch = useDispatch();
    const actions = useActions();

    useEffect(() => {
        const handleScrollVisiblity = () => {
            if (window.scrollY > 300) setDisplayScroll(true);
            else setDisplayScroll(false);
        };

        window.addEventListener('scroll', handleScrollVisiblity);

        return () => {
            window.removeEventListener('scroll', handleScrollVisiblity);
        };
    }, []);

    useEffect(() => {
        dispatch(actions.AuthActions.checkSession());
    }, []);

    // const handleScrollToTop = () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // };

    return (
        <>
            <TopBar />
            <div className="MainContent">
                <Outlet />
            </div>
            {/* <Footer /> */}
            {/* <img
                onClick={() => handleScrollToTop()}
                alt="scroll"
                style={{ display: displayScroll ? 'flex' : 'none' }}
                src={ScrollIcon}
                className="ScrollButton"
            /> */}
        </>
    );
};

export default MainLayout;
