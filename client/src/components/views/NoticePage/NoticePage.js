import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getNotice } from '../../../_actions/user_actions';
import NoticeTable from './Sections/NoticeTable';
import SearchFeature from './Sections/SearchFeature';
import { Button, Empty } from 'antd';
// import axios from 'axios';


function NoticePage(props) {
    const dispatch = useDispatch();

    const [Skip, setSkip] = useState(0) /** 더보기 기능, 시작 인덱스 */
    const [Limit, setLimit] = useState(10) /** 더보기 기능, 한 번 select 하는 count */
    const [SearchTerm, setSearchTerm] = useState("")

    const [Notices, setNotices] = useState()
    const [NoticeCnt, setNoticeCnt] = useState(0)

    
    useEffect(() => {

        let reqBody = {
            skip: Skip,
            limit: Limit,
            searchTerm: SearchTerm,
        }
    
        // 공지사항 검색
        getNotices(reqBody)
    
    }, []) // props.user.userData


    // 공지사항 검색
    const getNotices = (reqBody) => {
        dispatch(getNotice(reqBody))
            .then(response => { 

                if (reqBody.loadMore) { // append
                    setNotices([...Notices, ...response.payload.noticeInfo])
                } else {
                    setNotices(response.payload.noticeInfo)
                }
                setNoticeCnt(response.payload.noticeCnt)
            })
    }


    // 문자열 공지사항 검색
    const updateSearchTerm = (newSearchTerm) => {

        let reqBody = {
            skip: 0,
            limit: Limit,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)

        getNotices(reqBody)
    }


    // 더보기 버튼 클릭 이벤트
    const loadMoreHanlder = () => {

        // Limit : 한 번에 또는 더보기 눌렀을 때 가져오는 수
        // Skip : 데이터를 가져오기 시작하는 인덱스

        let skip = Skip + Limit
        let reqBody = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        }

        getNotices(reqBody)
        setSkip(skip)
    }


    // 공지 작성으로 이동
    const moveNoticeWrite = () => {
        if (!props.user.userData.isAdmin) {
            // alert('관리자만 작성할 수 있습니다.')
            // return false;
        }
        props.history.push("/noticeWrite");
    }


    // 공지 상세보기
    const moveNoticeDetail = (notice) => {

        props.history.push({
            pathname: "/noticeDetail", 
            state: { notice: notice }
        })

        // this.props.history.push({
        //     pathname: '/template',
        //     search: '?query=abc',
        //     state: { detail: response.data }
        // })
        
    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1 style={{ textAlign: 'center' }}>공지사항</h1>

            {/* Search : 문자열 검색 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                {/* justifyContent: 'flex-end' :우측 정렬 */}
                <SearchFeature
                    refreshFunction={updateSearchTerm} // 자식 컴포넌트 state 받기
                />
            </div>

            <Button style={{ float: 'right', marginBottom: '10px' }} onClick={moveNoticeWrite}>
                글쓰기
            </Button>
            

            {/* 공지사항 목록 */}
            <div>
                <NoticeTable notices={Notices} moveNoticeDetail={moveNoticeDetail} />
            </div>

            { NoticeCnt ?
                <></>
                :
                <>
                    <br />
                    {/* 0건일 때 */}
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </>
            }
            <br />

            {/* 더보기 기능
                MongoDB 기능 
                Limit : 한 번에 또는 더보기 눌렀을 때 가져오는 수
                Skip : 데이터를 가져오기 시작하는 인덱스
            */}
            {NoticeCnt >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" onClick={loadMoreHanlder}>더보기</Button>
                </div>
            }


        </div>
    )
}

export default NoticePage
