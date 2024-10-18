const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  messages: [
    {
      sender: {
        type: String, // Indicates who sent the message (user or agent)
        required: true,
      },
      message: {
        type: String, // The actual message text
        required: true,
      },
    },
  ],
  requested: {
    type: String,//which agent is requested
    required: false,
    default: "",
  },
  resolved: {
    type: Boolean,//whether query has beeen resolved or not
    required: false,
    default: false
  },
});

module.exports = mongoose.model("Query", querySchema);
