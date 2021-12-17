
 
import { combineReducers } from 'redux'

import accountReducer from './accountSlice'
import bookReducer from './booksSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  account: accountReducer,
  books: bookReducer

})

export default rootReducer