const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 3000;

const db = mongoose.connect("mongodb://localhost/bookAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Book = require("./models/bookModel");

const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Wiring up the router in app
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API");
});

app.listen(port, () => {
  console.log(`Running on the port ${port}`);
});
