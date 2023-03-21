import express from 'express'

// set port variable (where server will listen from)
const PORT = process.env.PORT || 3001;

// using MongoDB express module
const app = express();

// Sets up behavior for when a client sends a GET request, res is the response we want to send
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});