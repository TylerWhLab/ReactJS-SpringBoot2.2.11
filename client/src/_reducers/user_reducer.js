import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    GET_NOTICE,
} from '../_actions/types';


export default function (previousState = {}, action) { // previousState = 빈 값
    switch (action.type) {
        case LOGIN_USER:
            return { ...previousState, login_reducerNextState: action.payload } // ... 스프레드 오퍼레이터 : 인자로 받은 previousState를 그대로 가져옴 // login_reducerNextState 로 store 내 데이터가 더떤 동작으로 저장되었는지 구분?
            // store로 이동(이전 state, 변경된 state)
            // 이전 state는 request완료되어 필요없어서 빈값으로 만드나?

        case REGISTER_USER:
            return { ...previousState, register_reducerNextState: action.payload }
        
        case AUTH_USER:
            return { ...previousState, userData: action.payload }

        case LOGOUT_USER:
            return { ...previousState }
        case ADD_TO_CART:
            return {
                ...previousState,
                userData: {
                    ...previousState.userData, // 사용자 정보에 
                    cart: action.payload // cart 정보 append
                }
            }
        case GET_CART_ITEMS:
            return { ...previousState, cartDetail: action.payload }
        case REMOVE_CART_ITEM:
            return {
                ...previousState, cartDetail: action.payload.productInfo,
                userData: {
                    ...previousState.userData,
                    cart: action.payload.cart
                }
            }
        case ON_SUCCESS_BUY:
            return {
                ...previousState, cartDetail: action.payload.cartDetail,
                userData: {
                    ...previousState.userData, cart: action.payload.cart
                }
            }

        case GET_NOTICE:
            return { ...previousState, noticeReducer: action.payload }

        default:
            return previousState;
    }
}