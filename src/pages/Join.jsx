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
        socket.emit("join_room", room)
        setNotShowChat(false)
      }
    }
  return (
    <> 
      {
        notShowChat ? (
          <div>
            <label htmlFor="">Enter Your Name</label>
            <input type="text" placeholder='John ...' onChange={handleUserName} />
            <button onClick={joinRoom}>Join A Room</button>
          </div>

        )
        

          : (

            <Chat socket={socket} username={username} room={room}/>
          )

      }
    </>
  )
}

export default Join