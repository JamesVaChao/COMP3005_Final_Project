import {Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function HomePage() {
  
  const account = state => state.account
  let accountRedux = useSelector(account);

    return (
      <>
        <main>
          <h2>Home Page</h2>
          <p>Welcome:  {accountRedux.firstName}</p>
          <p>Account Type: {accountRedux.accountType}</p>
        </main>
        <nav>
        <br/>
          <Link to="/registerpage">Register Account Page</Link>
          <br/>
          <Link to="/loginpage">Login Page</Link>
          <br/>
          <Link to="/storepage">Store/Search Page</Link>
          <br/>
          <Link to="/cartpage">Cart Page</Link>
          <br/>
          <Link to="/checkoutpage">Checkout Page</Link>          
          <br/>
          <Link to="/orderpage">Orders Page</Link>
  
          {
            (accountRedux.accountType === 'owner') ? 
            (
            <>
            <br></br>
            <Link to="/OwnerBookCollectionPage">Owner Book Collection Page</Link>
            <br></br>
            <Link to="/OwnerReportPage">Owner Report Page</Link>
            </>
            ) 
            : <></>
            
          
            }

        </nav>
      </>
    );
  }

export default HomePage