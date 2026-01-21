import React from 'react'
import { SignUp as ClerkSignUp } from '@clerk/clerk-react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assets } from '../src/assets/assets'

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

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
              Join IUA University
            </h1>
            <p className="text-gray-600">
              Create your student account to access the portal
            </p>
          </div>

          <ClerkSignUp 
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
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
              },
            }}
          />

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-[#002d69] hover:text-[#001a47] font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp