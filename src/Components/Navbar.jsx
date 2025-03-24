import React from 'react'

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-slate-800 text-white py-3 fixed w-full top-0">
            <div className="logo">
                <span className='font-bold text-2xl mx-10'>My-task</span>
            </div>
            <ul className="flex gap-8 mx-10">
            <li className='cursor-pointer font-semibold hover:font-bold hover:transition-all'>Home</li>
                <li className='cursor-pointer font-semibold hover:font-bold hover:transition-all'>Your Tasks</li>
              
            </ul>
        </nav>
    )
}

export default Navbar
