const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
var cookies = require("cookie-parser");
app.use(cookies());
const bodyParser = require("body-parser");


app.use(
  session({
    // key: "user_sid",
    secret: "hkgdrdruhuo",
    resave: true,
    saveUninitialized: false,
  })
);

require("dotenv").config();

app.use(cors({ origin: process.env.origin }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
const uri = process.env.db_url;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected ");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed");
  });

// app.get("/", (req, res) => {
//   res.send("Working");
// });

app.use("/api", require("./API/api"));

const port = process.env.PORT || 2311;

server.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});