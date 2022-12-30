require("dotenv").config();
require("module-alias/register");
require("~/db/db");
const express = require("express");
const app = express();
const port = 3000;

// const auth = require("./controllers/authController");
const clusterController = require("./controllers/clusterController");

app.get("/", async (req, res, next) => {
  try {
    res.send("ALIVE!!!");
  } catch (error) {
    next(error);
  }
});

app.get("/my-ip", async (req, res, next) => {
  try {
    const ipAddress = req.socket.remoteAddress;
    res.send(ipAddress);
  } catch (error) {
    next(error);
  }
});

// app.use(express.json());
// app.use("/api/auth", auth);
app.use("/ngaji", clusterController);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
