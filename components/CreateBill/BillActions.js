
export const ADD_BILL = 'ADD_BILL'

export const addBillAction = (bill) => (dispatch) => {
    dispatch({
        type: ADD_BILL,
        payload: bill
    })
}

