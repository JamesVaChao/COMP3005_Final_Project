import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector, useDispatch } from 'react-redux'


function StorePage() {
    const [bookSearchInfo, setBookSearchInfo] = useState("");
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [booksFound, setBooksFound] = useState([])
    const [searchType, setSearchType] = useState("All")

    const cartBooks = state => state.books
    let cartRedux = useSelector(cartBooks);
    const dispatchCart = useDispatch()

    async function searchForBooks(event) {
        event.preventDefault()
        let body = {
            "bookSearchInfo": bookSearchInfo,
            "searchType" : searchType,
        }
        serverInfo.callServer("POST", "searchForBooks", body, (response) => {
            if (response.type === "success") {
                if (response.booksFound && response.booksFound.length > 0) {
                    setBookSearchStatus("Search successful")
                }
                else if (response.booksFound.length === 0) {
                    setBookSearchStatus("No books found")
                }
                setBooksFound(response.booksFound)

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
        dispatchCart({ type: 'books/bookListCart/add', payload: book })
    }

    /*
    "All"
    "Author"
    "Genre"
    "Name"
    "ISBN"

    */
    const searchTypesOptions = [
        {
            label: "All",
            value: "All",
        },
        {
            label: "Name",
            value: "Name",
        }, {
            label: "Author",
            value: "Author",
        }, {
            label: "Genre",
            value: "Genre",
        }, {
            label: "ISBN",
            value: "ISBN",
        },
    ];
    return (
        <>
            <main>
                <h2>Store/Search Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br />
                    <Link to="/browsepage">Store/Browse Page</Link>
                    <br />
                </nav>
                <label>Search Type: </label> 
                <select onChange={(e) => setSearchType(e.target.value)}>
                        {searchTypesOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
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
                        <Link to="/cartPage"><button>Go to Cart ({cartRedux.bookListCart.length})</button></Link>

                    </label>

                </form>
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
export default StorePage