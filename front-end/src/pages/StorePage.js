import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';

const book1 = {
    book_id: "1234", name: "Harry Potter and the Philosopher's Stone", book_status: "available", author: "J. K. Rowling", genre: ["fantasy", "fiction"], publisher: "Bloomsbury Publishing",
    number_of_pages: 350, price: 15.99, sales_percent_to_publisher: 0.10, img_url: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg"
}
function StorePage() {
    const [count, setCount] = useState(0);
    const [bookSearchInfo, setBookSearchInfo] = useState("");
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [booksFound, setBooksFound] = useState([book1])




    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });


    async function searchForBooks(event) {
        event.preventDefault()
        let body = {
            "bookSearchInfo": bookSearchInfo,
        }
        serverInfo.callServer("POST", "searchForBooks", body, (response) => {
            if (response.type == "success") {
                if (response.booksFound && response.booksFound.length > 0) {
                    setBooksFound(response.booksFound)
                }
                else if (response.booksFound.length == 0) {
                    setBookSearchStatus("No books found")
                }


            }
            else {
                setBookSearchStatus("search result unsucessful: " + response.msg)
            }
        });

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
                    Books:

                </p>
                {
        
                    booksFound.map((item, index) => {
                        return (
                            <div class="card">
                            <img class = "card-image" src={item.img_url} alt="Lamp"/>

                            
                            <div class="container">
                                <h4><b>{item.name}</b></h4>
                                <p>                                    
                                    Book Status: {item.book_status.toUpperCase()} <br/>
                                    Price: ${item.price}<br/>
                                    Genre: {item.genre.map((genre, index) => {
                                        if (index < item.genre.length - 1) {
                                            return genre + ", "
                                        }
                                        else{
                                            return genre + " "
                                        }
                                        })}
                                        <br/>
                                    
                                    Number Of Pages: {item.number_of_pages}
                                    <br/>
                                    
                                    Publisher: {item.publisher}
                                    <br/>

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