

import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const receiverId = req.params.id.trim(); // Trim to remove newline/space
        const senderId = req.user._id.toString().trim(); // Ensure ObjectId string

        // Validate receiverId
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid receiver ID" });
        }

        // Check if conversation exists between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If no conversation found, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create the message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        // Add message reference to conversation
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Send response
        res.status(201).json({
            message: "Message sent successfully",
            newMessage,
        });
    } catch (error) {
        console.log("Error in Sending message", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const chatuser = req.params.id.trim(); // Trim to remove newline/space
        const senderId = req.user._id.toString().trim(); // Ensure ObjectId string
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatuser] },
        }).populate("messages");
        if(!conversation){
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
         res.status(201).json(messages)
    } catch (error) {
        console.log("Message getting error" + error);
        res.status(500).json({ message: "Internal Server Error getting message" });
    }
}