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
          <Link to="/devpage">devpage</Link>
          <br/>
          <Link to="/loginpage">loginpage</Link>
          <br/>
          <Link to="/storepage">storepage</Link>
          <br/>
          <Link to="/cartpage">cartpage</Link>
          <br/>
          <Link to="/checkoutpage">checkoutpage</Link>          
          <br/>
          <Link to="/orderpage">orderpage</Link>
          <br/>
          <Link to="/registerpage">registerpage</Link>
          
          {
            (accountRedux.accountType === 'owner') ? 
            (
            <>
            <br></br>
            <Link to="/OwnerBookCollectionPage">owner collection page</Link>
            <br></br>
            <Link to="/ownerPublisherPage">owner publisher page</Link>            
            <br></br>
            <Link to="/ownerDatapage">owner data page</Link>
            </>
            ) 
            : <></>
            
          
            }

        </nav>
      </>
    );
  }

export default HomePage