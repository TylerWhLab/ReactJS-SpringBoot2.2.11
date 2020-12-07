import React from 'react'
import "./UserCartBlock.css"
import { URL } from '../../../Config';
import { Button } from 'antd';
import Money from '../../../utils/Money';


function UserCartBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `${URL}/${image}`
        }
    }



    // 카트에 추가한 상품 목록
    const renderItems = () => (

        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td style={{textAlign : 'center'}}>
                    <img style={{ height: '100px' }} alt="product" src={renderCartImage(product.images)} />
                </td>
                <td>
                    {product.title}
                </td>
                <td style={{ textAlign : 'right' }}>
                    {product.quantity}
                </td>
                <td style={{ textAlign : 'right' }}>
                    {Money(product.price)} 원
                </td>
                <td style={{ textAlign : 'center' }}>
                    <Button danger onClick={() => props.removeFromCart(product.productId)}>
                        삭제 
                    </Button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign : 'center', width: '250px'}}>이미지</th>
                        <th style={{ textAlign : 'center'}}>상품명</th>
                        <th style={{ textAlign : 'center', width: '150px'}}>수량</th>
                        <th style={{ textAlign : 'center', width: '150px'}}>금액</th>
                        <th style={{ textAlign : 'center', width: '150px'}}>카트에서 삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCartBlock
