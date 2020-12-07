import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>

            <Menu.Item key="home">
                <a href="/">홈</a>
            </Menu.Item>

            {/* <SubMenu title={<span>카테고리</span>}>
                <MenuItemGroup title="생활용품">
                    <Menu.Item key="setting:1">헤어/바디/세안</Menu.Item>
                    <Menu.Item key="setting:2">세탁세제</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="식품">
                    <Menu.Item key="setting:3">축산/계란</Menu.Item>
                    <Menu.Item key="setting:4">수산물/건어물</Menu.Item>
                </MenuItemGroup>
            </SubMenu> */}

            {/* <Menu.Item key="download">
                <a href="/download">Download</a>
            </Menu.Item> */}

            <Menu.Item key="notice">
                <a href="/notice">공지사항</a>
            </Menu.Item>
            

        </Menu>
    )
}

export default LeftMenu