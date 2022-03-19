import mongoose from "mongoose";
// create an schema
var userSchema = new mongoose.Schema({
  name:String,
  age:Number,
});

export const userModel = mongoose.model("userModel", userSchema) 
