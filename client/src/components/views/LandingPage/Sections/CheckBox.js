import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) { // props 로 데이터 받기

    const [Checked, setChecked] = useState([]) // 체크한 인덱스 넣을 state

    const handleToggle = (value) => {

        // 누른 것의 Index
        const currentIndex = Checked.indexOf(value)

        // 전체 Checked된 State에서  현재 누른 Checkbox가 이미 있다면 
        const newChecked = [...Checked]

        // State 넣어준다. 
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1) // 제거
        }
        setChecked(newChecked)
        props.handleFilters(newChecked) // 부모 컴포넌트로 state 전달
    }


    // 체크박스를 데이터 만큼 만들기
    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index} >

            {/* 체크박스 클릭 시 반전 */}
            <Checkbox onChange={() => handleToggle(value._id)}
                checked={Checked.indexOf(value._id) === -1 ? false : true} />

            <span>{value.name} </span>

        </React.Fragment>
    ))

    return (
        <div>
            {/* Collapse : 접었다 폈다, defaultActiveKey 0 : default 접음 */}
            <Collapse defaultActiveKey={['0']} >
                <Panel header="품종" key="1">
                    {/* header: 출력할 이름 */}
                    {renderCheckboxLists()}

                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
