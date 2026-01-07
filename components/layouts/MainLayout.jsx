import React from 'react'
import { MessageCircleIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <div className='w-full h-full'>
      <Outlet />
      <div className='fixed z-20 bottom-5 right-3 w-20 bg-white h-20 rounded-full border border-green-400 shadow-lg flex items-center justify-center p-3'>
        <MessageCircleIcon className='w-full h-full text-green-400' />
      </div>
    </div>
  )
}

export default MainLayout
