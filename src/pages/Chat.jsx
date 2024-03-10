import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Chat = ({ socket,username,room}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([])

    const handleMessage= (e) => {
        setCurrentMessage(e.target.value)
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                username,
                room,
                message: currentMessage,
            }
            await socket.emit("send_message", messageData)
            setMessageList((list)=> [...list, messageData])
            console.log(message);
            setCurrentMessage("")
        };
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list)=> [...list, data])
            console.log(data);
        })

      
    }, [socket])

  return (
    <>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            {messageList.map((messageContent, index) => (
                <p key={index}>{messageContent.message}</p>
            ))}
        </div>
        <div className='chat-footer'>
            <input type="text" className='bg-slate-200' onChange={handleMessage}/>
            <button className='bg-slate-500' onClick={sendMessage}>send</button>
        </div>
    </>
  )
}
export default Chat