import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DevPage from "./pages/DevPage.js"
import HomePage from "./pages/HomePage"
import { store } from './Common/Redux/store.js'
import { Provider } from 'react-redux'
import LoginPage from "./pages/LoginPage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import RegisterPage from "./pages/RegisterPage";
import OwnerBookCollectionPage from "./pages/OwnerBookCollectionPage";
import OwnerPublisherPage from "./pages/OwnerPublisherPage";
import OwnerDataPage from "./pages/OwnerDataPage";

export const App = ()=> {
  return (
    <Provider store={store}>

    <div className="App">
      <h1>COMP3005 Book Store</h1>

      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/DevPage" element={<DevPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/storepage" element={<StorePage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/checkoutpage" element={<CheckOutPage />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/ownerBookCollectionPage" element={<OwnerBookCollectionPage />} />
        <Route path="/OwnerPublisherPage" element={<OwnerPublisherPage />} />
        <Route path="/OwnerDataPage" element={<OwnerDataPage />} />

      </Routes>
    </div>
    </Provider>

  );
  
}
export default App

// App.js

