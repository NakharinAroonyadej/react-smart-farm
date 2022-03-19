import mongoose from "mongoose";
// create an schema
var nodeSchema = new mongoose.Schema({
  timestamp: Date,
  temp: Number,
  airHumid: Number,
  earthHumid: Number,
});

export const nodeModel = mongoose.model("nodeDataModel", nodeSchema, "node-data");
