import React, { useState } from "react";

import { useDispatch } from 'react-redux'
import serverInfo from './../../Common/ServerInfo.js';
import { Navigate  } from 'react-router'


const isDevFastLogin =  serverInfo.DEBUG_MODE;


const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  async function devFastLogin(event) {
    if(event){
      event.preventDefault()
      }
    try {
      setUserName("jamesUserID")
      setPassword("jamesPassword")
    }
    catch (e) {
      console.error("Error with guest login");
      console.error(e);
    }

  }
  if (isDevFastLogin) {
    //devFastLogin();
  }


  const dispatchAccount = useDispatch()


  function dispatchBasedOnServerResponse(response) {
    dispatchAccount({ type: 'account/login', payload: true })
    dispatchAccount({ type: 'account/loginMethod', payload: response.user.loginMethod })
    dispatchAccount({ type: 'account/passwordHash', payload: response.user.passwordHash })
    dispatchAccount({ type: 'account/firstName', payload: response.user.firstName })
    dispatchAccount({ type: 'account/lastName', payload: response.user.lastName })
    dispatchAccount({ type: 'account/email', payload: response.user.userID })
    dispatchAccount({ type: 'account/userID', payload: response.user.userID })
    dispatchAccount({ type: 'account/photoURL', payload: response.user.photoUrl })
  }







  function navigateToHome() {
    setLoginResult("success")
    
  }
  const signInViaEmailOnClick = (event) => {
    if(event){
    event.preventDefault()
    }
    let body = {
      "username": username,
      "password": password
    }
    serverInfo.callServer("POST", "login", body, (response) => {
      if (response.type === "success") {
        dispatchBasedOnServerResponse(response)
        setLoginResult(response.type)
        navigateToHome()

      }
      else{
        setLoginResult("login result unsucessful: " + response.msg)
      }
    });
    console.log(loginResult)

  }


  return (

    <div >
        {loginResult === "success" ? (
             <Navigate to="/" /> 
          ) : (
            <>Hi</>
          )
        }

      <p>Sign in to Continue</p>
      <form>
        <label>
          User Name:
          <input
            name="userName"
            type="text"
            value = {username}
            placeholder="User Name"
            onChange={e => setUserName(e.target.value)}

          />
         </label>
        <br />
        <label>
          password:
          <input
            name="password"
            type="text"
            value = {password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}

          />
         </label>
        <br />
        <label>
          
          <input type="submit" value="login" onClick={signInViaEmailOnClick}/>

        </label>
      </form>
        <button onClick={devFastLogin}>dev fast login</button>
      <p style={{ color: "red" }}>
        {loginResult}
      </p>
        


    </div>
  );
};


/*

<style>
container: {
  backgroundColor: 'white',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}
logo: {
  height: 200,
  width: 200,
  resizeMode: 'cover',
}
text: {
  fontSize: 20,
  marginBottom: 5,
  color: '#051d5f',

}
navButton: {
  marginTop: 10,
}
forgotButton: {
  marginVertical: 10,
}
navButtonText: {
  fontSize: 15,
  fontWeight: '500',
  color: 'black',
}

</style>
*/
export default LoginScreen;
