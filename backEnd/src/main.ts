import express from "express";
import mongoose from "mongoose";
import { nodeModel } from "./models/nodeModel";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
const urlDB = "localhost:27017";
app.use(bodyParser.json())

console.log("urlDB :: ", urlDB);

mongoose.connect(`mongodb://username:password@${urlDB}`, { useNewUrlParser: true } as mongoose.ConnectOptions);
const conn = mongoose.connection;
conn.on("connected", function () {
  console.log("[database] database connect on port 27017");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

app.get("/", (_, res) => res.send("Hello Express Node.js"));
app.get("/all", (_, res) => {
  nodeModel.find({}, function (err: any, user: any) {
    if (err) return res.send(err);
    res.send(user);
    // 'athletes' contains the list of athletes that match the criteria.
  });
});

app.post("/create", (req, res) => {
  const nodeData = new nodeModel({
    timestamp: new Date(),
    temp: req.body.temp,
    airHumid: req.body.airHumid,
    earthHumid: req.body.earthHumid,
  });

  nodeData.save((err: Error) => {
    if (!err) res.send("insert complete");
    else res.send("Error during record insertion : " + err);
  });
});

app.listen(port, () => {
  console.log(
    `[server] server listen on port ${port} at http://localhost:${port} ⚡`
  );
});

export { conn, app };
