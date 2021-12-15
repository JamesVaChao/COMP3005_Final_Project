
 
import { combineReducers } from 'redux'

import accountReducer from './accountSlice'
import productsReducer from './productsSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  account: accountReducer,
  products: productsReducer

})

export default rootReducer