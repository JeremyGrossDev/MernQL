const express = require("express");
require("dotenv").config();

const app = express();

app.get("/rest", function (req, res) {
  res.json({
    data: "Rest endpoint says hi!",
  });
});

app.listen(process.env.PORT, function () {
  console.log(`Server Port:  ${process.env.PORT}`);
});
