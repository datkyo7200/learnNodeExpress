const express = require("express");
const router = express.Router();

// Load model
const Post = require("../models/Post");

//Hien thi tat ca cac bai viet
router.get("/", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts });
});

// Hien thi form de tao bai viet moi
router.get("/add", (req, res) => {
  res.render("posts/add");
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  let errors = [];
  if (!title) errors.push({ messge: "Title required" });
  if (!content) errors.push({ content: "Title required" });
  if (errors.length > 0) {
    res.render("posts/add", { title, content });
  } else {
    const newPostData = { title, content };
    console.log(title, content);
    const newPost = new Post(newPostData);
    await newPost.save();
    console.log("Successfully");
    res.redirect("/posts");
  }
});

//Dua ra form de nguoi dung thay doi bai viet
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post });
});

//Cap nhat thay doi bai viet vao db
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  console.log(title);
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, content });
  console.log("Successfully");
  res.redirect("/posts");
});

// Xoa bai viet
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndRemove({ _id: req.params.id });
  res.redirect("/posts");
});

module.exports = router;
