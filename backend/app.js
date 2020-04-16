const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://mongouser:Ud15japoH7tr0ZVM@cluster0-znuv3.mongodb.net/mean-course?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongo");
  })
  .catch(() => {
    console.log("connection to mongo failed!!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "post added to MongoDB",
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "posts fetched to MongoDB",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    // console.log(result);
    res.status(200).json({
      message: req.params.id + "postId deleted from MongDB",
    });
  });
});

module.exports = app;
