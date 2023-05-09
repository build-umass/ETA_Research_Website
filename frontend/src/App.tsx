import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

interface RequestIsAuth {
  userEmail: string;
}

function App() {
  const [ user, setUser ] = useState({});
  const [ isAuth, setIsAuth ] = useState(null);

  function handleCallbackResponse(response: { credential: string; }){
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    let authRequest: RequestIsAuth = { userEmail: userObject.email };
    console.log(userObject);
    console.log(authRequest);
    fetch("http://localhost:3001/api/isAuth", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: userObject.email
      })
  }).then((response) => {
    if (response.status == 200) {
      console.log("User is authenticated");
      setIsAuth(true);
      setUser(userObject);
    } else {
      console.log("User is not authenticated");
      setIsAuth(false);
    }}).catch((error) => {
      console.log("Error: " + error);
    });

    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    setIsAuth(null);
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
    client_id: "839962788219-jk1rq8rtjr724dpv0lumqskd7l1sp3a8.apps.googleusercontent.com",
    callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline", 
        size: "small",
        type: "icon",
        shape: "square",
        width: 400

      }
    );

  },[])

  return (
    <div className = "App">
      <div id= "signInDiv"></div>
      {isAuth != null &&
        <button style={{marginBottom: 10 + 'px'}} onClick= {(e) => handleSignOut(e)}>Sign Out</button>
      }
      {isAuth == false && <p>Unauthorized</p>}
      {user && isAuth == true &&

        <div>
          <h6>{user.name}</h6>
        </div>

      }
    </div>
  );
}

export default App;

