const express = require("express");
const app = express();
const path = require("path");

const PORT = 9000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const routes = [ 
  "adminpanel-1",
  "adminpanel-2",
  "adminpanel-3",
  "adminpanel-4",
  "adminpanel-5",
];

routes.forEach((route) => {
  app.get(`/${route}.html`, (req, res) => {
    res.render(route, { title: route.replace("-", " ").toUpperCase() });
  });
});

// Define the root route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running.....!");
});
