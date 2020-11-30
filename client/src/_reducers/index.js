import { combineReducers } from 'redux'; // 다수 reducer 합치기
import user from './user_reducer';

const rootReducer = combineReducers({
    user, // userReducer or userStore 가 적당할 듯
})

export default rootReducer;