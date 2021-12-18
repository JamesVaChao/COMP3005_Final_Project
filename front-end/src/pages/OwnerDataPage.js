import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'


function OwnerDataPage() {
    const [bookSearchInfo, setBookSearchInfo] = useState("");
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [booksFound, setBooksFound] = useState([])
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

    function deleteCart(event, item) {
        event.preventDefault()
        let newCartList = cartList.filter(cartItem => cartItem !== item)

        setCartList(newCartList);
    }

    async function searchForBooks(event) {
        event.preventDefault()
        let body = {
            "bookSearchInfo": bookSearchInfo,
        }
        serverInfo.callServer("POST", "searchForBooks", body, (response) => {
            if (response.type === "success") {
                if (response.booksFound && response.booksFound.length > 0) {
                    setBookSearchStatus("Search successful")
                    setBooksFound(response.booksFound)
                }
                else if (response.booksFound.length === 0) {
                    setBookSearchStatus("No books found")
                }


            }
            else {
                setBookSearchStatus("search result unsucessful: " + response.msg)
            }
        });

    }
    function bookSearchStatusDOM() {
        if (bookSearchStatus === "Search successful") {
            return (

                <p style={{ color: "green" }}>
                    {bookSearchStatus}
                </p>
            )
        }
        return (

            <p style={{ color: "red" }}>
                {bookSearchStatus}
            </p>
        )
    }
    function addToCart(e, book) {
        debugger
        setCartList([...cartList, book])
    }
    return (
        <>
            <main>
                <h2>Store Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
                <form>
                    <label>
                        <input
                            name="bookSearchInfo"
                            type="text"
                            value={bookSearchInfo}
                            placeholder="search for a book here..."
                            onChange={e => setBookSearchInfo(e.target.value)}

                        />
                    </label>

                    <br />
                    <label>

                        <input type="submit" value="search" onClick={searchForBooks} />

                    </label>

                </form>
                <p>
                    {bookSearchStatusDOM()}
                    <br></br>
                    Books:

                </p>
                {

                    booksFound.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.img_url} alt="Lamp" />


                                <div className="container">
                                    <button className="addToCartButton" onClick={(e) => addToCart(e, item)}> Add to Cart</button>

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

                Cart:
                <nav>
                    <Link to="/checkoutpage">
                        <button>

                            Check out

                        </button>
                    </Link>
                </nav>
                {

                    cartList.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.img_url} alt="Lamp" />


                                <div className="container">
                                    <button className="deleteFromCartButton" onClick={(e) => deleteCart(e, item)}> Delete From Cart</button>

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
export default OwnerDataPage