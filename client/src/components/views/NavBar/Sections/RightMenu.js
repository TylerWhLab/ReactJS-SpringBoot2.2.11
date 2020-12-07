/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge } from 'antd'; // Badge : 카트에 개수 표시(카톡 메시지 수 표시처럼)
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
            props.history.push("/login");
        } else {
            alert('Log Out Failed')
        }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/login">로그인</a>
            </Menu.Item>
            <Menu.Item key="app">
                <a href="/register">회원가입</a>
            </Menu.Item>
        </Menu>
        )
    } else {
        return (
        <Menu mode={props.mode}>

            <Menu.Item key="name">
                <div style={{}}>
                    {/* <a href="/my">{user.userData && user.userData.name} 님 안녕하세요.</a> */}
                    {user.userData && user.userData.name} 님 안녕하세요.
                </div>
            </Menu.Item>

            {/* <Menu.Item key="history">
                <a href="/history">결제목록</a>
            </Menu.Item> */}

            <Menu.Item key="upload">
                <a href="/product/upload">상품등록</a>
            </Menu.Item>

            <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
                <Badge count={user.userData && user.userData.cart && user.userData.cart.length}>
                    {/* Badge : 개수 표시 */}
                    <a href="/user/cart" className="head-example" style={{ marginRight: -22, color: '#667777' }} >
                        <ShoppingCartOutlined style={{ fontSize: 30, marginBottom: 3 }} />
                        {/* 카트 아이콘 */}
                    </a>
                </Badge>
            </Menu.Item>

            <Menu.Item key="logout">
                <a onClick={logoutHandler}>로그아웃</a>
            </Menu.Item>
        </Menu>
        )
    }
}

export default withRouter(RightMenu);
// export default RightMenu;
