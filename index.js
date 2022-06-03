var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const checkApi = require("./server/check");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(checkApi);

app.listen(8080, function () {
  console.log("Node.js STARTER is listening on port 8080!");
});
