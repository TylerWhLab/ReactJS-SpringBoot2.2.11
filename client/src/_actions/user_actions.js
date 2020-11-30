import axios from 'axios';
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
} from './types';
import { USER_SERVER } from '../components/Config.js'; // '/api/users'

export function loginUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post('/api/users/login', requestBody)
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: LOGIN_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function registerUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post('/api/users/register', requestBody)
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: REGISTER_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function auth() { // GET request이므로 바디 필요없음
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.get('/api/users/auth')
        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: AUTH_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id) {
    let body = {
        productId: id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            // CartItem들에 해당하는 정보들을  
            // Product Collection에서 가져온후에 
            // Quantity 정보를 넣어 준다.
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId) {

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
            //productInfo ,  cart 정보를 조합해서   CartDetail을 만든다. 
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity // Product Table + User Cart quantity
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}



export function onSuccessBuy(data) {

    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}


export function getNotice(reqBody) {

    const responseData = axios.post(`/api/notice`, reqBody)
        .then(response => response.data);

    return {
        type: GET_NOTICE,
        payload: responseData
    }
}