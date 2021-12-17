import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'

function CheckOutPage() {
    let [isCartLoaded, setIsCartLoaded] = useState(false);
    let [cartList, setCartList] = useState([]);
    let [userStreetNumber, setUserStreetNumber] = useState("");
    let [userStreetName, setUserStreetName] = useState("");
    let [userPostalCode, setUserPostalCode] = useState("");
    let [userCity, setUserCity] = useState("");
    let [userProvience, setUserProvience] = useState("");
    let [userCountry, setUserCountry] = useState("");
    let [checkoutStatus, setCheckoutStatus] = useState("");


    const cartBooks = state => state.books
    let cartRedux = useSelector(cartBooks);
    const dispatchCart = useDispatch()

    function quickAutoFill(){
        setUserStreetNumber("234")
        setUserStreetName("Apple Street")
        setUserPostalCode("K2G 4P2")
        setUserCity("Ottawa")
        setUserProvience("Ontario")
        setUserCountry("Canada")
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
            "userStreetNumber" : userStreetNumber,
            "userStreetName" : userStreetName,
            "userPostalCode" : userPostalCode,
            "userCity" : userCity,
            "userProvience" : userProvience,
            "userCountry" : userCountry
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
                <h2>Checkout Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                </nav>

                <nav>
                    <Link to="/storepage">
                        <button>
                            Go back to store
                        </button>
                    </Link>
                    <Link to="/cartpage">
                        <button>
                            Go back to cart
                        </button>
                    </Link>
                </nav>
                <button onClick={quickAutoFill}> developer quick autofill</button>
                {checkoutStatusDOM()}

                <form>
                    <label>
                        <input
                            name="Street Number"
                            type="text"
                            value={userStreetNumber}
                            placeholder="Street Number"
                            onChange={e => setUserStreetNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Street Name"
                            type="text"
                            value={userStreetName}
                            placeholder="Street Name"
                            onChange={e => setUserStreetName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Postal Code"
                            type="text"
                            value={userPostalCode}
                            placeholder="Postal Code"
                            onChange={e => setUserPostalCode(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="City"
                            type="text"
                            value={userCity}
                            placeholder="City"
                            onChange={e => setUserCity(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Provience"
                            type="text"
                            value={userProvience}
                            placeholder="Provience"
                            onChange={e => setUserProvience(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="Country"
                            type="text"
                            value={userCountry}
                            placeholder="Country"
                            onChange={e => setUserCountry(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                
                <input type="submit" value="checkout" onClick={checkout}/>

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
                                        Genre: {item.genre.map((genre, index) => {
                                            if (index < item.genre.length - 1) {
                                                return genre + ", "
                                            }
                                            else {
                                                return genre + " "
                                            }
                                        })}
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