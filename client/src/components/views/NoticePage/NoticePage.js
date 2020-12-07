import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { selectNoticesAction } from '../../../_actions/user_actions';
import NoticeTable from './Sections/NoticeTable';
import SearchFeature from './Sections/SearchFeature';
import { Button, Empty, Pagination } from 'antd';
// import axios from 'axios';


function NoticePage(props) {
    const dispatch = useDispatch();

    // const [Skip, setSkip] = useState(1) /** 더보기 기능, 시작 인덱스 */
    // const [Limit, setLimit] = useState(15) /** 더보기 기능, 한 번 select 하는 count */
    const [Notices, setNotices] = useState()
    const [NoticeCnt, setNoticeCnt] = useState(0)

    const [SearchText, setSearchText] = useState("")

    const [PageNo, setPageNo] = useState(1)
    const [CntPerPage, setCntPerPage] = useState(10)
    const [TotalRecord, setTotalRecord] = useState(0)

    // const [SortCol, setSortCol] = useState("")
    // const [SortKeyword, setSortKeyword] = useState("")

    // init
    useEffect(() => {

        let reqBody = {
            pageNo: PageNo,
            cntPerPage: CntPerPage,
            searchText: SearchText
        }

        // 공지사항 검색
        selectNotices(reqBody);
    
    }, []) // [props.user.userData] : userData 변경할 때마다 mount(init)


    // 공지사항 검색
    const selectNotices = (reqBody) => {
        dispatch(selectNoticesAction(reqBody))
            .then(response => { 

                // 더보기
                // if (reqBody.loadMore) { // append
                //     setNotices([...Notices, ...response.payload.notices])
                // } else {
                //     setNotices(response.payload.notices)
                // }
                setNotices(response.payload.notices)
                setNoticeCnt(response.payload.noticeCnt)
                setTotalRecord(response.payload.noticeTotalCnt)
            })
    }


    /* 
        페이지 당 출력 레코드 수 변경 이벤트 &
        페이지 변경 이벤트
    */
   const onPageChange = (currPageNo, cntPerPage) => {
        let reqBody = {
            pageNo: currPageNo,
            cntPerPage: cntPerPage,
            searchText: SearchText
        }
        setPageNo(currPageNo) // 현재 페이지 번호
        setCntPerPage(cntPerPage) // 페이지당 출력 레코드 수

        // 공지사항 검색
        selectNotices(reqBody);
    }

    // 문자열 공지사항 검색
    const updateSearchText = (newSearchText) => {
        let searchPageNo = 1;
        let reqBody = {
            pageNo: searchPageNo,
            cntPerPage: CntPerPage,
            searchText: newSearchText
        }
        setPageNo(searchPageNo);
        setSearchText(newSearchText);
        
        // 공지사항 검색
        selectNotices(reqBody);
    }


    // 더보기 버튼 클릭 이벤트
    // const loadMoreHanlder = () => {

    //     // Limit : 한 번에 또는 더보기 눌렀을 때 가져오는 수
    //     // Skip : 데이터를 가져오기 시작하는 인덱스

    //     let skip = Skip + Limit
    //     let reqBody = {
    //         skip: skip,
    //         limit: Limit,
    //         loadMore: true,
    //     }

    //     selectNotices(reqBody)
    //     setSkip(skip)
    // }


    // 공지 작성으로 이동
    const moveNoticeWrite = () => {
        debugger // TODO: isAdmin bool로 받기
        if (props.user.userData.isAdmin === 'false') {
            alert('관리자만 작성할 수 있습니다.')
            return false;
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
                <SearchFeature
                    refreshFunction={updateSearchText} // 자식 컴포넌트 state 받기
                />
            </div>

            <Button style={{ float: 'right', marginBottom: '10px' }} onClick={moveNoticeWrite}>
                글쓰기
            </Button>
            

            {/* 공지사항 상세보기 */}
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
            {/* {NoticeCnt >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" onClick={loadMoreHanlder}>더보기</Button>
                </div>
            } */}

            {/* 페이징 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination defaultCurrent={PageNo} total={TotalRecord} onShowSizeChange={onPageChange} onChange={onPageChange} />
            </div>
            


        </div>
    )
}

export default NoticePage
