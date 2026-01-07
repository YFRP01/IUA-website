import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='rounded-xl bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-300 shadow-md hover:shadow-lg cursor-pointer'>
      {/* Image section */}
      <div className="h-48 overflow-hidden">
         <img alt={course.title + 'image'} className='w-full h-full object-cover /*blur-xs*/ rounded-t-2xl' src={course.Image} />
      </div>
      
      {/* Content section */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">
          {course.title.length > 20 ? `${course.title.substring(0, 50)}...` : course.title}
        </h3>
        <p className="text-gray-600 text-sm">
          {course.subtitle?.length > 40 ? `${course.subtitle.substring(0, 70)}...` : course.subtitle}
        </p>
      </div>
    </div>
  )
}


// const CourseCard = ({course}) => {
//     const navigate = useNavigate();
//   return (
//       <div className='rounded-2xl bg-slate-200 overflow-hidden h-full w-full flex flex-col hover:-translate-y-1 transition duration-300 shadow-md hover:scale-102 cursor-pointer'>
//         <div className="flex flex-wrap items-center gap-8">
//             <div className="rounded-2xl w-full overflow-hidden border border-gray-200">
//                 <div className="w-full flex border-b border-gray-300">
//                     <div className='rounded-t-2xl h-40 w-full'>
//                         <img alt={course.title + 'image'} className='w-full h-full object-cover blur-xs rounded-t-2xl' src={course.Image} />
//                     </div>
//                 </div>
//                 <div className="flex flex-col items-start pb- px-3 h-20 bg-white">
//                     <p className="font-medium mt-3"><TruncateText maxLength={100} text={course.title}/></p>
//                     <p className="text-gray-500 text-sm"><TruncateText maxLength={50} text={course.subtitle}/></p>
//                 </div>
//             </div>  
        
//             </div>
//       </div>
//   )
// }

export default CourseCard
