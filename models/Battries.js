import mongoose from "mongoose";

const BatterySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  fullRange: { type: Number, required: true },
  current_miles: { type: Number, required: true },
  current_battery_health: { type: Number },
  lost_miles: { type: Number },
  lost_percentage: { type: Number },
});

const BatteryModel = mongoose.model("battery", BatterySchema);

export default BatteryModel;
