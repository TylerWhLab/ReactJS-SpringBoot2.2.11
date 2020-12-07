import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import axios from 'axios';

/* 
 * return path, orgFileName, realFileName;
 */

function FileUp(props) {

    const [Path, setPath] = useState("")
    const [OrgFileName, setOrgFileName] = useState("")

    // 업로드 처리
    const dropHandler = (files) => {
        
        let formData = new FormData();
        formData.append("userfile", files[0]) // 업로드할 파일
        formData.append("subDir", 'notice')

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        axios.post('/api/file/up', formData, config)
            .then(response => {
                if (response.data.success) {
                    setPath(response.data.path) // 업로드 경로
                    setOrgFileName(response.data.orgFileName)
                    props.refreshFunction(response.data.path, response.data.orgFileName, response.data.realFileName) /**부모 state에 전달 */
                } else {
                    alert('파일 저장 실패')
                }
            })
    }


    /**올린 파일 삭제 */
    const deleteHandler = () => {
        setPath("")
        props.refreshFunction("", "", "") /**부모 state에 전달 */
    }


    return (
        <div style={{ justifyContent: 'space-between' }}>

            {/* 파일 업로드 폼 */}
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

            {/* 업로드 경로 출력 */}
            {/* { Path } */}
            { OrgFileName }

            <br />
            <br />

            {/* 삭제 버튼 */}
            { Path ? 
            <Button danger onClick={() => deleteHandler()} style={{ float: 'left' }}>
                파일 삭제
            </Button>
            :
            <></>
            }

        </div>
    )
}

export default FileUp
