import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, CheckCircle, Brain } from 'lucide-react'
import { assets } from '../src/assets/assets'

const LandingPage = () => {
  return (
    <div className="min-h-screen pt-0 bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="px-4 pb-16 mx-auto text-center pt-7 max-w-7xl">
        <div className="inline-flex items-center justify-center w-40 h-40 mb-6">
          <img src={assets.logo2} alt="IUA University" className="object-contain w-full h-full" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          IUA University Student Portal
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600">
          Your comprehensive platform for academic success. Manage courses, track grades, submit assignments, and collaborate with peers.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-linear-to-r from-[#002d69] to-[#0044aa] rounded-lg hover:from-[#002255] hover:to-[#003388]"
          >
            Get Started
          </Link>
          <Link
            to="/sign-in"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
          Everything You Need for Academic Success
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "Course Management", desc: "Access all course materials, schedules, and resources" },
            { icon: CheckCircle, title: "Assignments", desc: "Submit and track assignments with automatic deadline reminders" },
            { icon: GraduationCap, title: "Grade Tracking", desc: "Monitor your academic progress and GPA in real-time" },
            { icon: Brain, title: "AI Assistant", desc: "Get instant help with your studies and assignments" },
          ].map((feature, index) => (
            <div key={index} className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
