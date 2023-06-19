const { Schema, model } = require("mongoose");

const TicketSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
  email: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardId: { type: String, required: true },
  paid: { type: Number, required: true },
  clock: { type: String, required: true },
  flight: { type: String, required: true },
  pathName: { type: String, required: true },
  customers: { type: Array, required: true },
  flag: { type: Boolean, required: true, default: true },
});




module.exports = model("Ticket", TicketSchema);

/*
const TicketSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardId: { type: String, required: true },
  paid: { type: Number, required: true },
  clock: { type: String, required: true },
  flight: { type: String, required: true },
  pathName: { type: String, required: true },
  customers: { type: Array, required: true },
  flag: { type: Boolean, required: true, default: true },
});

*/