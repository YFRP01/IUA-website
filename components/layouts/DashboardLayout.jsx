import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { BellIcon, BookIcon, CalendarDaysIcon, GraduationCapIcon, LayoutDashboardIcon, MessageCircleIcon } from "lucide-react"
import { profile } from '../../src/assets/assets'

const DashboardLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuth()
  
  const handleNavigate = (link) => () => navigate(link)

  const options = [
    { name: 'Dashboard', link: '/dashboard', icon: <LayoutDashboardIcon className='w-5 h-5' /> },
    { name: 'Courses', link: '/dashboard/courses', icon: <BookIcon className='w-5 h-5' /> },
    { name: 'Schedule', link: '/dashboard/schedule', icon: <CalendarDaysIcon className='w-5 h-5' /> },
    { name: 'Grades', link: '/dashboard/grades', icon: <GraduationCapIcon className='w-5 h-5' /> },
    { name: 'Notifications', link: '/dashboard/notifications', icon: <BellIcon className='w-5 h-5' /> },
  ]

  return (
    <div className='flex w-full min-h-screen overflow-hidden bg-slate-100'>
      {/* Desktop Sidebar */}
      <div className='fixed top-0 left-0 hidden w-64 h-screen pt-20 bg-indigo-100 border-r border-blue-400 md:block'>
        <div className='flex flex-col h-full pt-6'>
          {/* Profile Section */}
          <div className='flex flex-col items-center px-4 mb-8'>
              {/* User Button for Desktop */}
              {/* <div className="p-4 mt-auto border-blue-300">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox: "w-full justify-start",
                      userButtonTrigger: "w-full p-3 bg-white rounded-lg hover:bg-gray-50",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div> */}

            <div className='relative w-20 h-20 mb-4 overflow-hidden border border-gray-400 rounded-full shadow-md bg-gray-50'>
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className='object-cover w-full h-full'
                />
              ) : profile?.userImage ? (
                <img 
                  src={profile.userImage} 
                  alt="Profile" 
                  className='object-cover w-full h-full'
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-blue-100 to-indigo-100">
                  <span className="text-2xl font-bold text-blue-600">
                    {user?.firstName?.charAt(0) || 'Alex Wang'}
                  </span>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">
                {user?.fullName || 'Alex Wang'}
              </h3>
              <p className="text-sm text-gray-600">
                {user?.primaryEmailAddress?.emailAddress || 'alexWang@gmail.com'}
              </p>
            </div>
          </div>
          
          {/* Navigation Options */}
          <div className='flex flex-col items-center px-4 space-y-2'>
            {options.map((opt) => (
              <button
                key={opt.name}
                onClick={handleNavigate(opt.link)}
                className={`
                  w-full text-left p-3 rounded-lg text-sm flex items-center gap-3
                  ${pathname === opt.link 
                    ? 'bg-blue-400 text-white shadow-md' 
                    : 'hover:bg-indigo-200 text-black'
                  }
                  transition-all duration-200
                `}
              >
                <div className='flex items-center justify-center'>
                  {opt.icon}
                </div>
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
          
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className='fixed top-0 left-0 z-10 w-16 h-screen pt-20 bg-gray-100 border-r border-blue-400 md:hidden'>
        <div className='flex flex-col items-center justify-center w-full gap-2 px-2'>
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={handleNavigate(opt.link)}
              className={`p-2 rounded-md ${
                pathname === opt.link 
                  ? 'bg-blue-400 text-white' 
                  : 'text-gray-700'
              }`}
              title={opt.name}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 w-full min-h-screen ml-16 overflow-hidden md:ml-64'>
        <div className='h-full px-2 overflow-y-auto'>
          {/* Mobile Top Bar with User Info */}
          <div className='w-full pt-4 overflow-x-hidden pb-15'>
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Floating Message Button */}
      <button
        onClick={handleNavigate('/ai-chat')}
        className='fixed z-20 flex items-center justify-center transition-all duration-200 bg-white border border-orange-400 rounded-full shadow-xl cursor-pointer w-14 h-14 md:w-16 md:h-16 bottom-7 right-7 hover:shadow-2xl hover:scale-105'
        aria-label="AI Chat"
      >
        <MessageCircleIcon className='text-[#002d59] w-5 h-5 md:w-8 md:h-8' />
      </button>
    </div>
  )
}

export default DashboardLayout
