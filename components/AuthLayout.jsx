import React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

const AuthLayout = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default AuthLayout