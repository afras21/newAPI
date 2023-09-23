const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to news API");
});

require("./src/config/routes")(app);

app.listen(process.env.PORT, () => {
  console.log("App up and running...." + process.env.PORT);
});
