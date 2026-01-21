import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='overflow-hidden transition-transform duration-300 bg-white shadow-md cursor-pointer rounded-xl hover:-translate-y-1 hover:shadow-lg'>
      {/* Image section */}
      <div className="h-40 overflow-hidden">
         <img alt={course.title + 'image'} className='w-full h-full object-cover /*blur-xs*/ rounded-t-2xl' src={course.Image} />
      </div>
      
      {/* Content section */}
      <div className="p-4">
        <h3 className="mb-1 font-semibold text-gray-800">
          {course.title.length > 20 ? `${course.title.substring(0, 50)}...` : course.title}
        </h3>
        <p className="text-sm text-gray-600">
          {course.subtitle?.length > 40 ? `${course.subtitle.substring(0, 70)}...` : course.subtitle}
        </p>
      </div>
    </div>
  )
}

export default CourseCard
