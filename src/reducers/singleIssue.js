const singleReducer = (state = {}, action) =>{

    switch(action.type){
        case 'SELECTEDISSUE':
            return action.payload
        default: 
            return state
    }
}

export default singleReducer

