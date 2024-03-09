import  { config }  from 'dotenv';
config()
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import Database from "./config/db.config.js";
import ChatMessage from "./models/messageModel.js";
const app = express();
app.use(cors());
app.use(express.json());



const server = app.listen(4000, () => {
    console.log("server running 4000");
});

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
})

// connect to db
const db = new Database(process.env.DATABASE_URI,process.env.DB_NAME);
db.connectionDb();

// Initialize a simple API endpoint for fetching chat history
app.get('/chatHistory', async (req,res) => {
    const messages = await ChatMessage.find();
    res.json(messages)
});


io.on("connection", (socket) => {
    console.log("connected & socket ID is", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${data.username} with id: ${socket.id} joined ${data.room} room`);
    });
    

    socket.on('send_message', (data) => {
        socket.to(data).emit("receive_message", data);
        const message = new ChatMessage({
            username: data.username,
            message: data.message
        });
        message.save();
    });
    

    socket.on('disconnect', () => {
        console.log("user diconnected", socket.id);
    })
})