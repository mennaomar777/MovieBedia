import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo2.png"


export default function Footer() {
  return (
    <>

       <footer className="bg-gray-900 text-white py-6">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center min-h-30 w-[90%]">
        
        <div className="mb-4 md:mb-0 text-center md:text-left">
         <div className='flex gap-3 items-center justify-center md:justify-start'>
           <img src={logo} className="object-cover h-7" alt="movies Logo" />
           <h2 className="text-xl font-bold text-[#01b4e4]">MovieBedia</h2>
         </div>
          <p className="text-sm text-gray-400">Your favorite movies in one place.</p>
        </div>

        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Movie World. All rights reserved.
        </div>
        
      </div>
    </footer>
    </>
  )
}
