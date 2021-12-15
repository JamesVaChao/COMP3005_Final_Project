import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DevPage from "./pages/DevPage.js"
import HomePage from "./pages/HomePage"
import { store } from './Common/Redux/store.js'
import { Provider, useDispatch } from 'react-redux'
import LoginScreen from "./pages/LoginView/LoginScreen";
import StorePage from "./pages/StorePage";

export const App = ()=> {
  return (
    <Provider store={store}>

    <div className="App">
      <h1>COMP3005 Book Store</h1>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/DevPage" element={<DevPage />} />
        <Route path="/loginpage" element={<LoginScreen />} />
        <Route path="/storepage" element={<StorePage />} />

      </Routes>
    </div>
    </Provider>

  );
  
}
export default App

// App.js

