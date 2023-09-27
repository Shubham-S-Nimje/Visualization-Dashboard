const express = require("express");
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const dataRoutes = require("./routes/data");
const mongoose = require("mongoose");

const { MONGODB_URL } = dotenv.parsed;

const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/fetch", dataRoutes);

mongoose
  .connect(
    `${MONGODB_URL}/Blackcoffer?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log("connected to mongoose");
    // console.log(result);
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
