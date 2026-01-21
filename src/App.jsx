import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import LandingPage from '../pages/LandingPage'
import ProtectedRoute from '../components/Auth/ProtectedRoute'
import DashboardLayout from '../components/layouts/DashboardLayout'
import Courses from '../pages/Courses'
import Notifications from '../pages/Notifications'
import Grades from '../pages/Grades'
import Schedule from '../pages/Schedule'
import AiChat from '../pages/AiChat'
import Dashboard from '../pages/Dashboard'


// Main App component
const App = () => {
  return (
      <Router>
        <div className='relative w-full min-h-screen bg-slate-100'>
          {/* Conditionally render Navbar based on auth state */}
          <SignedIn>
            <Navbar />
          </SignedIn>
          
          <div className='w-full pt-16'>
            <Routes>
              {/* Root route - conditionally redirect based on auth */}
              <Route 
                path="/" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <LandingPage />
                    </SignedOut>
                  </>
                } 
              />
              
              {/* Auth routes */}
              <Route 
                path="/sign-in" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <SignIn />
                    </SignedOut>
                  </>
                } 
              />
              
              <Route 
                path="/sign-up" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <SignUp />
                    </SignedOut>
                  </>
                } 
              />
              

              {/* Protected Dashboard Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="grades" element={<Grades />} />
                <Route path="schedule" element={<Schedule />} />
              </Route>

              {/* Individual Protected Routes */}
              <Route 
                path="/ai-chat" 
                element={
                  <ProtectedRoute>
                    <AiChat />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
  )
}

export default App