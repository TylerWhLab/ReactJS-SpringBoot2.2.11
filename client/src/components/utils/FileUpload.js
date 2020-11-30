import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { DiffOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL } from '../Config';

/** 이미지 업로드 */

function FileUpload(props) {

    const [Images, setImages] = useState([]) // 이미지 여러개 업로드할 수 있게 하기위해 [] array
    /**async로 업로드된 파일경로/real filename 이 반환되고, 저장 시 파일명 insert(update)를 위해 state에 저장 */

    // back-end로 file 전송 // back-end에서는 multer 모듈이 업로드 처리
    const dropHandler = (files) => {

        let formData = new FormData();
        formData.append("file", files[0]) // 업로드할 파일

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {

                    console.log(response.data)

                    setImages([...Images, response.data.filePath])
                    /**원래 있던 state에 append */

                    props.refreshFunction([...Images, response.data.filePath]) /**부모 state에 전달 */

                } else {
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }


    /**올린 파일 삭제 */
    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1) /**현재 인덱스부터 1개를 리스트에서 지움 == 클릭한 사진을 리스트에서 삭제 */
        setImages(newImages) /**state 재설정 */
        props.refreshFunction(newImages) /**부모 state에 전달 */
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />

                        <DiffOutlined style={{ fontSize: '3rem', color: '#00eb00' }} />
                        
                    </div>
                )}
            </Dropzone>

            {/* 업로드한 파일 뿌려주기 */}
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`${URL}/${image}`}
                            alt=""
                        />
                    </div>
                ))}


            </div>


        </div>
    )
}

export default FileUpload
