// const { Schema, model } = require("mongoose");
// const UserSchema = new Schema({
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "USER" },
//   fio: { type: String, required: true },
// });

// module.exports = model("User", UserSchema);

const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: String, default: "USER" },
  nickName: { type: String, required: true },
});

module.exports = model("User", UserSchema);

/**
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: { type: String, default: "USER" },
  nickName: { type: String, required: true },
});
 */
