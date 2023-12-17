const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please specify a receiver"],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please specify a sender"],
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = new mongoose.model("Messages", MessageSchema);

module.exports = Messages;
