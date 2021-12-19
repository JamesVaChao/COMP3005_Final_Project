import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'


function BrowsePage() {
    const [bookSearchInfo, setBookSearchInfo] = useState("");
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [booksFound, setBooksFound] = useState([])


    async function getAllBooks(event) {
        event.preventDefault()
        let body = {
            "bookSearchInfo": bookSearchInfo,
        }
        serverInfo.callServer("POST", "getAllBooks", body, (response) => {
            if (response.type === "success") {
                if (response.booksFound && response.booksFound.length > 0) {
                    setBookSearchStatus("Browse successful")
                    setBooksFound(response.booksFound)
                }
                else if (response.booksFound.length === 0) {
                    setBookSearchStatus("No books found")
                }
            }
            else {
                setBookSearchStatus("Browse result unsucessful: " + response.msg)
            }
        });

    }

    function bookSearchStatusDOM() {
        if (bookSearchStatus === "Browse successful") {
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
        dispatchCart({ type: 'books/bookListCart/add', payload: book })
    }
    return (
        <>
            <main>
                <h2>Store/Browse Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br />

                </nav>

                {bookSearchStatusDOM()}

                <p>
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
export default BrowsePage