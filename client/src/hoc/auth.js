import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";


export default function (SpecificComponent, option, adminRoute = null) { // SpecificComponent: 화면 component // option: 인증/인가 // adminRoute: 관리자만 허용인 경우 true

    /* option
        null : 아무나 출입
        true : 로그인한 유저만 출입
        false : 로그인한 유저는 출입불가
    */

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user); /**왜 user 인가? => _reducers/index.js 에 user로 지정했기 때문 */
        const dispatch = useDispatch();

        // 유저 정보 request
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                // console.log(response);

                // 로그인 X
                if(!response.payload.isAuth){
                    if(option){ // true : 로그인한 유저만 출입
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 O
                    if(adminRoute && !response.payload.isAdmin){
                        console.log('auth.js admin check');
                        console.log(response.payload.isAdmin);
                        props.history.push('/')
                    } else {
                        if(option === false){ // false : 로그인한 유저는 출입불가
                            props.history.push('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
            // 백엔드 auth 모듈이 반환해준 사용자 정보를 props 에 담아준다.
            // props.user.userData._id 로 접근할 수 있다.
        )
    }
    return AuthenticationCheck
}