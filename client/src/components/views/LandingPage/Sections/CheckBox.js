import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) { // props 로 데이터 받기

    const [Checked, setChecked] = useState([]) // 체크한 인덱스 넣을 state

    /* 클릭 시 체크/해제 반전 */
    const handleToggle = (value, column, keyword) => {

        /** 다건 체크 */
        // // 누른 것의 Index
        // const currentIndex = Checked.indexOf(value)

        // // 기존 체크값들 보존
        // const newChecked = [...Checked]

        // // 체크한 항목의 _id를 리스트로 만든다.
        // if (currentIndex === -1) { // 체크 안된 박스 클릭 -> 체크
        //     newChecked.push(value)
        // } else { // 이미 체크된 박스 클릭 -> 체크 해제
        //     newChecked.splice(currentIndex, 1) // 제거
        // }

        /* 1건만 체크 */
        let chk = {};
        chk["column"] = column;
        chk["keyword"] = keyword;

        const newChecked = [value];

        setChecked(newChecked)
        props.handleFilters(chk) // 부모 컴포넌트로 state 전달
    }


    // 체크박스를 데이터 만큼 만들기
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index} >

            {/* 체크박스 클릭 시 반전, 체크 표시 */}
            <Checkbox 
                onChange={() => handleToggle(value._id, value.column, value.keyword)}
                checked={Checked.indexOf(value._id) === -1 ? false : true} 
            />

            {/* 출력할 항목명 Datas.js */}
            <span>{value.name} </span>

        </React.Fragment>
    ))

    return (
        <div>
            {/* Collapse : 접었다 폈다, defaultActiveKey 0 : default 접음 */}
            <Collapse defaultActiveKey={['0']} >
                <Panel header="정렬 방식" key="1">
                    {/* header: 출력할 이름 */}
                    {renderCheckboxLists()}

                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
