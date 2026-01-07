import React from 'react'
import { courses } from '../src/assets/assets'
import CourseCard from '../components/CourseCard'
import { ArrowDown, BookA, Calendar, FileIcon } from 'lucide-react'

const Courses = () => {

  const [activeNav, setActiveNav] = React.useState('files');

  const NavOptions = [
    {
      id: 1,
      name: 'Files',
      icon: <FileIcon className='w-4 h-4'/>
    },
    {
      id: 2,
      name: 'Assignments',
      icon: <BookA className='w-4 h-4'/>
    },
    {
      id: 3,
      name: 'Calendar',
      icon: <Calendar className='w-4 h-4'/>
    }
]
  return (
    <div className=' py-2 md:py-4 px-1'>
      <div>
        {/* top navbar */}
        <div className='w-full py-2 flex justify-between md:hidden text-gray-500 items-center px-2 mb-2'>
             <button className='p-3 bg-white flex text-xs hover:bg-blue-100 cursor-pointer gap-1 border border-gray-500'>
                <p className=' font-medium'>All Courses</p>
                <ArrowDown className='w-4 h-4'/>
             </button>
             <div className='flex gap-1 border h-10 bg-white text-gray-500 border-gray-500'>
                  {NavOptions.map((option)=>(
                    <button key={option.id} className='gap-1 w-full flex items-center text-xs text-gray-500'>
                      <div className='hover:bg-blue-100 px-1 cursor-pointer flex items-center h-full w-full justify-center'>
                        <span>{option.icon}</span>
                        <span>{option.name}</span>
                      </div>
                        <span>{option.id !== 3 && '|'}</span>
                    </button>
                  ))}
             </div>
        </div>
      </div>
      <div className='ml-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {/* {courses.map((course)=>(
          <div key={course.id}> */}
            {courses[5].notes.map((note)=>(
              <div key={note.id}>
                <CourseCard course={note} />
              </div>
              ))}
          {/* </div>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Courses