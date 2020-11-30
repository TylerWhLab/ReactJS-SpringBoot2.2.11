import React, { useEffect } from 'react'
import { Form, Input } from 'antd';
// import axios from 'axios';

import FileDown from '../../utils/FileDown';

const { TextArea } = Input;

function NoticeDetail(props) {

    const notice = props.location.state.notice

    useEffect(() => {

        // 조회수 ++
        // Axios.post('/api/notice/views', { notice: notice })
        // .then(response => {
        //     if (response.data.success) {
        //         console.log('조회수++')
        //     }
        // });

    }, [])
    

    // const titleChangeHandler = () => {

    // }

    const contentChangeHandler = () => {
        // pass
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>{notice.title}</h2>
            </div>

            <div style={{float: 'right'}}>
                작성일자 : {String(notice.createdAt).slice(0,10)} {String(notice.createdAt).split('T')[1].slice(0,8)}
            </div>

            <br />
            
            <div style={{float: 'right'}}>
                <FileDown fileName={ notice } />
            </div>

            <br />
            <br />

            <Form>
                <br />
                <br />
                {/* <label>제목</label>
                <Input onChange={titleChangeHandler} value={notice.title} />
                <br />
                <br /> */}
                {/* <label>내용</label> */}
                <TextArea onChange={contentChangeHandler} value={notice.content} style={{ height: '500px' }} />
                <br />
                <br />
                {/* <Button type="submit" onClick={submitHandler} style={{ float: 'right' }}>
                    작성
                </Button> */}
            </Form>


        </div>
    )
}

export default NoticeDetail
