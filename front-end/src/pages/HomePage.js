import {Link } from "react-router-dom";

function HomePage() {
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/devpage">devpage</Link>
          <br/>
          <Link to="/loginpage">loginpage</Link>
          <br/>
          <Link to="/storepage">storepage</Link>
        </nav>
      </>
    );
  }

export default HomePage