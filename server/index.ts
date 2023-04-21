import express from 'express'
import logger from 'morgan';
import mongoose from 'mongoose';

// set port variable (where server will listen from)
const PORT = process.env.PORT || 3001;

// using MongoDB express module
const app = express();

app.use(logger('dev'))

// Sets up behavior for when a client sends a GET request, res is the response we want to send
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/eta');
  console.log('Connected to MongoDB');
}

mongoose.set('debug', true);
connect().catch(err => console.log(err));