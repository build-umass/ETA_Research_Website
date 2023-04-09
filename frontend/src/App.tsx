import './App.css';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

function handleCallbackResponse(response){
  console.log("Encoded JWT ID Token: " + response.credential);
  var userObject = jwt_decode(response.credential);
  console.log(userObject);
}



function App() {
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
    </div>
  );
}

export default App;

