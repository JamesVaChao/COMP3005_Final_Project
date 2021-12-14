import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import serverInfo from './../Common/ServerInfo.js';

function DevPage() {
    const [count, setCount] = useState(0);
    const [testData, setTestData] = useState("Nothing pulled yet");

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    async function testRequest() {
        try {
            console.log("calling server at : " + serverInfo.path + "/JamesTest")
            //let res = await fetch(serverInfo.path + "/JamesTest", {
            let res = await fetch(serverInfo.path + "/JamesTest", {
                //let res = await fetch(serverInfo.path + "/paulinaTest", {
                method: "POST",
                //mode: 'no-cors', // no-cors, *cors, same-origin, cors

                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: "James",
                    codeType: "Book",
                    code: "heres a code",
                }),
            });
            debugger;
            let response = await res.json();
            console.log(response)
            setTestData(response.name)

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <h2>Dev Page</h2>
                <p>
                    Dev stuff happens here:
                </p>
                <div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                    <p>Data pulled: {testData}</p>
                    <button onClick={() => testRequest()}>
                        Click me
                    </button>
                </div>


            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}
export default DevPage