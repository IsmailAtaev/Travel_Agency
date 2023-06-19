const { Schema, model } = require("mongoose");

const CardValidationId = new Schema({
  validateCard: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = model("CardValidation", CardValidationId);
