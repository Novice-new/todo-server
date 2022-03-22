const { Schema, model } = require("mongoose");
const UserSchema = Schema({
  username: { type: String, required: true },
  password: { type: String, min: 8, max: 18, required: true },
}, {
  versionKey: false
});
const User = model("User", UserSchema);
module.exports = User;
