const express = require("express")
const app = express()
import { Request, Response } from "express"
const Device = require("../models/device")

app.patch("/:deviceId", async (req: Request, res: Response) => {
  const device = await Device.findOne({ id: req.params.deviceId })
  const { id, name, active } = req.body
  console.log(id, name, active)
  if (!device)
    return res.status(404).json({ code: 404, message: "Device not found." })
  const target = device.relays.find((relay: any) => relay.id === id)
  target.name = name ?? target.name
  target.active = active ?? target.active
  target.updatedAt = +new Date()
  await device.save()
  res.status(200).json({ code: 200, message: "Device upated.", data: device })
})

module.exports = app
