export const login = (user) => {
    return {
        type: 'LOGIN',
        payload: user
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

export const autoLogin = (props) => {
    return dispatch => {
        fetch('http://localhost:3000/api/v1/get_employee',{
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
