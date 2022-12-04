const app = require("express").Router();
const { errorHandler } = require("~/services/app-core");
const date_fns = require("date-fns");

const Cluster = require("~/models/cluster");

app.get("/", async (req, res) => {
  try {
    const clusters = await Cluster.find();
    res.json({
      status: "OK",
      result: clusters,
    });
  } catch (error) {
    errorHandler.UnHandler(res, error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const cluster = await Cluster.findOne({ _id: req.params.id });
    res.json({
      status: "OK",
      result: cluster,
    });
  } catch (error) {
    errorHandler.UnHandler(res, error);
  }
});

app.patch("/:id/next", async (req, res) => {
  try {
    const cluster = await Cluster.findOne({ _id: req.params.id });
    cluster.week += 1;
    if (cluster.week == 31) {
      cluster.period += 1;
      cluster.week = 1;
    }
    cluster.start_date = date_fns.add(cluster.start_date, { weeks: 1 });
    cluster.end_date = date_fns.add(cluster.end_date, { weeks: 1 });
    cluster.data = nextWeek(cluster.data);

    await cluster.save();

    res.json({
      status: "OK",
      result: cluster,
    });
  } catch (error) {
    errorHandler.UnHandler(res, error);
  }
});

app.patch("/:id/prev", async (req, res) => {
  try {
    const cluster = await Cluster.findOne({ _id: req.params.id });
    cluster.week -= 1;
    if (cluster.week < 1) {
      cluster.period -= 1;
      cluster.week = 30;
    }
    cluster.start_date = date_fns.subWeeks(cluster.start_date, 1);
    cluster.end_date = date_fns.subWeeks(cluster.end_date, 1);
    cluster.data = previousWeek(cluster.data);

    await cluster.save();

    res.json({
      status: "OK",
      result: cluster,
    });
  } catch (error) {
    errorHandler.UnHandler(res, error);
  }
});

const nextWeek = (array) => {
  let lastElement = array[29];
  array.pop();
  const newArray = [];
  newArray.push(lastElement);
  for (const item of array) {
    newArray.push(item);
  }
  return newArray;
};

const previousWeek = (array) => {
  let firstElement = array[0];
  array.shift();
  const newArray = [];
  for (const item of array) {
    newArray.push(item);
  }
  newArray.push(firstElement);
  return newArray;
};

module.exports = app;
