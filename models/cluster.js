const mongoose = require("mongoose");
const { Schema } = mongoose;

const clusterSchema = new Schema(
  {
    header: String,
    period: Number,
    week: Number,
    start_date: Date,
    end_date: Date,
    data: [String],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const Cluster = mongoose.model("cluster", clusterSchema);

module.exports = Cluster;
