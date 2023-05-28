import React from 'react'

const NavBar = () => {
  return (
    <div className=' flex justify-between items-center'>
      <div className=' text-3xl font-bold shadow-2xl italic'>
        Celo Summer
      </div>
      <div className='flex '>
        <a href="#" className='pr-5 border-2 pl-5 pt-2 pb-2 rounded-full mr-4 hover:bg-blue-950/60 cursor-pointer'>Login</a>
        <a href="#" className='pr-5 border-2 pl-5 pt-2 pb-2 rounded-full mr-4 hover:bg-blue-950/60 cursor-pointer'>Sign In</a>
        <a href="#" className='pr-5 border-2 pl-5 pt-2 pb-2 rounded-full mr-4 hover:bg-blue-950/60 cursor-pointer'>Sign Up</a>
      </div>
    </div>
  )
}

export default NavBar
