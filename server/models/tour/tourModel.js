const { Schema, model } = require("mongoose");

const TourSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  flag: { type: Boolean, default: true },
  linkPhoto: { type: String },
});

module.exports = model("Tour", TourSchema);
