const express = require('express');

const app = express();
const port = 9005;

let studData = [];

app.set("view engine", "ejs");
app.use(express.urlencoded());


app.get('/insert', (req, res) => {
    res.render("form");
})



app.listen(port, () => {
    console.log("Server is Start");
})