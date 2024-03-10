import React from 'react'
import { Link } from 'react-router-dom'
import ChatImage from "../images/Messages-cuate.svg"
import { FaArrowRight } from "react-icons/fa6";


const Home = () => {
  return (
    <>
      <div className='grid grid-cols-4 my-14 lg:mx-60 mx-5'>
        <div className='lg:col-span-2 col-span-full mt-10'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-4xl'>Let's Connect In Real Time</h1>
            <p className='text-textColor font-medium pr-28'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, reiciendis!</p>
            <div className='mt-3'>
              <Link className='bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 
            hover:bg-gradient-to-bl
            cursor-pointer
            my-4 w-3/4 rounded-full px-7 py-3' to={"/join"}>Join Chat <FaArrowRight className='inline'/></Link>
              
            </div>
          </div>
        </div>
        <div className='left-side lg:col-span-2 col-span-full'>
          <img src={ChatImage} alt="" />
        </div>
      </div>

    </>
  )
}

export default Home