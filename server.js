import express from "express";
import cors from "cors";
const bodyParser = require("body-parser");

require("dotenv").config();
require("./connectiondb");

import initRoutes from "./src/routes";

const app = express();
const port = process.env.PORT || 2001;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors({}));

initRoutes(app);
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
