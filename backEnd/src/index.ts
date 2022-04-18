const express = require("express")
const mongoose = require("mongoose")
import { Request, Response, NextFunction } from "express"
import cors from "cors";
const app = express()
require("dotenv").config()
const devices = require("../routes/devices")
const relays = require("../routes/relays")
const values = require("../routes/values")
app.use(express.json()) 
const PORT = process.env.PORT || 8080
const mongoOptions = {
  useNewUrlParser: true,
}
mongoose
  .connect(process.env.MONGODB_URI, mongoOptions)
  .then(() => console.log("MongoDB connected..."))
  .catch(console.log)

app.use(cors())
app.options('*',cors())
app.use(function (_: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})
app.use("/devices", devices)
app.use("/relays", relays)
app.use("/values", values)
app.get("/", (_: Request, res: Response) => res.status(200).send("Hello fuck you"))

app.listen(PORT, () => console.log(`The server is listening on ${PORT}`))

export {}
