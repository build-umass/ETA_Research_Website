import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

// set port variable (where server will listen from)
const PORT = process.env.PORT || 3001;

// using MongoDB express module
const app = express();

const umass_regex_match = new RegExp('^[A-Za-z0-9._%+-]+@umass\.edu$');

app.use(bodyParser.json());
app.use(cors({
  origin:"*"
}))

// Sets up behavior for when a client sends a GET request, res is the response we want to send
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.post("/api/isAuth", (req, res) => {
    const userEmail = req.body.userEmail;
    // TODO: Use database to store user credentials

    if (umass_regex_match.test(userEmail)){
      res.status(200).json({isAuth: true});
    }
    else{
      res.status(401).json({isAuth: false});
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});