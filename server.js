import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';


const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));


const posts = [];

app.get("/", (req , res) => {
    res.render("index.ejs", {posts});
});

app.get("/about", (req , res) => {
    res.render("about.ejs");
});

app.get("/posts/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId]; // Assuming posts are stored in an array
    if (post) {
        res.render('edit', { post, id: postId }); // Pass the post and its ID to the edit view
    } else {
        res.status(404).send('Post not found');
    }
});

app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    posts.push ({title, content});
    res.redirect("/")
});

app.post("/posts/edit/:id", (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    if (posts[postId]) {
        posts[postId] = { title, content }; // Update the post in the array
        res.redirect('/'); // Redirect to the home page
    } else {
        res.status(404).send('Post not found');
    }
});


// Handle post deletion
app.post('/posts/delete/:id', (req, res) => {
    const postId = req.params.id; // Get the post ID from the URL
    if (posts[postId]) {
        posts.splice(postId, 1); // Remove the post from the array
        res.redirect('/'); // Redirect to the home page
    } else {
        res.status(404).send('Post not found'); // Handle the case where the post does not exist
    }
});





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });