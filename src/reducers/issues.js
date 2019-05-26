const issueReducer = (state = {}, action) =>{

    switch(action.type){
        case 'ISSUES':
            return action.payload
        default: 
            return state
    }
}

export default issueReducer


