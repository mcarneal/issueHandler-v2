import { combineReducers } from 'redux';
import loginReducer from './login'
import issueReducer from './issues'



const rootReducer = combineReducers({
    user: loginReducer,
    issues: issueReducer
})



export default rootReducer
