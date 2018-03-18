const express = require("express");
const router = express.Router();
//Article Model
const Article = require("../models/article");
//User Model
const User = require("../models/user");

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("add_article", {
    title: "Add Articles"
  });
});

//Add submit Post Route
router.post("/add", (req, res) => {
  req.checkBody("title", "Title is required").notEmpty();
  //req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody("body", "Body is required").notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render("add_article", {
      title: "Add Article",
      errors: errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save(function(err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash("success", "Article Added");
        res.redirect("/");
      }
    });
  }
});

//GET request to the edit page
router.get("/edit/:id", ensureAuthenticated, function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (article.author != req.user._id) {
      req.flash("danger", "Not Authorized");
      res.redirect("/");
    }
    res.render("edit_article", {
      title: "Edit Article",
      article: article
    });
  });
});

//POST The Edited Data
router.post("/edit/:id", (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id };

  Article.update(query, article, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash("info", "Article Updated");
      res.redirect("/");
    }
  });
});

router.delete("/:id", function(req, res) {
  if (!req.user._id) {
    res.status(500).send();
  }
  let query = { _id: req.params.id };

  Article.findById(req.params.id, function(err, article) {
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query, function(err) {
        if (err) {
          console.log(err);
        }
        res.send("Success");
      });
    }
  });
});

router.get("/:id", function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    User.findById(article.author, function(err, user) {
      res.render("article", {
        article: article,
        author: user.name
      });
    });
  });
});

//Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

module.exports = router;
