import React from 'react'
import { UserButton as ClerkUserButton } from '@clerk/clerk-react'

const UserButton = () => {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          userButtonAvatarBox: "w-8 h-8",
          userButtonTrigger: "hover:bg-gray-100",
        },
      }}
      afterSignOutUrl="/"
    />
  )
}

export default UserButton