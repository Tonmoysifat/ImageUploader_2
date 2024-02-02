const express = require("express");
const path = require("path");
const router = require("./src/routes/api");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"src/images")));

// Routing Implement
app.use("/", router);

module.exports = app;
