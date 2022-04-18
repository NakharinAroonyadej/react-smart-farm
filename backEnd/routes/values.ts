const express = require("express")
const app = express()
import { Request, Response } from "express"
const Device = require("../models/device")

app.get("/mock",async (_:Request, res:Response) => {
  let devices = await Device.find({})
  devices.forEach(async (device:any) => {
    const newVal = {
      timestamp: +new Date(),
      temp: getRandomFloat(25,40,1),
      airHumid: getRandomFloat(40,90,1),
      soilHumid: getRandomFloat(45,90,1),
    }
    device.values.push(newVal)
    await device.save()
  });
  return res.status(200).json({ code: 200, message: "generate new data.", data: devices })
})

app.get("/:id",async (req:Request, res:Response) => {
  const device = await Device.findOne({ id: req.params.id })
  device.values.sort((a:any,b:any) => a.timestamp - b.timestamp)
  return res.status(200).json({ code: 200, message: "generate new data.", data: device })
})

app.get("/:id/:amount",async (req:Request, res:Response) => {
  const device = await Device.findOne({ id: req.params.id })
  device.values.sort((a:any,b:any) => a.timestamp - b.timestamp)
  device.values = device.values.slice(-1-parseInt(req.params.amount),-1)
  return res.status(200).json({ code: 200, message: "generate new data.", data: device })
})

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
    timestamp: +new Date(),
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

function getRandomFloat(min:number, max:number, decimals:number) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

module.exports = app
