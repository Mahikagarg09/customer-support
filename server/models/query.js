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
  message: {//message or query by user
    type: String,
    required: true,
  },
  requested: {//the agent for this query
    type: String,
    required: false,
    default: "",
  },
  resolved: {//the message where agent resolves query
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Query", querySchema);