const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
