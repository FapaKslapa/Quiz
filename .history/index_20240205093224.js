const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));



const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});

app.get("/question", (req, res) => {
  
}) 
