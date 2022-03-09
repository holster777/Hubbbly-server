const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
  {
    cardType: {
        type: String,
        enum: ['moodboard', 'font', 'colorPalette', 'image']
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
    },
    colors: {
        type: Array,
    },
    colorName: {
        type: Array,
    },
    colorNotes: {
        type: Array,
    },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;