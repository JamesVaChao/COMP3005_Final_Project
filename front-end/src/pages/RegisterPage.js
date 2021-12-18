import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import serverInfo from '../Common/ServerInfo.js';
import { Navigate  } from 'react-router'

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user");

  const [loginResult, setRegisterResult] = useState("");

  async function devFastRegister(event) {

    try {
      setFirstName("James")
      setLastName("Chao")
      setUserName("jamesUserID")
      setEmail("james@email.com")
      setPassword("jamesPassword")
    }
    catch (e) {
      console.error("Error with guest login");
      console.error(e);
    }

  }

  function navigateToHome() {
    setRegisterResult("success")
    
  }
  const register = (event) => {
    if(event){
      event.preventDefault()
    }
    let body = {
      "username": username,
      "password": password,
      "firstName":firstName,
      "lastName":lastName,
      "email":email,
      "accountType":accountType
    }

    serverInfo.callServer("POST", "register", body, (response) => {
      if (response.type === "success") {
        dispatchBasedOnServerResponse(response)
        setRegisterResult(response.type)
        navigateToHome()

      }
      else{
        setRegisterResult("login result unsucessful: " + response.msg)
      }
    });
    console.log(loginResult)

  }

  const accountTypeOptions = [
    {
      label: "User",
      value: "user",
    },
    {
      label: "Owner",
      value: "owner",
    },

  ];
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

  return (

    <div >
        {loginResult === "success" ? (
             <Navigate to="/" /> 
          ) : (
            <></>
          )
        }

      <p>Register here</p>
      <form>
      <label>
          First name:
          <input
            name="firstName"
            type="text"
            value = {firstName}
            placeholder="First name"
            onChange={e => setFirstName(e.target.value)}

          />
         </label>
         <label>
          Last name:
          <input
            name="lastName"
            type="text"
            value = {lastName}
            placeholder="Last name"
            onChange={e => setLastName(e.target.value)}

          />
         </label>
         <label>
          Email:
          <input
            name="email"
            type="text"
            value = {email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}

          />
         </label>
        <label>
          User Name:
          <input
            name="username"
            type="text"
            value = {username}
            placeholder="username"
            onChange={e => setUserName(e.target.value)}

          />
         </label>
        <br />
        <label>
          Password:
          <input
            name="password"
            type="text"
            value = {password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}

          />
         </label>
        <br />
        <select  onChange={(e) => setAccountType(e.target.value)}>
            {accountTypeOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        <br />
        <label>
          
          <input type="submit" value="login" onClick={register}/>

        </label>
      </form>
      <button onClick={devFastRegister}> dev fast register</button>

      <p style={{ color: "red" }}>
        {loginResult}
      </p>
        
    </div>
  );
};


export default RegisterScreen;
