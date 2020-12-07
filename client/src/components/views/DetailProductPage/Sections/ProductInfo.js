import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';


function ProductInfo(props) {
    const dispatch = useDispatch();

    // 카트에 담기 redux
    const onAddToCartClick = () => {

        if (props.user.userData && !props.user.userData.isAuth) {
            alert('로그인이 필요한 기능입니다. 로그인 페이지로 이동합니다.');
            props.history.push('/login');
            return false;
        }

        dispatch(addToCart(props.detail.productId))
    }

    return (
        <div>
            <Descriptions title="상품 정보">
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="재고">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={onAddToCartClick}>
                    카트에 담기
                </Button>
            </div>


        </div>
    )
}

export default ProductInfo
