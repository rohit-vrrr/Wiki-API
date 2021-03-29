const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// creating DB
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

// creating Schema
const articleSchema = new mongoose.Schema ({
  title: String,
  content: String
});

// creating Model
const Article = mongoose.model("Article", articleSchema);

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});