import express from 'express'
const app = express();
const PORT = 3000;

let comments = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", { comments });
});

app.post("/comment", (req, res) => {
  const comment = req.body.comment;
  comments.push(comment); // No sanitization = Stored XSS possible!
  res.redirect("/");
});

app.get("/reset", (req, res) => {
  comments = []; // clear all comments
  res.send("Lab has been reset.");
});

app.listen(PORT, () => {
  console.log(`🚀 Lab running at http://localhost:${PORT}`);
});
