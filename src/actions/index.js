import API_URL from '../config.js'

export const login = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}

export const statusChanged = (change) => {
    return{
        type: 'CHANGED',
        payload: change
    }
}

export const allIssues = (issues) => {
    return{
        type: 'ISSUES',
        payload: issues
    }
}

export const selectedIssue = (issue) => {
    return{
        type: 'SELECTEDISSUE',
        payload: issue 
    }
}

export const findAllEmployees = (employees) => {
    return{
        type: 'ALLEMPLOYEES',
        payload: employees
    }
}

export const storeMyAssignments = (assignment) => {
    return {
        type : 'MYASSIGNMENTS',
        payload : assignment 
    }
}

export const autoLogin = (props) => {
    return dispatch => {
        fetch(`${API_URL}/api/v1/get_employee`,{
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {           
                    dispatch({ type: 'LOGIN', payload: data })
                        
                }
            })
    }
}
