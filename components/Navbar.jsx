import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { assets } from '../src/assets/assets'
import { MenuIcon, Search, XIcon, GraduationCap } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Dashboard', path: isSignedIn ? '/dashboard' : '/sign-in' },
    { name: 'AI Assistant', path: isSignedIn ? '/ai-chat' : '/sign-in' },
    { name: 'Game', path: 'https://philipela13.itch.io/pavel-the-driver', external: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (link) => {
    if (link.external) {
      window.open(link.path, '_blank')
    } else {
      navigate(link.path)
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#002d69]/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-[#002d69] py-3'
    }`}>
      <div className="flex items-center justify-between px-4 mx-auto max-w-7xl md:px-6">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <img  
            src={assets.logo2} 
            alt="IUA University Logo" 
            className="object-contain w-12 h-12 md:h-14 md:w-14"
          />
          <span className='font-bold text-[#ffbd59] text-lg md:text-xl lg:text-2xl'>
            IUA UNIVERSITY
          </span>                
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center hidden gap-6 md:flex lg:gap-8">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavigation(link)}
              className="group relative text-white hover:text-[#ffbd59] transition-colors"
            >
              {link.name}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#ffbd59] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-white cursor-pointer hover:text-[#ffbd59]" />
            
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 md:w-10 md:h-10",
                    userButtonTrigger: "focus:shadow-none",
                  },
                }}
                afterSignOutUrl="/"
              />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-white hover:text-[#ffbd59] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-5 py-2.5 bg-white text-[#002d69] font-medium rounded-full hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {isSignedIn && (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
              afterSignOutUrl="/"
            />
          )}
          <MenuIcon 
            onClick={() => setIsMenuOpen(true)} 
            className="w-6 h-6 text-white cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300 md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMenuOpen(false)}>
              <XIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Logo in Mobile Menu */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#002d69] rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#ffbd59]" />
            </div>
            <span className="font-bold text-gray-900">IUA Portal</span>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-4">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavigation(link)}
                className="flex items-center w-full gap-3 px-4 py-3 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Authentication Section */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            {isSignedIn ? (
              <div className="px-4">
                <div className="mb-4 text-sm text-gray-500">Signed in as</div>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox: "w-full justify-start",
                      userButtonTrigger: "w-full p-3 bg-gray-50 rounded-lg",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-white bg-[#002d69] rounded-lg hover:bg-[#002255]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar