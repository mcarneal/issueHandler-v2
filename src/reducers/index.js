import { combineReducers } from 'redux';
import loginReducer from './login'
import issueReducer from './issues'
import singleIssue from './singleIssue'


const rootReducer = combineReducers({
    issue: singleIssue,
    user: loginReducer,
    issues: issueReducer
})



export default rootReducer
