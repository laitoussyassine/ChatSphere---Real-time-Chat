import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
        <>
            <header className=" sm:flex sm:justify-around sm:items-center sm:py-5">
                <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                    <div>
                        <Link to={'/'} className='text-secondColor text-xl font-bold'><span className='text-mainColor'>ChatSphe</span>R</Link>
                    </div>
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="block text-textColor hover:text-mainColor focus:text-mainColor focus:outline-none"
                        >
                            <GiHamburgerMenu />
                        </button>
                    </div>
                </div>
                <nav className={`${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-4 sm:flex sm:p-0 text-textColor`}>
                    
                        <Link to={'/'} className="block px-2 py-1  font-semibold rounded hover:bg-gray-800 hover:text-mainColor">
                            App
                        </Link>
                        <Link className="block px-2 py-1 font-semibold rounded hover:bg-gray-800 hover:text-mainColor">
                            About
                        </Link>
                        <Link className="block px-2 py-1 font-semibold rounded hover:bg-gray-800 hover:text-mainColor">
                            Contact
                        </Link>
                    
                </nav>
            </header>
        </>
    )
}

export default Header