const express = require("express")
const app = express()
import { Request, Response } from "express"
const Device = require("../models/device")
import { uuid } from "uuidv4"

app.get("/", async (req: Request, res: Response) => {
  const devices = await Device.find({})
  res.status(200).json({ code: 200, message: "", data: devices })
})

app.get("/:id", async (req: Request, res: Response) => {
  const device = await Device.findOne({ id: req.params.id })
  if (!device)
    return res.status(404).json({ code: 404, message: "Device not found." })
  res.status(200).json(device)
})

app.post("/", async (req: Request, res: Response) => {
  const { name } = req.body
  if (!name)
    return res
      .status(401)
      .json({ code: 404, message: "All fields must be provided." })
  const relays: any[] = []
  for (let i = 0; i < 4; i++) {
    const relay = {
      id: uuid(),
      name: `รีเลย์ ${i + 1}`,
      active: true,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    }
    relays.push(relay)
  }
  const newDevice = {
    id: uuid(),
    name,
    relays,
    createdAt: +new Date(),
    updatedAt: +new Date(),
  }
  const device = await Device.create(newDevice)
  res.status(201).json({ code: 200, message: "Device created.", data: device })
})

app.patch("/:id", async (req: Request, res: Response) => {
  const device = await Device.findOne({ id: req.params.id })
  const { name } = req.body
  if (!name)
    return res
      .status(401)
      .json({ code: 404, message: "All fields must be provided." })
  if (!device)
    return res.status(404).json({ code: 404, message: "Device not found." })
  device.name = name
  await device.save()
  res.status(200).json({ code: 200, message: "Device upated.", data: device })
})

app.delete("/:id", async (req: Request, res: Response) => {
  const found = await Device.findOneAndDelete({ id: req.params.id })
  if (found) res.status(200).json({ code: 200, message: "Device removed." })
  else res.status(404).json({ code: 404, message: "Device not found." })
})

module.exports = app
