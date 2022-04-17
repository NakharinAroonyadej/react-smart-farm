const express = require("express")
const app = express()
import { Request, Response } from "express"
const Device = require("../models/device")
import { uuid } from "uuidv4"

app.post("/:id", async (req: Request, res: Response) => {
  const { temp, airHumid, soilHumid } = req.body
  if (!(temp && airHumid && soilHumid)) {
    return res
      .status(401)
      .json({ code: 404, message: "All fields must be provided." })
  }
  const device = await Device.findOne({ id: req.params.id })
  if (!device)
    return res.status(404).json({ code: 404, message: "Device not found." })
  const newVal = {
    id: uuid(),
    temp,
    airHumid,
    soilHumid,
  }
  device.values.push(newVal)
  await device.save()
  res.status(201).json({ code: 200, message: "Device created.", data: device })
})

app.patch("/:id", async (req: Request, res: Response) => {
  const device = await Device.findOne({ relays_id: req.params.id })
  const { name, active } = req.body
  if (!name)
    return res
      .status(401)
      .json({ code: 404, message: "All fields must be provided." })
  if (!device)
    return res.status(404).json({ code: 404, message: "Device not found." })
  const target = device.relays.find((relay: any) => relay.id === req.params.id)
  target.name = name ?? target.name
  target.active = active ?? target.active
  target.updatedAt = +new Date()
  await device.save()
  res.status(200).json({ code: 200, message: "Device upated.", data: device })
})

module.exports = app
