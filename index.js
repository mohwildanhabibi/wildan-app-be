require("dotenv").config();
require("module-alias/register");
require("./db/db");
const express = require("express");
const app = express();
const port = 9001;

// const auth = require("./controllers/authController");
const clusterController = require("./controllers/clusterController");

// app.use(express.json());
// app.use("/api/auth", auth);
app.use("/ngaji", clusterController);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
