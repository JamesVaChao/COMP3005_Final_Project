import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';


function BrowsePage() {
    const [bookSearchStatus, setBookSearchStatus] = useState("");
    const [bookList, setBookList] = useState([])
    let [isBookListLoaded, setIsBookListLoaded] = useState(false);

    if (!isBookListLoaded) {
        getAllBooks()
        setIsBookListLoaded(true)

    }

    async function getAllBooks(event) {
        if(event){
        event.preventDefault()
        }
        let body = {
        }
        serverInfo.callServer("POST", "getAllBooks", body, (response) => {
            if (response.type === "success") {
                setBookSearchStatus("Browse successful")
                setBookList(response.bookList)
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

    return (
        <>
            <main>
                <h2>Store/Browse Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br />
                    <Link to="/storepage">Store/Search Page</Link>
                    <br />
                </nav>

                {bookSearchStatusDOM()}

                <p>
                    <br></br>
                    Books:

                </p>
                {

                    bookList.map((item, index) => {
                        return (
                            <div className="card" key={index}>
                                <img className="card-image" src={item.img_url} alt="Lamp" />


                                <div className="container">

                                    <h4><b>{item.name}</b></h4>
                                    <p>
                                        Book Status: {item.book_status} <br />
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