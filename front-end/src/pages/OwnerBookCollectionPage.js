import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';
import { useSelector } from 'react-redux'


function OwnerBookCollectionPage() {
    const [ownerRetreiveStatus, setOwnerRetreiveStatus] = useState(false);
    const [ownerBookCollection, setOwnerBookCollection] = useState([])

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
                setOwnerRetreiveStatus("search result unsucessful: " + response.msg)
            }
        });
    }

    function ownerRetreiveStatusDOM() {
        if (ownerRetreiveStatus === "Getting owner book collection successful") {
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
                setOwnerRetreiveStatus("Getting owner book collection successful")
                var ownerBookCollection = JSON.parse(response.ownerBookCollection)

                setOwnerBookCollection(ownerBookCollection)
            }
            else {
                setOwnerRetreiveStatus("search result unsucessful: " + response.msg)
            }
        });

    }

    function addToOwnerBookCollection(event){
        if(event){
            event.preventDefault()
            }
    }
    return (
        <>
            <main>
                <h2>Owner Collection Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    {
                    (accountRedux.accountType === 'owner') ? 
                    (
                    <>
                    <br></br>
                    <Link to="/ownerBookCollectionPage">owner collection page</Link>
                    <br></br>
                    <Link to="/ownerPublisherPage">owner publisher page</Link>            
                    <br></br>
                    <Link to="/ownerDatapage">owner data page</Link>
                    </>
                    ) 
                    : <></>
                    }
                </nav>
                <p>
                    <br></br>
                    {ownerRetreiveStatusDOM()}
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
export default OwnerBookCollectionPage