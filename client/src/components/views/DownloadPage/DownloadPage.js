import React from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { saveAs } from 'file-saver';

/* 연습 화면 */ 

function DownloadPage() {

    // 다운로드 버튼 클릭 이벤트
    const onDownload = () => {

        let requestBody = {
            filename: "test.xlsx" // cattext.txt cat1122.jpg test.xlsx
        }

        let reqConf = {
            responseType:"arraybuffer"
        }

        axios.post('/api/download', requestBody, reqConf)
            .then(response => {
                console.log(response)

                // content-disposition: "attachment; filename=test.xlsx"
                const filename = response.headers['content-disposition'].split('=')[1];

                if (response.data && !response.data.dSuccess) {
                    const blob = new Blob( [response.data], {type: "application/octet-stream"} );
                    saveAs(blob, filename);
                } else {
                    alert('다운로드 실패!')
                }
            })
    }
   

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button type="primary" onClick={onDownload}>다운로드</Button>
            </div>
        </div>
    )
}

export default DownloadPage


