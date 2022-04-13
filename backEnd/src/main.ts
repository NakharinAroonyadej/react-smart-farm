import express from "express";
import mongoose from "mongoose";
import { nodeModel } from "./models/nodeModel";
import bodyParser from "body-parser";
var cors = require('cors');

const app = express();
const port = 5000;
const environment = "docker" // docker | localhost
const urlDB = environment == "docker" ? "mongodb-service.default.svc.cluster.local:27017" : "localhost:27017";
app.use(bodyParser.json())
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

console.log("urlDB :: ", urlDB);

mongoose.connect(`mongodb://username:password@${urlDB}`, { useNewUrlParser: true } as mongoose.ConnectOptions).catch(err => console.log(err.reason));
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
