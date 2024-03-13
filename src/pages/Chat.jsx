import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import chatRobot from '../images/robot.png'
import { MdOutlineSend } from "react-icons/md";
import { useWebSocket } from '../hooks/socketProvider';


const Chat = ({ pseudoname, room }) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const formatTime = (timestamp) => {
        const timeString = new Date(timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        return timeString;
    }

    const getMessages = async () => {
        try {
            const response = await fetch("http://localhost:4000/chatHistory");
            const data = await response.json();
            return setMessageList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleMessage = (e) => {
        setCurrentMessage(e.target.value)
    }

    const { socket } = useWebSocket()
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                username: pseudoname,
                room: room,
                message: currentMessage,
                createdAt:new Date()
            }
            await socket.emit("send_message", messageData)
            setCurrentMessage("")
        };
    }

    useEffect(() => {
        getMessages()
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [])

    return (
        <>
            <div className='flex flex-col items-center lg:my-20  max-w-96 m-auto'>
                <div className=' shadow-slate-600 shadow-md py-8 px-12 rounded-2xl'>
                    <p className='text-center text-textColor font-semibold'>{room} Room Chat</p>
                    <img src={chatRobot} className="w-24 mx-auto " alt="" />
                    <div className=''>
                        <div className='flex flex-col max-h-80 overflow-y-auto'>
                            {messageList.map((messageContent, index) => (

                                <div key={index} className={`${pseudoname === messageContent.username ? "self-start bg-textColor " : "self-end bg-mainColor"}
                            w-fit text-white font-medium rounded-md px-3 py-1 mb-2
                            `}>
                                    <span className={`${pseudoname === messageContent.username ? "text-secondColor" : "text-textColor"} font-normal `}>{pseudoname === messageContent.username ? "You" : messageContent.username}</span>
                                    <div className={``}>
                                        <p className='font-normal'>{messageContent.message}</p>
                                        <span>{formatTime(messageContent.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='border-2 px-2  border-textColor grid grid-cols-8 gap-4 items-center h-16'>
                            <input type="text" className='col-span-7 px-2  outline-none' value={currentMessage} onChange={handleMessage} />
                            <div className='col-span-1'>
                                <button className='flex justify-center items-center' onClick={sendMessage}>

                                    <MdOutlineSend className='text-mainColor text-xl ' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Chat