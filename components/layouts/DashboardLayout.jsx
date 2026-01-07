import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BellIcon, BookIcon, CalendarDaysIcon, GraduationCapIcon, LayoutDashboardIcon, MessageCircleIcon, UserIcon } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  
  // Fix the navigate function - it should be a callback
  const handleNavigate = (link) => () => navigate(link);

  
const options = [
    { name: 'Dashboard', link: '/',}, 
    { name: 'Courses', link: '/courses',},
    { name: 'Shedule', link: '/schedule',},
    { name: 'Grades', link: '/grades',},
    { name: 'Notifications', link: '/notifications',},
  ];

  
  return (
    <div className='w-full h-full flex bg-slate-100'>
      {/* Sidebar */}
      <div className='max-sm:w-16 max-w-70 pt-16 h-full z-2 fixed justify-center top-0 left-0'>
        <div className='p-6 space-y-6 bg-indigo-100 border-r h-full border-blue-400'>
          {/* Profile Section */}
          <div className='max-sm:hidden w-40 h-40 bg-gray-50 border border-gray-400 rounded-full flex items-center justify-center mx-auto shadow-md'>
            <UserIcon className='h-20 w-20 text-gray-600' />
          </div>
          
          {/* Navigation Options */}
          <div className='space-y-4 max-sm:flex flex-col items-center'>
            {options.map((opt) => (
              <button
                key={opt.name}
                onClick={handleNavigate(opt.link)}
                className={`
                  w-full max-sm:w-10 max:h-6 text-left p-3 rounded-lg text-sm text-black flex max-sm:justify-center items-center
                  ${pathname === opt.link 
                    ? 'bg-blue-400 text-white' 
                    : 'hover:bg-indigo-600'
                  }
                  transition-colors duration-200
                `}
              >
                <div className='flex justify-center items-center gap-2'>
                  <div className=''>
                      {opt.name === 'Dashboard' && <LayoutDashboardIcon className='w-6 h-6' />}
                      {opt.name === 'Courses' && <BookIcon className='w-6 h-6' />}
                      {opt.name === 'Shedule' && <CalendarDaysIcon className='w-6 h-6' />}
                      {opt.name === 'Grades' && <GraduationCapIcon className='w-6 h-6' />}
                      {opt.name === 'Notifications' && <BellIcon className='w-6 h-6' />}
                  </div>
                  <span className='max-sm:hidden'>{opt.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 max-sm:ml-16 ml-52 h-[calc(100vh-4rem)] overflow-hidden bg-white/85'>
        <Outlet /> {/* This should NOT have overflow */}
      </div>
            
      {/* Floating Message Button */}
      <div onClick={handleNavigate('/ai-chat')} className='fixed z-20 bottom-5 right-3 h-16 w-16 bg-white rounded-full border border-green-400 shadow-xl flex items-center justify-center hover:shadow-xl transition-shadow cursor-pointer'>
        <MessageCircleIcon className='w-8 h-8 text-green-400' />
      </div>
    </div>
  )
}

export default DashboardLayout

