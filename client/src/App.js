import React, { Suspense } from 'react';
import { Switch, Route } from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import CartPage from './components/views/CartPage/CartPage';
import HistoryPage from './components/views/HistoryPage/HistoryPage';

// import DownloadPage from './components/views/DownloadPage/DownloadPage';
import NoticePage from './components/views/NoticePage/NoticePage';
import NoticeWrite from './components/views/NoticePage/NoticeWrite';
import NoticeDetail from './components/views/NoticePage/NoticeDetail';


import Auth from './hoc/auth'; // 인증/인가를 위한 hoc

/**
 * Router
 */
function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
                    <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
                    {/* productId(PK)로 상세보기 */}

                    <Route exact path="/user/cart" component={Auth(CartPage, true)} />
                    <Route exact path="/history" component={Auth(HistoryPage, true)} />

                    {/* <Route exact path="/download" component={Auth(DownloadPage, true)} /> */}
                    <Route exact path="/notice" component={Auth(NoticePage, null)} />
                    <Route exact path="/noticeWrite" component={Auth(NoticeWrite, null)} />
                    <Route exact path="/noticeDetail" component={Auth(NoticeDetail, null)} />
                                        

                    {/* 인증/인가를 위해 hoc로 감싸줌, Auth:./hoc/auth 
                        option
                        null : 아무나 출입
                        true : 로그인한 유저만 출입
                        false : 로그인한 유저는 출입불가
                    */}

                </Switch>
            </div>
            <Footer />
        </Suspense>
    )
}

export default App

