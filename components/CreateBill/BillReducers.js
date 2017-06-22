import * as actions from './BillActions'

const billReducer = (state = [], action ) => {
    switch(action.type) {
        case 'ADD_BILL':
            return [ ...state, action.payload];

        default:
            return state;

    }
}

export default billReducer
