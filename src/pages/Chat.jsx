import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import chatRobot from '../images/robot.png'
import { MdOutlineSend } from "react-icons/md";
import { useWebSocket } from '../hooks/socketProvider';


const Chat = ({pseudoname,room}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
   

    const getMessages = async () => {
        try {
            const response = await fetch("http://localhost:4000/chatHistory");
            const data = await response.json();
            console.log(data);
            return setMessageList(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleMessage= (e) => {
        setCurrentMessage(e.target.value)
    }
const {socket}= useWebSocket()
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                username: pseudoname,
                room:room,
                message: currentMessage,
            }
            await socket.emit("send_message", messageData)
            setMessageList((list)=> [...list, messageData])
            setCurrentMessage("")
        };
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list)=> [...list, data])
            getMessages()
        })
      
    }, [socket])

  return (
    <>
        <div className='flex flex-col items-center lg:my-20  '>
            <div className=' shadow-slate-600 shadow-md py-8 px-12 rounded-2xl'>
                <p className='text-center text-textColor font-semibold'>{room} Room Chat</p>
                <img src={chatRobot} className="w-24 mx-auto " alt="" />
                <div className=''>
                    <div className='flex flex-col max-h-80 overflow-y-auto'>
                        {messageList.map((messageContent, index) => (
                            <div key={index} className={`${pseudoname === messageContent.username ? "self-start bg-textColor " : "self-end bg-mainColor"}
                            w-fit text-white font-medium rounded-md px-3 py-1 mb-2
                            `}>
                                <div className={`  `}>
                                    <p>{messageContent.message}</p>
                                    <span>{messageContent.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='border-2 border-textColor'>
                        <input type="text" className='px-6 py-1 outline-none' value={currentMessage} onChange={handleMessage}/>
                        <button className=' px-6 py-1' onClick={sendMessage}><MdOutlineSend className='text-mainColor text-xl mt-2' /></button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
export default Chat