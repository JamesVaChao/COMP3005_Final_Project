import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router'

function CheckOutPage() {
    let [isCartLoaded, setIsCartLoaded] = useState(false);
    let [cartList, setCartList] = useState([]);
    let [checkoutStatus, setCheckoutStatus] = useState("");

    let [creditCardNumber, setCreditCardNumber] = useState("");


    let [billingStreetNumber, setBillingStreetNumber] = useState("");
    let [billingStreetName, setBillingStreetName] = useState("");
    let [billingPostalCode, setBillingPostalCode] = useState("");
    let [billingCity, setBillingCity] = useState("");
    let [billingProvience, setBillingProvience] = useState("");
    let [billingCountry, setBillingCountry] = useState("");

    let [shippingStreetNumber, setShippingStreetNumber] = useState("");
    let [shippingStreetName, setShippingStreetName] = useState("");
    let [shippingPostalCode, setShippingPostalCode] = useState("");
    let [shippingCity, setShippingCity] = useState("");
    let [shippingProvience, setShippingProvience] = useState("");
    let [shippingCountry, setShippingCountry] = useState("");



    const cartBooks = state => state.books
    let cartRedux = useSelector(cartBooks);
    const dispatchCart = useDispatch()

    function quickAutoFill(event) {
        if (event) {
            event.preventDefault()
        }
        setBillingStreetNumber("234")
        setBillingStreetName("Apple Street")
        setBillingPostalCode("60007")
        setBillingCity("Chicago")
        setBillingProvience("Illinois")
        setBillingCountry("USA")

        setShippingStreetNumber("567")
        setShippingStreetName("Shipping Street")
        setShippingPostalCode("K2G 4P2")
        setShippingCity("Ottawa")
        setShippingProvience("Ontario")
        setShippingCountry("Canada")

        setCreditCardNumber("3243-1231-1234")
    }

    useEffect(() => {
        if (cartList !== cartRedux.bookListCart) {
            dispatchCart({ type: 'books/bookListCart/replaceAll', payload: cartList })
        }
    });


    if (!isCartLoaded) {
        setCartList(cartRedux.bookListCart)
        setIsCartLoaded(true)
    }

    async function checkout(event) {
        event.preventDefault()
        let body = {
            "cartList": cartList,
            "billingAddress": {
                "streetNumber": billingStreetNumber,
                "streetName": billingStreetName,
                "postalCode": billingPostalCode,
                "city": billingCity,
                "provience": billingProvience,
                "country": billingCountry
            },
            "shippingAddress": {
                "streetNumber": shippingStreetNumber,
                "streetName": shippingStreetName,
                "postalCode": shippingPostalCode,
                "city": shippingCity,
                "provience": shippingProvience,
                "country": shippingCountry
            },
            "creditCardNumber" : creditCardNumber

        }
        serverInfo.callServer("POST", "checkout", body, (response) => {
            if (response.type === "success") {
                setCheckoutStatus("Checkout successful")
            }
            else {
                setCheckoutStatus("checkout result unsucessful: " + response.msg)
            }
        });

    }
    function checkoutStatusDOM() {
        if (checkoutStatus === "Search successful") {
            return (

                <p style={{ color: "green" }}>
                    {checkoutStatus}
                </p>
            )
        }
        return (

            <p style={{ color: "red" }}>
                {checkoutStatus}
            </p>
        )
    }

    return (
        <>

            <main>
            {checkoutStatus === "Checkout successful" ? (
                <Navigate to="/orderpage" />
            ) : (
                <></>
            )
            }

                <h2>Checkout Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                </nav>

                <nav>
                    <Link to="/storepage">Store Page</Link>
                    <br></br>
                    <Link to="/cartpage">Cart Page</Link>
                </nav>
                {checkoutStatusDOM()}

                <form>
                <h4>Billing Address: </h4>

                    <label>
                        <input
                            name="Street Number"
                            type="text"
                            value={billingStreetNumber}
                            placeholder="Street Number"
                            onChange={e => setBillingStreetNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Street Name"
                            type="text"
                            value={billingStreetName}
                            placeholder="Street Name"
                            onChange={e => setBillingStreetName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Postal Code"
                            type="text"
                            value={billingPostalCode}
                            placeholder="Postal Code"
                            onChange={e => setBillingPostalCode(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="City"
                            type="text"
                            value={billingCity}
                            placeholder="City"
                            onChange={e => setBillingCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Provience"
                            type="text"
                            value={billingProvience}
                            placeholder="Provience"
                            onChange={e => setBillingProvience(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Country"
                            type="text"
                            value={billingCountry}
                            placeholder="Country"
                            onChange={e => setBillingCountry(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Credit Card Number"
                            type="text"
                            value={creditCardNumber}
                            placeholder="Credit Card Number"
                            onChange={e => setCreditCardNumber(e.target.value)}
                        />
                    </label>
                    <br />

                    <h4>Shipping Address: </h4>

                    <label>
                        <input
                            name="Street Number"
                            type="text"
                            value={shippingStreetNumber}
                            placeholder="Street Number"
                            onChange={e => setShippingStreetNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Street Name"
                            type="text"
                            value={shippingStreetName}
                            placeholder="Street Name"
                            onChange={e => setShippingStreetName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Postal Code"
                            type="text"
                            value={shippingPostalCode}
                            placeholder="Postal Code"
                            onChange={e => setShippingPostalCode(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="City"
                            type="text"
                            value={shippingCity}
                            placeholder="City"
                            onChange={e => setShippingCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Provience"
                            type="text"
                            value={shippingProvience}
                            placeholder="Provience"
                            onChange={e => setShippingProvience(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Country"
                            type="text"
                            value={shippingCountry}
                            placeholder="Country"
                            onChange={e => setShippingCountry(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>

                        <button type="submit" onClick={checkout}>Checkout ({cartList.length}) items</button>
                        <button onClick={quickAutoFill}>Autofill for testing/demo</button>

                    </label>

                </form>


                Cart:

                {

                    cartList.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.img_url} alt="Lamp" />


                                <div className="container">
                                    <h4><b>{item.name}</b></h4>
                                    <p>
                                        Book Status: {item.book_status.toUpperCase()} <br />
                                        Price: ${item.price}<br />
                                        Genre: {item.genre}
                                        <br />

                                        Number Of Pages: {item.number_of_pages}
                                        <br />

                                        Publisher: {item.publisher}
                                        <br />

                                        Book ID: {item.book_id}

                                    </p>


                                </div>
                            </div>

                        )
                    })
                }
            </main>

        </>
    );
}
export default CheckOutPage