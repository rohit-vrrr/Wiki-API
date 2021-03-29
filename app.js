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

// getting all the articles
app.get('/articles', function(req, res) {
  Article.find(function(err, result) {
    if(!err) {
      res.send(result);
    } else {
      res.send(err);
    }
  });
});

// posting new articles thru postman
app.post('/articles', function(req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function(err) {
    if(!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

// delete all articles
app.delete('/articles', function(req, res) {
  Article.deleteMany(function(err) {
    if(!err) {
      res.send("Successfully deleted all the articles.");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
