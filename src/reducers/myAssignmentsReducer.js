const myAssignmentsReducer = (state = {}, action) =>{

    switch(action.type){
        case 'MYASSIGNMENTS':
            return action.payload
        default: 
            return state
    }
}

export default myAssignmentsReducer



