import React from 'react'
import { Carousel } from 'antd'; // 여러 이미지를 슬라이드하면서 보여주는 효과
import { URL } from '../Config';

function ImageSlider(props) { // props 로 product.images 이미지 데이터 받음
    return (
        <div>
            <Carousel autoplay > 
            {/* autoplay : 자동 슬라이드 */}
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`${URL}/${image}`} 
                            alt=""/>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
