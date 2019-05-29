import { combineReducers } from 'redux';
import loginReducer from './login'
import issueReducer from './issues'
import singleIssue from './singleIssue'
import statusChangeReducer from './statusChange'

const rootReducer = combineReducers({
    statuschange : statusChangeReducer,
    issue: singleIssue,
    user: loginReducer,
    issues: issueReducer
})



export default rootReducer
