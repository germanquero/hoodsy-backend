const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server listening on port: " + port);
  dbConnect();
});
