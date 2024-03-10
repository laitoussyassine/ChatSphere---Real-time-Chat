import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect('http://localhost:4000')
const Join = () => {
    const [username, setUsername] = useState("");
    const [notShowChat, setNotShowChat] = useState(true)

    const handleUserName = (e) => {
      setUsername(e.target.value)
    } 
  
    const room = "javascript";

    const joinRoom = () => {
      if (username !== "") {
        socket.emit("join_room", {username,room})
        setNotShowChat(false)
      }
    }
  return (
    <> 
      {
        notShowChat ? (
          <>
            <div className='flex flex-col items-center lg:my-20 mt-6'>
              <div className='bg-slate-50 shadow-slate-600 shadow-md py-10 px-12 rounded-2xl'>
                <p className='mb-2 text-textColor font-medium'>Enter Your Name</p>
                <input className='px-6 py-1 outline-none border-2	 border-textColor' type="text" placeholder='John ...' value={username} onChange={handleUserName}  />
                <div className=''>
                  <button className='bg-gradient-to-r text-white font-medium from-orange-600 via-orange-500 to-orange-400 
            hover:bg-gradient-to-bl
            cursor-pointer
            mt-3 w-2/3 rounded-full px-7 py-2' onClick={joinRoom}>Join A Room</button> 
                </div>
              </div>

            </div>

       
          </>

        )
        

          : (
              ""
            )
            
          }
          <Chat socket={socket} username={username} room={room}/>
    </>
  )
}

export default Join