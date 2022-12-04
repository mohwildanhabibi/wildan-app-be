const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI ?? null, {
  dbName: process.env.MONGO_DBNAME ?? null,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("DB is ready.", new Date());
});

module.exports = db;
