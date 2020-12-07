import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions';
import UserCartBlock from './Sections/UserCartBlock';
import { Empty, Result } from 'antd';
import Paypal from '../../utils/Paypal';
import Money from '../../utils/Money';

function CartPage(props) {
    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {

        let cartItems = []
        //리덕스 User state안에 cart 안에 상품이 들어있는지 확인 
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.productId)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }
    }, [props.user.userData])


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)

    }


    /** 카트에서 삭제 */
    let removeFromCart = (productId) => {

        dispatch(removeCartItem(productId))
            .then(response => {

                // if (response.payload.productInfo.length <= 0) {
                if (response.payload.cart.length <= 0) {
                    setShowTotal(false)
                }

            })
    }


    /**결제 완료 시 처리할 일 */
    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>내 카트</h1>

            {/* 카트에 담긴 상품 내역 */}
            <div>
                <UserCartBlock products={props.user.cartDetail} removeFromCart={removeFromCart} />
            </div>


            {/* 전체금액 */}
            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <h2>전체 금액: {Money(Total)} 원</h2>
                </div>
                : ShowSuccess ?
                    <Result
                        status="success"
                        title="Successfully Purchased Items"
                    />
                    :
                    <>
                        <br />
                        <Empty description={false} />
                        {/* 카트 0건일 때 */}
                    </>
            }

            {/* 결제버튼 */}
            {ShowTotal ?
                <div style={{ visibility: 'visible' }}>
                <Paypal
                    total={Total}
                    onSuccess={transactionSuccess}
                />
                </div>
                :
                <div style={{ visibility: 'hidden' }}>
                <Paypal
                    total={Total}
                    onSuccess={transactionSuccess}
                />
                </div>
            }


        </div>
    )

    
}

export default CartPage
