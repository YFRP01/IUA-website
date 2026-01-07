import React from 'react'
import { Outlet } from 'react-router-dom'
import { courses } from '../../src/assets/assets'
import TruncateText from '../TruncateText'

const CourseLayout = () => {
  return (
    <div className='flex w-full h-[calc(100vh-4rem)]'>
      {/* Sidebar - FIXED height, NO overflow */}
      <div className='border-r max-md:hidden border-blue-300 w-45 md:w-40 lg:w-50 xl:w-60 bg-gray-50'>
        <h2 className='text-2xl font-semibold mx-2 y-3'>Courses</h2>
        <div className='text-xs p-1 px-2 space-y-1 h-full'>
            {courses.map((course)=>(
                <h3 
                  key={course.id} 
                  className='w-full px-3 py-2 hover:bg-blue-200 rounded cursor-pointer'
                >
                  <TruncateText maxLength={20} text={course.title}/>    
                </h3>
            ))}
        </div>
      </div>

      {/* Main content area - ONLY this scrolls */}
      <div className='flex-1 bg-gray-100'>
        <div className='h-full overflow-y-auto'> {/* Scroll container INSIDE */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default CourseLayout

// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import { courses } from '../../src/assets/assets'
// import TruncateText from '../TruncateText'

// const CourseLayout = () => {
//   return (
//     <div className='flex w-full'>
//       {/* sidebar */}
//       <div className='border-r h-screen border-blue-300 max-w-50 bg-gray-50'>
//         <div className='text-xs pb-20 border-blue-400 space-y-1 overflow-y-auto h-full'>
//             {courses.map((course)=>(
//                 <h3 key={course.id} className='w-full px-3 py-2 hover:bg-blue-200'>
//                     <TruncateText maxLength={12} text={course.title}/>    
//                 </h3>
//             ))}
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className='flex-1 bg-gray-100 h-screen overflow-y-auto'>
//         <Outlet />
//       </div>
//     </div>
//   )
// }

// export default CourseLayout
