import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import serverInfo from '../Common/ServerInfo.js';
import { Navigate } from 'react-router'

const isDevFastLogin = serverInfo.DEBUG_MODE;

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  async function devFastLogin(event, accountType) {
    if (event) {
      event.preventDefault()
    }
    try {
      if(accountType == "user"){
      setUserName("jamesUsername-UserAccount")
      }
      if(accountType == "owner"){
        setUserName("jamesUsername-OwnerAccount")
      }
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
    dispatchAccount({ type: 'account/isLoggedIn', payload: true })
    dispatchAccount({ type: 'account/firstName', payload: response.user.firstName })
    dispatchAccount({ type: 'account/lastName', payload: response.user.lastName })
    dispatchAccount({ type: 'account/email', payload: response.user.email })
    dispatchAccount({ type: 'account/username', payload: response.user.username })
    dispatchAccount({ type: 'account/password', payload: response.user.password })
    dispatchAccount({ type: 'account/accountType', payload: response.user.accountType })
  }

  function navigateToHome() {
    setLoginResult("success")

  }
  const signInViaEmailOnClick = (event) => {
    if (event) {
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
      else {
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
        <></>
      )
      }

      <p>Sign in to Continue</p>
      <form>
        <label>
          User Name:
          <input
            name="userName"
            type="text"
            value={username}
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
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}

          />
        </label>
        <br />
        <label>

          <input type="submit" value="login" onClick={signInViaEmailOnClick} />

        </label>
      </form>
      <button onClick={(e) => devFastLogin(e, 'user')}>Autofill user for testing/demo</button>
      <button onClick={(e) => devFastLogin(e, 'owner')}>Autofill owner for testing/demo</button>

      <p style={{ color: "red" }}>
        {loginResult}
      </p>



    </div>
  );
};

export default LoginPage;
