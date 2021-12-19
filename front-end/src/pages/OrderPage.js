import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector } from 'react-redux'

function OrderPage() {
    let [isOrderListLoaded, setIsOrderListLoaded] = useState(false);
    let [orderList, setOrderList] = useState([]);
    let [getOrderStatus, setGetOrderStatus] = useState("");


    const account = state => state.account
    let accountRedux = useSelector(account);

    if (!isOrderListLoaded) {
        getOrderList()
        setIsOrderListLoaded(true)

    }

    async function getOrderList(event) {
        if(event){
        event.preventDefault()
        }
        let body = {
            "userID" : accountRedux.userID
        }
        serverInfo.callServer("POST", "getOrderList", body, (response) => {
            if (response.type === "success") {
                var serverOrderList = JSON.parse(response.orderList)
                debugger;

                if(serverOrderList != null){
                    setOrderList(serverOrderList)
                    setGetOrderStatus("Get order successful")
                }
                else {
                    setGetOrderStatus("Get order result unsucessful: " + response.msg)
                }
            }
            else {
                setGetOrderStatus("Get order result unsucessful: " + response.msg)
            }
        });

    }
    function getOrderStatusDOM() {
        if (getOrderStatus === "Get order successful") {
            return (

                <p style={{ color: "green" }}>
                    {getOrderStatus}
                </p>
            )
        }
        return (

            <p style={{ color: "red" }}>
                {getOrderStatus}
            </p>
        )
    }

    return (
        <>

            <main>
                <h2>Order Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                </nav>

                <nav>
                    <Link to="/storepage">
                            Store Page
                    </Link>
                    <br></br>
                    <Link to="/cartpage">
                            Cart Page
                    </Link>
                </nav>
                <button onClick={(e)=>getOrderList(e)}>Dev Refresh Order Page</button>
                {getOrderStatusDOM()}

             

                Cart:

                {

                    orderList.map((order, orderIndex) => {
                        return (
                            <div key = {orderIndex} className="order-container">
                                Order Number: {order.order_number}
                                <br></br>
                                Location: {order.location}
                                <br></br>
                                Billing Info: {order.billing_information}
                                <br></br>
                                Shipping Info: {order.shipping_infomation}
                                <br></br>
                                {order.book_list.map((book, bookIndex) => {return (
                                    <div className="order-card" key={bookIndex}>
                                        <img className="card-image" src={book.img_url} alt="Lamp" />

                                        <div className="container">
                                        <h4><b>{book.name}</b></h4>
                                        <p>

                                            Genre: {book.genre}
                                            <br />
    
                                            Number Of Pages: {book.number_of_pages}
                                            <br />
    
                                            Publisher: {book.publisher}
                                            <br />
    
                                            Book ID: {book.book_id}
    
                                        </p>
    
    
                                    </div>

                                    </div>
                                    
                                )})}
                              
                              </div>
                        

                        )
                    })
                }
            </main>

        </>
    );
}
export default OrderPage