const mongoose = require("mongoose");
const ConversationScheema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationScheema);
module.exports = Conversation;
