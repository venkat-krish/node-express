const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.port || 3000;

const db = mongoose.connect("mongodb://localhost/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Book = require("./models/bookModel");
// Routers
const bookRouter = express.Router();

bookRouter.route("/books").get((req, res) => {
  const query = {};

  if (req.query.genre) {
    query.genre = req.query.genre;
  }

  Book.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
});

bookRouter.route("/books/:bookId").get((req, res) => {
  Book.findById(req.params.bookId, (err, books) => {
    if (err) {
      return res.send(err);
    }

    return res.json(books);
  });
});

// Wiring up the router in app
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API");
});

app.listen(port, () => {
  console.log(`Running on the port ${port}`);
});
