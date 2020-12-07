import React from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';


/**파일 다운로드 모듈 */
function FileDown(props) {

    const orgFileName = props.fileName.orgFileName // 보여주기용 파일명
    const realFileName = props.fileName.realFileName // request 전용 파일명
    const path = props.fileName.path

    // 다운로드 버튼 클릭 이벤트
    const onDownload = () => {

        if ( ! realFileName ) {
            alert('업로드한 파일이 없습니다.');
            return false;
        }

        let requestBody = {
            realFileName: realFileName,
            path: path
        }

        let reqConf = {
            responseType: "arraybuffer"
            // header: { 'content-type': 'application/octet-stream' }
        }

        axios.post('/api/file/down', requestBody, reqConf)
            .then(response => {
                if (response.data && !response.data.success) {
                    const blob = new Blob( [response.data], {type: "application/octet-stream"} );
                    saveAs(blob, orgFileName);
                } else {
                    alert('다운로드 실패!')
                }
            })
    }
   

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <div style={{margin: '5px 10px 0px 0px'}}>
                    첨부파일 : [{orgFileName}]
                </div>
                <Button type="primary" onClick={onDownload}>
                    다운로드 <DownloadOutlined />
                </Button>
            </div>
        </div>
    )
}

export default FileDown

