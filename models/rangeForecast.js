import mongoose from "mongoose";

const RangeSchema = new mongoose.Schema({
  userId: { type: String },
  yhat: { type: Number },
  ds: { type: Date },
});

const RangeModel = mongoose.model("rangeforecast", RangeSchema);

export default RangeModel;
