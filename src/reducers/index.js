import { combineReducers } from 'redux';
import loginReducer from './login'
import issueReducer from './issues'
import singleIssue from './singleIssue'
import statusChangeReducer from './statusChange'
import myAssignmentsReducer from './myAssignmentsReducer'
import employeesReducer from './employeesReducer'
const rootReducer = combineReducers({
    statuschange : statusChangeReducer,
    issue: singleIssue,
    user: loginReducer,
    issues: issueReducer,
    myAssignments : myAssignmentsReducer,
    employees : employeesReducer
})



export default rootReducer
