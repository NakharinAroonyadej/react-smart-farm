import mongoose from "mongoose"
const { Schema } = mongoose

const deviceSchema = new Schema({
  id: String,
  name: String,
  values: {
    type: [
      {
        id: String,
        temp: Number,
        airHumid: Number,
        soilHumid: Number,
      },
    ],
    required: false,
    default: [],
  },
  relays: {
    type: [
      {
        id: String,
        name: String,
        active: Boolean,
        createdAt: Number,
        updatedAt: Number,
      },
    ],
    required: false,
    default: [],
  },
  createdAt: Number,
  updatedAt: Number,
})

const DeviceModel = mongoose.model("Device", deviceSchema)

module.exports = DeviceModel
