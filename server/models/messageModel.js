import mongoose from "mongoose";
const ChatSchema = mongoose.Schema({

        username: String,
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
});
const messageModel = mongoose.model("ChatMessage", ChatSchema);
export default messageModel;