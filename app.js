const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");

app.use(express.json());

app.use(userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server has connected");
    });
  })
  .catch((e) => {
    console.log("=====>>>>>");
    console.error(e);
  });
