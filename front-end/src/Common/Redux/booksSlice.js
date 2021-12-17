const initialState = {
    bookListCart : [],
    bookListHistory : [],
    shouldRetrieveFromCache: true,
    hasRetrievedFromCache : false,
    availableBooksId : 0,
    getAvailableBooksId : function () { 
      return this.availableBooksId++;
    }
}

/*
{type: "books/bookListCart", payload: object}
{type: "books/bookListHistory", payload: object}
{type: "books/bookListCart/delete", payload: books.storageId}
*/

export default function booksSlice(state = initialState, action) {
  switch (action.type) {
    
      case 'books/bookListCart/replaceAll': {
        return {
            ...state,
            bookListCart :  action.payload
            
        }
         
      }
      case 'books/bookListCart/delete': {
        let newBooksList = state.bookListCart.filter(books => books.storageId !== action.payload);
        return {
            ...state,
            bookListCart : {newBooksList}
            
        }
      }
      case 'books/bookListHistory/replaceAll': {
        return {
            ...state,
            bookListHistory : action.payload
        }
      }
      case 'books/bookListCart/add':{
        return {
          ...state,
          bookListCart : [...state.bookListCart, action.payload]
      }
      }
      case 'books/bookListHistory/add':{
        return {
          ...state,
          bookListHistory : [...state.bookListHistory, action.payload]
      }
      }
      case 'books/bookListHistory/pop':{
        let p = state.bookListHistory
        p.pop();
        return {
          ...state,
          bookListHistory : p
      }
      }
      case 'books/bookListHistory/clear':{
        return {
          ...state,
          bookListHistory : []
      }
      }
      case 'books/hasRetrievedFromCache': {
        return {
          ...state,
          hasRetrievedFromCache: true
        }
      }
      case 'books/availableBooksId/update': {
        return {
          ...state,
          availableBooksId: action.payload
        }
      }
      default:
        return state
    }
  }