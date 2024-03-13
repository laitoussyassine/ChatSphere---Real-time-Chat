import { useState } from 'react'
import { useWebSocket } from '../hooks/socketProvider'
import Chat from './Chat'

const Join = () => {
  const {socket}= useWebSocket()
    const [pseudoname, setPseudoname] = useState("");
    const [notShowChat, setNotShowChat] = useState(true)

    const handlePseudoname = (e) => {
      setPseudoname(e.target.value)
    } 
  
    const room = "javascript";

    const joinRoom = () => {
      if (pseudoname !== "") {
        socket.emit("join_room", {pseudoname,room})
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
                <input className='px-6 py-1 outline-none border-2	 border-textColor' type="text" placeholder='John ...' value={pseudoname} onChange={handlePseudoname}  />
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
              <Chat  pseudoname={pseudoname} room={room}/>
            )
            
          }
    </>
  )
}

export default Join