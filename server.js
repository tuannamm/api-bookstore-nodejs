const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./src/routes/index");
const user = require("./src/routes/user");

require("./connectiondb");

const app = express();
const port = process.env.PORT || 2001;

app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/user", user);

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
