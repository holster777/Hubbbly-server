const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
        type: String,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Projects' }]
}
);

const Client = model("Client", clientSchema);

module.exports = Client;
