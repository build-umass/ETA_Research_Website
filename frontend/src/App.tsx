import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response: { credential: string; }){
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
    client_id: "839962788219-jk1rq8rtjr724dpv0lumqskd7l1sp3a8.apps.googleusercontent.com",
    callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

  },[])

  return (
    <div className = "App">
      <div id= "signInDiv"></div>
      {user &&
        <div>
          <img src = {user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;

