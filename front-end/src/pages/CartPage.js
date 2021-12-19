import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'


function CartPage() {
    let [isCartLoaded, setIsCartLoaded] = useState(false);
    let [cartList, setCartList] = useState([]);


    const cartBooks = state => state.books
    let cartRedux = useSelector(cartBooks);
    const dispatchCart = useDispatch()



    useEffect(() => {
        if (cartList !== cartRedux.bookListCart) {
            dispatchCart({ type: 'books/bookListCart/replaceAll', payload: cartList })
        }
    });


    if (!isCartLoaded) {
        setCartList(cartRedux.bookListCart)
        setIsCartLoaded(true)
    }

    function deleteCart(event, item, index) {
        event.preventDefault()
        let newList = cartList.slice()
        newList.splice(index, 1)

        setCartList(newList);
    }

    return (
        <>
            <main>
                <h2>Cart Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br></br>
                    <Link to="/storepage">Store/Search Page</Link>
                    <br></br>
                    <Link to="/browsepage">Store/Browse Page</Link>
                </nav>
               
                Cart:
                <nav>
                    <Link to="/checkoutpage">
                        <button>

                            Check out ({cartList.length})

                        </button>
                    </Link>
                </nav>
                {

                    cartList.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.img_url} alt="Lamp" />


                                <div className="container">
                                    <button className="deleteFromCartButton" onClick={(e) => deleteCart(e, item, index)}> Delete From Cart</button>

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
export default CartPage