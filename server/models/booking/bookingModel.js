const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tour: { type: Schema.Types.ObjectId, ref: "Tour" },
  pay: { type: Number, required: true },
  needToPay: { type: Number, required: true },
  price: { type: Number, required: true },
  customers: { type: Array, required: true },
});

module.exports = model("Booking", BookingSchema);
// customers: { type: Array, required: true },
