const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  createdOn: { type: Date, default: Date.now },
  text: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
