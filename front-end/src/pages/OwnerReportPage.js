import { Link } from "react-router-dom";
import React, { useState } from 'react';
import serverInfo from '../Common/ServerInfo.js';
import './../allStyles.css';


function OwnerReportPage() {
    const [ownerReportStatus, setOwnerReportStatus] = useState("");

    let [reportType, setReportType] = useState("Total_Sales");
    let [startDate, setStartDate] = useState("2020-01-01");
    let [endDate, setEndDate] = useState(["2021-12-30"]);

    let [returnedReportInfo, setReturnedReportInfo] = useState([]);



    async function getReport(event) {
        event.preventDefault()
        let body = {
            /*
            "Total Sales"
            "Sales per Author"
            "Sales per Book"
            "Sales per Publisher" 
            */
            reportType: reportType,
            startDate: startDate,
            endDate: endDate
        }
        debugger;
        serverInfo.callServer("POST", "getReport", body, (response) => {
            if (response.type === "success") {
                setOwnerReportStatus("Get Report Successful")
                setReturnedReportInfo(response.returnedReportInfo)
            }
            else {
                setOwnerReportStatus("getReport unsucessful: " + response.msg)
            }
        });

    }
    function ownerReportStatusDOM() {
        if (ownerReportStatus === "Get Report Successful") {
            return (

                <p style={{ color: "green" }}>
                    {ownerReportStatus}
                </p>
            )
        }
        return (

            <p style={{ color: "red" }}>
                {ownerReportStatus}
            </p>
        )
    }
    /*
    "Total_Sales"
    "Sales_per_Author"
    "Sales_per_Book"
    "Sales_per_Publisher" 
    "Sales_per_Genre"
    */

    const reportTypesOptions = [
        {
            label: "Total_Sales",
            value: "Total_Sales",
        },
        {
            label: "Sales_per_Author",
            value: "Sales_per_Author",
        }, {
            label: "Sales_per_Book",
            value: "Sales_per_Book",
        }, {
            label: "Sales_per_Publisher",
            value: "Sales_per_Publisher",
        }, {
            label: "Sales_per_Genre",
            value: "Sales_per_Genre",
        },
    ];
    return (
        <>
            <main>
                <h2>Owner Report Page</h2>
                <nav>
                    <Link to="/">Home</Link>
                    {
          
                                <>
                                    <br></br>
                                    <Link to="/ownerBookCollectionPage">Owner Collection Page</Link>
                                    <br></br>
                                    <Link to="/ownerReportPage">Owner Report Page</Link>
                                </>
                        
                    }
                </nav>
                <form>
                    <h4>Report Parameters: </h4>

                    <select onChange={(e) => setReportType(e.target.value)}>
                        {reportTypesOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                    <label>Start date:</label>

                    <input type="date" id="start" name="report-start"
                        value={startDate} onChange={e => setStartDate(e.target.value)}
                        >
                    </input>

                    <label>End date:</label>

                    <input type="date" id="end" name="report-end"
                        value={endDate}  onChange={e => setEndDate(e.target.value)}
                        >
                    </input>
                    <br />
                    <button type="submit" onClick={getReport}>Get Report</button>
                </form>
                {ownerReportStatusDOM()}
                <h4>Report Generated: </h4>

                <p>
                    <br></br>
                    {returnedReportInfo}

                </p>


            </main>

        </>
    );
}
export default OwnerReportPage