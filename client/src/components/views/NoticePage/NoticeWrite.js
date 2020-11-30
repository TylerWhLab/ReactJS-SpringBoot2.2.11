import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUp from '../../utils/FileUp';

const { TextArea } = Input;

function NoticeWrite(props) {

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [NoticeNo, setNoticeNo] = useState(0)
    const [Views, setViews] = useState(1)
    const [Writer, setWriter] = useState([])
    const [FileName, setFileName] = useState("")
    const [OrgFileName, setOrgFileName] = useState("")

    const uploadFile = (path, fileName) => {
        setFileName(fileName)
    }

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const contentChangeHandler = (event) => {
        setContent(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title) {
            return alert("제목을 작성해 주세요")
        }
        if (!Content) {
            return alert("내용을 작성해 주세요")
        }

        const reqBody = {
            writer: props.user.userData._id, //로그인 된 사람의 ID // auth.js에서 현재 사용자 정보 넣어두었다. 
            title: Title,
            content: Content,
            fileName: FileName,
            orgFileName: OrgFileName,
        }

        axios.post('/api/notice/insert', reqBody)
            .then(response => {
                if (response.data.success) {
                    alert('공지 작성에 성공 했습니다.')
                    props.history.push('/notice')
                } else {
                    alert('공지 작성에 실패 했습니다.')
                }
            })
    }


    const getOrgFileName = (orgFileName) => {
        setOrgFileName(orgFileName)
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>공지사항 작성</h2>
            </div>

            <Form>
                <br />
                <br />
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>내용</label>
                <TextArea onChange={contentChangeHandler} value={Content} style={{ height: '250px' }} />
                <br />
                <br />
                <label>첨부파일</label>
                <FileUp refreshFunction={uploadFile} getOrgFileName={getOrgFileName} />
                <br />
                <br />
                <Button type="submit" onClick={submitHandler} style={{ float: 'right' }}>
                    작성
                </Button>
            </Form>


        </div>
    )
}

export default NoticeWrite
