import React, { useState, useEffect } from "react";
//import LoginInput from "./LoginInput"
//import LoginButton from "./LoginButton"
import { useSelector, useDispatch } from 'react-redux'
import serverInfo from './../../Common/ServerInfo.js';
import { Navigate  } from 'react-router'

//Set to false to stay on screen to do other things
//Used for faster testing
const fastGuestLogin = true && serverInfo.DEBUG_MODE;

const GUESTLOGINSCREEN = "HomeScreen";
const isGuestButtonEnabled = false;
//BlackListScreen //IngredientListScreen //PreferencesScreen
//HomeScreen DataScreen

const LoginScreen = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");


  const dispatchAccount = useDispatch()
  const dispatchPreferences = useDispatch()
  const dispatchProducts = useDispatch()

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



  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validate() {

    if (validateEmail(username)) {
      /*
      $result.text(email + " is valid :)");
      $result.css("color", "green");
    } else {
      $result.text(email + " is not valid :(");
      $result.css("color", "red");
    }
    */
    return false;
  }
  }

  async function guestLoginOnClick(event) {
    try {
      let body = {
        "userID": "user",
        "password": "user"
      }
      serverInfo.callServer("POST", "login", body, (response) => {

        response.user.loginMethod = "email"
        dispatchBasedOnServerResponse(response)
        navigateToHome()
      }
      )
   
    }
    catch (e) {
      console.error("Error with guest login");
      console.error(e);
    }

  }
  if (fastGuestLogin) {
    guestLoginOnClick();
  }


  function navigateToHome() {
    setLoginResult("success")
    
  }
  const signInViaEmailOnClick = (event) => {
    event.preventDefault()
    let body = {
      "username": username,
      "password": password
    }
    serverInfo.callServer("POST", "login", body, (response) => {
      if (response.type == "success") {
        dispatchBasedOnServerResponse(response)
        debugger
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
        {loginResult == "success" ? (
             <Navigate to="/" /> 
          ) : (
            <>Hi</>
          )
        }

      <p>Sign in to Continue</p>
      <form>
        <label>
          email:
          <input
            name="email"
            type="text"
            value = {username}
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
            onChange={e => setPassword(e.target.value)}

          />
         </label>
        <br />
        <label>
          
          <input type="submit" value="login" onClick={signInViaEmailOnClick}/>

        </label>
      </form>

      {/*
      <LoginInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <LoginInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      */}
      <p style={{ color: "red" }}>
        {loginResult}
      </p>
        
      {/*
      {isGuestButtonEnabled &&
        <LoginButton
          buttonTitle="Guest Login"
          onClick={guestLoginOnClick}
        />
      }
     */}

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
