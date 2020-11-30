import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import axios from 'axios';

/* 
 * return path, filename;
 */

function FileUp(props) {

    const [FileName, setFileName] = useState("")
    const [Path, setPath] = useState("")

    // back-end로 file 전송 // back-end에서는 multer 모듈이 업로드 처리
    const dropHandler = (files) => {
        
        props.getOrgFileName(files[0].name)

        let formData = new FormData();
        formData.append("file", files[0]) // 업로드할 파일

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post('/api/file/up', formData, config)
            .then(response => {
                if (response.data.success) {
                    setFileName(response.data.fileName)
                    setPath(response.data.filePath)
                    props.refreshFunction(response.data.filePath, response.data.fileName) /**부모 state에 전달 */
                } else {
                    alert('파일 저장 실패')
                }
            })
    }


    /**올린 파일 삭제 */
    const deleteHandler = () => {
        setFileName("")
        setPath("")
        props.refreshFunction("", "") /**부모 state에 전달 */
    }


    return (
        <div style={{ justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 91, height: 80, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}

                        {...getRootProps()}>
                        <input {...getInputProps()} />

                        <DiffOutlined style={{ fontSize: '3rem', color: '#00eb00' }} />
                        
                    </div>
                )}
            </Dropzone>

            <br />

            { Path }

            <br />
            <br />

            {/* 삭제 버튼 */}
            { Path ? 
            <Button danger onClick={() => deleteHandler()} style={{ float: 'left'}}>
                파일 삭제
            </Button>
            :
            <></>
            }

        </div>
    )
}

export default FileUp
