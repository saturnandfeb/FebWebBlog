import express from "express";
const router = express.Router();

const posts = [];

router.get("/", (req , res) => {
    res.render("index.ejs", {posts});
});

router.get("/about", (req , res) => {
    res.render("about.ejs");
});




router.post("/posts", (req, res) => {
    const { title, content } = req.body;
    posts.push ({title, content});
    res.redirect("/")
});



module.exports = router;

