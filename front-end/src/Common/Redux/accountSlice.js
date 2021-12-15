const initialState = {
    login : false,
    firstName : "Guest",
    email : "",
    lastName : "",
    photoURL : "",
    userID : "",
    passwordHash : "",
    loginMethod: ""

}

/*
{type: "account/login", payload: boolean}
{type: "account/name", payload: "string"}
{type: "account/email", payload: "string"}

*/

export default function accountSlice(state = initialState, action) {
    switch (action.type) {
      case 'account/login': {
        return {
            ...state,
            login : action.payload
            
        }
         
      }
      case 'account/userID': {
        return {
            ...state,
            userID : action.payload
            
        }
         
      }
      case 'account/loginMethod': {
        return {
            ...state,
            loginMethod : action.payload
            
        }
         
      }
      case 'account/passwordHash': {
        return {
            ...state,
            passwordHash : action.payload
            
        }
         
      }
      case 'account/email': {
        return {
            ...state,
            email : action.payload
            
        }
         
      }
      case 'account/firstName': {
        return {
            ...state,
            firstName : action.payload
            
        }
      }
      case 'account/lastName': {
        return {
            ...state,
            lastName : action.payload
            
        }
      }
      case 'account/photoURL': {
        return {
            ...state,
            photoURL : action.payload
            
        }
      }
      default:
        return state
    }
  }