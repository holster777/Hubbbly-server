const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
      type: String,
    },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    cards: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
    }
  }
);

const Project = model("Project", projectSchema);

module.exports = Project