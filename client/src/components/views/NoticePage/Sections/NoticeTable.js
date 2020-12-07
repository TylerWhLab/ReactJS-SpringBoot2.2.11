import React from 'react'
import "./NoticeTable.css"


function NoticeTable(props) {

    // 공지사항 목록
    const renderItems = () => (
        props.notices && props.notices.map((notice, index) => (
            <tr key={index} style={{cursor: 'pointer'}} onClick={() => props.moveNoticeDetail(notice)} >
                <td style={{textAlign : 'center'}}>
                    {notice.noticeId}
                </td>
                <td>
                    {notice.title}
                </td>
                <td style={{ textAlign : 'center' }}>
                    {notice.name}
                </td>
                <td style={{ textAlign : 'center' }}>
                    {String(notice.modDate).slice(0, 10)}
                </td>
                {/* <td style={{ textAlign : 'right' }}>
                    {notice.views}
                </td> */}
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign : 'center', width: '100px'}}>번호</th>
                        <th style={{ textAlign : 'center'}}>제목</th>
                        <th style={{ textAlign : 'center', width: '125px'}}>글쓴이</th>
                        <th style={{ textAlign : 'center', width: '125px'}}>날짜</th>
                        {/* <th style={{ textAlign : 'center', width: '125px'}}>조회수</th> */}
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default NoticeTable
