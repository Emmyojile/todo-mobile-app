const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://emmyojile:emmy%401599@cluster0.baodx4z.mongodb.net/todo-app?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.log("Error connecting to MongoDB");
})

app.listen(port, () => {
    console.log("Server running on port " + port);
});