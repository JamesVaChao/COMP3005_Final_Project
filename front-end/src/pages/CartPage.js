import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'

const book1 = {
    book_id: "1234", name: "Harry Potter and the Philosopher's Stone", book_status: "available", author: "J. K. Rowling", genre: ["fantasy", "fiction"], publisher: "Bloomsbury Publishing",
    number_of_pages: 350, price: 15.99, sales_percent_to_publisher: 0.10, img_url: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
}
function CartPage() {
    const [bookSearchInfo, setBookSearchInfo] = useState("");
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [booksFound, setBooksFound] = useState([book1])
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
                <h2>Cart Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br></br>
                    <Link to="/storepage">Store Page</Link>

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
export default CartPage