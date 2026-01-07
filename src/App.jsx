import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../components/layouts/DashboardLayout'
import Courses from '../pages/Courses'
import Notifications from '../pages/Notifications'
import Grades from '../pages/Grades'
import Dashboard from '../pages/Dashboard'
import Schedule from '../pages/Schedule'
import AiChat from '../pages/AiChat'
import Course from '../pages/Course'
import CourseLayout from '../components/layouts/CourseLayout'

const App = () => {
  return (
    <div className='w-full relative bg-slate-100 min-h-screen'>
      <Navbar />
      <div className='w-full'>
        <Routes>
          {/* All routes use DashboardLayout */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='/courses' element={<CourseLayout/>}>
              <Route path="/courses" element={<Courses />} />
            </Route>
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/schedule" element={<Schedule />} />
          </Route>
          <Route path='/ai-chat' element={<AiChat/>}/>
          <Route path="/courses/:courseId" element={<Course />} />
          
        </Routes>
      </div>
    </div>
  )
}

export default App