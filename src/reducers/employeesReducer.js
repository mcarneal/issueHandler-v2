const employeesReducer = (state = {}, action) =>{

    switch(action.type){
        case 'ALLEMPLOYEES':
            return action.payload
        default: 
            return state
    }
}

export default employeesReducer


