import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
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
import OwnerReportPage from "./pages/OwnerReportPage";
import BrowsePage from "./pages/BrowsePage";

export const App = ()=> {
  return (
    <Provider store={store}>

    <div className="App">
      <h1>COMP3005 Book Store</h1>

      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/storepage" element={<StorePage />} />
        <Route path="/BrowsePage" element={<BrowsePage />} />

        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/checkoutpage" element={<CheckOutPage />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/ownerBookCollectionPage" element={<OwnerBookCollectionPage />} />
        <Route path="/OwnerReportPage" element={<OwnerReportPage />} />

      </Routes>
    </div>
    </Provider>

  );
  
}
export default App

// App.js

