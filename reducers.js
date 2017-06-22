import loginReducerFactory from 'isotope-client/login/loginReducers'
import autocompleteReducer from 'isotope-client/components/autocomplete/reducer'
import BillReducers from './components/CreateBill/BillReducers'

export const user = loginReducerFactory(window.localStorage)
export const autocomplete = autocompleteReducer
export const bills = BillReducers




