import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector } from 'react-redux'


function OwnerBookCollectionPage() {
    const [ownerRetreiveStatus, setOwnerRetreiveStatus] = useState(false);
    const [ownerBookCollection, setOwnerBookCollection] = useState([])

    const [bookId, setBookId] = useState("")
    const [bookName, setBookName] = useState("")
    const [bookAuthor, setBookAuthor] = useState("")
    const [bookGenres, setBookGenres] = useState("")
    const [bookPrice, setBookPrice] = useState("")
    const [bookPublisher, setBookPublisher] = useState("")
    const [bookNumberOfPages, setBookNumberOfPages] = useState("")

    const [salesPercentToPublisher, setSalesPercentToPublisher] = useState("")
    const [bookImgUrl, setBookImgUrl] = useState("")
    const [restockThreshold, setRestockThreshold] = useState("")
    const [quantityStocked, setQuantityStocked] = useState("")


    //Redux
    const account = state => state.account
    let accountRedux = useSelector(account);

    if (!ownerRetreiveStatus) {
        getOwnerBookCollection()
        setOwnerRetreiveStatus(true)
    }


    async function getOwnerBookCollection(event) {
        if(event){
        event.preventDefault()
        }
        let body = {

            "username": accountRedux.username,
        }
        serverInfo.callServer("POST", "getOwnerBookCollection", body, (response) => {
            if (response.type === "success") {
                setOwnerRetreiveStatus("Getting owner book collection successful")
                var ownerBookCollection = JSON.parse(response.ownerBookCollection)
                setOwnerBookCollection(ownerBookCollection)
            }
            else {
                setOwnerRetreiveStatus("getOwnerBookCollection result unsucessful: " + response.msg)
            }
        });
    }

    function ownerRetreiveStatusDOM() {
        if (ownerRetreiveStatus === "Getting owner book collection successful" || "Add book successful" || "Remove book successful") {
            return (

                <p style={{ color: "green" }}>
                    {ownerRetreiveStatus}
                </p>
            )
        }
        return (

            <p style={{ color: "red" }}>
                {ownerRetreiveStatus}
            </p>
        )
    }
    function removeFromOwnerBookCollection(event, bookToDelete) {
        if(event){
        event.preventDefault()
        }
        //let newOwnerBookCollection = ownerBookCollection.filter(book => book !== bookToDelete)
        //setOwnerBookCollection(newOwnerBookCollection);

        let body = {
            "username": accountRedux.username,
            "bookID" : bookToDelete.book_id
        }
        
        serverInfo.callServer("POST", "removeFromOwnerBookCollection", body, (response) => {
            if (response.type === "success") {
                setOwnerRetreiveStatus("Remove book successful")
                var ownerBookCollection = JSON.parse(response.ownerBookCollection)

                setOwnerBookCollection(ownerBookCollection)
            }
            else {
                setOwnerRetreiveStatus("Remove book result unsucessful: " + response.msg)
            }
        });

    }
    function quickAutoFill(event){
        if(event){
            event.preventDefault()
        }
        setBookId("99999")
        setBookName("The Two Towers")
        setBookAuthor("J. R. R. Tolkien")
        setBookGenres(["Fantasy", "Fiction"])
        setBookPrice(25.99)
        setBookPublisher("Minas Publishing")
        setBookNumberOfPages(352)
        setSalesPercentToPublisher(.30)
        setBookImgUrl("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRdpfi2iwBK300YRgUwK7cnHGgb0-hUvcIy5zd1OZtnfJjFV7IE")
        setRestockThreshold(12)
        setQuantityStocked(15)
    }

    function addToOwnerBookCollection(event){
        if(event){
            event.preventDefault()
            }

            let body = {

                "username": accountRedux.username,
                "book" : {
                    book_id : bookId,
                    name : bookName,
                    book_status : "AVAILABLE",
                    author: bookAuthor,
                    genre: bookGenres,
                    publisher : bookPublisher,
                    number_of_pages : bookNumberOfPages,
                    price : bookPrice,
                    sales_percent_to_publisher : salesPercentToPublisher,
                    img_url : bookImgUrl,
                    restock_threshold: restockThreshold,
                    quantity_stocked : quantityStocked
                    
                }
            }
        serverInfo.callServer("POST", "addToOwnerBookCollection", body, (response) => {
            if (response.type === "success") {
                setOwnerRetreiveStatus("Add book successful")
                var ownerBookCollection = JSON.parse(response.ownerBookCollection)

                setOwnerBookCollection(ownerBookCollection)
            }
            else {
                setOwnerRetreiveStatus("Add book result unsucessful: " + response.msg)
            }
        });

    }


    return (
        <>
            <main>
                <h2>Owner Collection Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    <br></br>

                    <Link to="/ownerBookCollectionPage">Owner Collection Page</Link>
                    <br></br>
                    <Link to="/ownerReportPage">Owner Report Page</Link>
                    
                </nav>
                
                <form>
                <h4>Book to Add Info: </h4>

                    <label>
                        <input
                            name="bookId"
                            type="text"
                            value={bookId}
                            placeholder="ISBN"
                            onChange={e => setBookId(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="bookName"
                            type="text"
                            value={bookName}
                            placeholder="Book Name"
                            onChange={e => setBookName(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            name="bookAuthor"
                            type="text"
                            value={bookAuthor}
                            placeholder="Book Author"
                            onChange={e => setBookAuthor(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={bookGenres}
                            placeholder="Genre(s) seperate by commas"
                            onChange={e => setBookGenres(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={bookPrice}
                            placeholder="Book Price"
                            onChange={e => setBookPrice(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={bookPublisher}
                            placeholder="Publisher"
                            onChange={e => setBookPublisher(e.target.value)}
                        />
                    </label>                    <label>
                        <input
                            type="text"
                            value={bookNumberOfPages}
                            placeholder="Number Of Pages"
                            onChange={e => setBookNumberOfPages(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={salesPercentToPublisher}
                            placeholder="Sale percent to publisher"
                            onChange={e => setSalesPercentToPublisher(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={bookImgUrl}
                            placeholder="Book Image Url"
                            onChange={e => setBookImgUrl(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={restockThreshold}
                            placeholder="Restock Threshold"
                            onChange={e => setRestockThreshold(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            value={quantityStocked}
                            placeholder="Quantity Stocked"
                            onChange={e => setQuantityStocked(e.target.value)}
                        />
                    </label>
                  
                    <br />
                    <label>

                        <button type="submit" onClick={addToOwnerBookCollection}>Add book {(bookName !== "") ? "\"" + bookName.toString() + "\"": "" }</button>
                        <button onClick={quickAutoFill}>Autofill for testing/demo</button>

                    </label>

                </form>

                {ownerRetreiveStatusDOM()}

                <p>
                    Owner Book Collection:
                </p>
                {

ownerBookCollection.map((item, index) => {
    return (
        <div className="card" key={index}>
            <img className="card-image" src={item.img_url} alt="Lamp" />


            <div className="container">
                <button className="deleteFromCartButton" onClick={(e) => removeFromOwnerBookCollection(e, item)}> Delete From Collection</button>

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
export default OwnerBookCollectionPage