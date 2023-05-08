const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const http = require("http");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./docs/swagger")

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/", require("./routes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const port = process.env.PORT;

app.listen(port, () => {
  // console.log("Server listening on port: " + port);
  dbConnect();
});

module.exports = server;
