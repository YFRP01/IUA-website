import React from 'react'
import { SignIn as ClerkSignIn } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assets } from '../src/assets/assets'

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Card Container */}
        <div className="p-8 bg-white shadow-xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <img 
                src={assets.logo2} 
                alt="IUA University" 
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Welcome Back to IUA
            </h1>
            <p className="text-gray-600">
              Sign in to access your Student Management Portal
            </p>
          </div>

          {/* Clerk SignIn Component */}
          <ClerkSignIn 
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-[#002d69] hover:bg-[#002255] text-white',
                formFieldInput: 
                  'rounded-lg border-gray-300 focus:border-[#002d69] focus:ring-[#002d69]',
                card: 'shadow-none bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                footerActionLink: 'text-[#002d69] hover:text-[#001a47]',
                socialButtonsBlockButton: 
                  'border-gray-300 hover:bg-gray-50',
              },
              variables: {
                colorPrimary: '#002d69',
              },
            }}
          />

          {/* Demo Note */}
          <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-center text-blue-800">
              <strong>Welcome to IUA Student Portal</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn