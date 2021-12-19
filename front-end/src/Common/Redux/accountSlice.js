const initialState = {
    isLoggedIn : false,
    firstName : "Guest",
    email : "",
    lastName : "",
    photoURL : "",
    username : "JamesUserID",
    passwordHash : "",
    loginMethod: "",
    accountType: "Guest"

}

/*
{type: "account/login", payload: boolean}
{type: "account/name", payload: "string"}
{type: "account/email", payload: "string"}

*/

export default function accountSlice(state = initialState, action) {
    switch (action.type) {
      case 'account/isLoggedIn': {
        return {
            ...state,
            login : action.payload
            
        }
         
      }
      case 'account/username': {
        return {
            ...state,
            username : action.payload
            
        }
         
      }
      case 'account/accountType': {
        return {
            ...state,
            accountType : action.payload
            
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

      default:
        return state
    }
  }