import { ArrowDown } from 'lucide-react'
import React from 'react'

const CourseNav = () => {
  return (
    <div>
        <div className='w-full py-2 flex justify-between items-center bg-whiteshadow-md mb-6'>
            <div className='py-1 px-2 flex text-xs gap-1 border border-gray-300'>
                <p className=' font-medium'>All Courses</p>
                <ArrowDown className='w-4 h-4'/>
            </div>
            <div>

            </div>
        </div>
    </div>  
    )
}

export default CourseNav
