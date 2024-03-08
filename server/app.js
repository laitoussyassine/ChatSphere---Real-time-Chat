import express from "express";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
app.use(cors());
app.use(express.json());



const server = app.listen(4000, () => {
    console.log("server running 4000");
});

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
        credentials:false
    }
})

app.get('/api',(req,res) => {
    res.send('Hello')
})



io.on("connection", (socket) => {
    console.log("connected & socket ID is", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`${data.username} with id: ${socket.id} joined ${data} room`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on('disconnect', () => {
        console.log("user diconnected", socket.id);
    })
})