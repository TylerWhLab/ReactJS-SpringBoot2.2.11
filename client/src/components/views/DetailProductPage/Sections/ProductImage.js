import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery'; // 이미지 슬라이딩, 이미지 전체보기 기능
import { URL } from '../../../Config';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {

        if (props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `${URL}/${item}`, // 상단 큰 이미지
                    thumbnail: `${URL}/${item}` // 하단에 작게 모든 이미지 리스트
                })
            })
            setImages(images)
        }

    }, [props.detail]) // props.detail값이 바뀔 때마다 life cycle => mount(init) 실행, 렌더링 할때에는 이미지가 없기때문에(request 따로 하기 때문) mount 다시해줘야 함

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
