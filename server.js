const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(_dirname + "/dist"));

app.listen(process.env.PORT || 8080);

//PathLocationStrategy
app.get("/*", function(req, res) {
  res.sendFile(path.join(_math - hoops + "/dist/index.html"));
});

console.log("Console listening!");
