import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;


function RadioBox(props) { // Datas.js

    const [Value, setValue] = useState(0)


    const renderRadioBox = () => (
        props.list && props.list.map(value => (
            <div key={value._id}>
                <Radio key={value._id} value={value._id}> {value.name} </Radio>
            </div>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value) // 부모 컴포넌트로 state 보냄
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']} >
                {/* 0 : default 접힘 */}
                <Panel header="금액" key="1">
                    {/* header : 출력할 제목 */}

                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>

                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
