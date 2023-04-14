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
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
    client_id: "839962788219-jk1rq8rtjr724dpv0lumqskd7l1sp3a8.apps.googleusercontent.com",
    callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "small"}
    );

  },[])

  return (
    <div className = "App">
      <div id= "signInDiv"></div>
      {Object.keys(user).length != 0 &&
        <button style={{marginBottom: 10 + 'px' }} onClick= {(e) => handleSignOut(e)}>Sign Out</button>
      }
      {user &&
        <div>
          <img src = {user.picture} referrerPolicy="no-referrer"></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;

