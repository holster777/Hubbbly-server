const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    clients:
      [{ type: Schema.Types.ObjectId, ref: 'Client' }]
  }
);

const User = model("User", userSchema);

module.exports = User;
