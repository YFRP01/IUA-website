import React, { useState } from 'react'
import { Calendar, Clock, MapPin, User, BookOpen, ChevronLeft, ChevronRight,X,MessageSquare, Users, Video, FileText} from 'lucide-react'
import TruncateText from '../components/TruncateText'

const Schedule = () => {
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [showWeekSelector, setShowWeekSelector] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseDetails, setShowCourseDetails] = useState(false)

  // Weeks of the semester
  const weeks = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    label: `Week ${i + 1}`,
    dateRange: `Oct ${(i * 7) + 1} - Oct ${(i * 7) + 7}, 2024`
  }))

  // Time slots for the day
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ]

  // Days of the week
  const days = [
    { id: 'mon', label: 'Monday', date: 'Oct 28' },
    { id: 'tue', label: 'Tuesday', date: 'Oct 29' },
    { id: 'wed', label: 'Wednesday', date: 'Oct 30' },
    { id: 'thu', label: 'Thursday', date: 'Oct 31' },
    { id: 'fri', label: 'Friday', date: 'Nov 1' },
    { id: 'sat', label: 'Saturday', date: 'Nov 2' },
    { id: 'sun', label: 'Sunday', date: 'Nov 3' }
  ]

  // Sample courses data
  const courses = [
    {
      id: 'CS101-1',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      instructor: 'Dr. Sarah Johnson',
      type: 'lecture',
      day: 'mon',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      duration: 90,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Room 204, CS Building',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      description: 'Fundamental concepts of computer science and programming.',
      materials: ['Lecture Slides', 'Assignment 1', 'Reading Chapter 1']
    },
    {
      id: 'CS201-1',
      code: 'CS201',
      title: 'Data Structures',
      instructor: 'Prof. Michael Chen',
      type: 'lecture',
      day: 'mon',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      duration: 90,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Room 305, CS Building',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      description: 'Advanced data structures and algorithm analysis.'
    },
    {
      id: 'WD101-1',
      code: 'WD101',
      title: 'Web Development Lab',
      instructor: 'Dr. Emma Williams',
      type: 'lab',
      day: 'tue',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      duration: 120,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Lab 2, Engineering Building',
      color: 'bg-green-100 border-green-300 text-green-800',
      description: 'Hands-on web development practice session.'
    },
    {
      id: 'DB301-1',
      code: 'DB301',
      title: 'Database Systems',
      instructor: 'Prof. Robert Davis',
      type: 'lecture',
      day: 'wed',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      duration: 90,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Room 410, CS Building',
      color: 'bg-amber-100 border-amber-300 text-amber-800',
      description: 'Database design and management principles.'
    },
    {
      id: 'ML201-1',
      code: 'ML201',
      title: 'Machine Learning',
      instructor: 'Dr. Alex Kim',
      type: 'seminar',
      day: 'thu',
      startTime: '3:00 PM',
      endTime: '4:30 PM',
      duration: 90,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Room 512, AI Center',
      color: 'bg-red-100 border-red-300 text-red-800',
      description: 'Introduction to machine learning algorithms.'
    },
    {
      id: 'CS101-2',
      code: 'CS101',
      title: 'CS101 Tutorial',
      instructor: 'TA: Lisa Wang',
      type: 'tutorial',
      day: 'fri',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      duration: 60,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Tutorial Room 3',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      description: 'Weekly tutorial session for CS101.'
    },
    {
      id: 'CS201-2',
      code: 'CS201',
      title: 'Data Structures Lab',
      instructor: 'TA: James Smith',
      type: 'lab',
      day: 'wed',
      startTime: '4:00 PM',
      endTime: '6:00 PM',
      duration: 120,
      link: 'https://meeting.tencent.com/dm/FC4kjaHFiwFs',
      room: 'Lab 4, CS Building',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      description: 'Practical implementation of data structures.'
    }
  ]

  const getTimeSlotIndex = (time) => {
    return timeSlots.findIndex(slot => slot === time)
  }

  const getCoursePosition = (course) => {
    const startIndex = getTimeSlotIndex(course.startTime)
    const durationSlots = Math.ceil(course.duration / 60)
    return {
      rowStart: startIndex + 2, // +1 for header
      rowSpan: durationSlots
    }
  }

  const getCoursesForDay = (dayId) => {
    return courses.filter(course => course.day === dayId)
  }

  const handlePreviousWeek = () => {
    setSelectedWeek(prev => Math.max(1, prev - 1))
  }

  const handleNextWeek = () => {
    setSelectedWeek(prev => Math.min(weeks.length, prev + 1))
  }

  const handleWeekSelect = (weekId) => {
    setSelectedWeek(weekId)
    setShowWeekSelector(false)
  }

  return (
    <div className="w-full mx-auto md:p-2">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-3 lg:flex-row lg:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Weekly Schedule</h1>
          <p className="text-gray-600">Semester Fall 2024 • {weeks[selectedWeek - 1]?.dateRange}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-1">
          {/* Week Navigation */}
          <div className="flex items-center justify-center w-full gap-2">
            <button
              onClick={handlePreviousWeek}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowWeekSelector(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Calendar className="w-4 h-4" />
              Week {selectedWeek}
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleNextWeek}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Selector Modal */}
      {showWeekSelector && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-opacity-50 shado-lg z-101 bg-black/30">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Select Week</h2>
                <p className="text-gray-600">Semester Fall 2024</p>
              </div>
              <button
                onClick={() => setShowWeekSelector(false)}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {weeks.map((week) => (
                  <button
                    key={week.id}
                    onClick={() => handleWeekSelect(week.id)}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      selectedWeek === week.id
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold">{week.label}</div>
                    <div className="mt-1 text-sm text-gray-500">{week.dateRange}</div>
                    {selectedWeek === week.id && (
                      <div className="mt-2 text-xs font-medium text-blue-600">
                        Currently Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-1 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowWeekSelector(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowWeekSelector(false)}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-opacity-50 shadow-lg z-101 bg-black/30">
          <div className="w-full overflow-hidden shadow-2xl bg-gray-50 rounded-xl md:max-w-200 md:max-h-250 max-w-150 max-h-140">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h2>
                <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.type}</p>
              </div>
              <button
                onClick={() => setShowCourseDetails(false)}
                className="p-2 transition-colors rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-1 text-sm font-medium text-gray-500">Course Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{selectedCourse.code}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{selectedCourse.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{selectedCourse.startTime} - {selectedCourse.endTime} ({selectedCourse.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{selectedCourse.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-medium text-gray-500">Description</h3>
                    <p className="text-gray-700"><TruncateText maxLength={100} text={selectedCourse.description}/></p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <button onClick={() => window.open(selectedCourse.link)} className="flex flex-col items-center justify-center p-4 transition-colors border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100">
                    <Video className="w-6 h-6 mb-2 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Join Class</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Schedule Grid */}
      <div className="max-md:overflow-x-auto">
        <div className="max-md:min-w-200">
            <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm max-md:min-w-200 md:overflow-hidden rounded-xl">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 border-r border-gray-200">
            <div className="text-sm font-medium text-gray-500">Time</div>
          </div>
          {days.map((day) => (
            <div key={day.id} className="p-2 text-sm border-r border-gray-200 md:text-normal last:border-r-0">
              <div className="font-semibold text-gray-900">{day.label}</div>
              <div className="mt-1 text-sm text-gray-500">{day.date}</div>
            </div>
          ))}
        </div>

        {/* Time Slots & Courses */}
        <div className="relative">
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid h-10 grid-cols-8 border-b border-gray-200 min-h-5 md:min-h-20">
              {/* Time Slot Label */}
              <div className="p-4 border-r border-gray-200 bg-gray-50">
                <div className="text-sm font-medium text-gray-900">{time}</div>
              </div>

              {/* Day Columns */}
              {days.map((day) => {
                const dayCourses = getCoursesForDay(day.id)
                const courseInSlot = dayCourses.find(course => {
                  const coursePos = getCoursePosition(course)
                  return timeIndex >= coursePos.rowStart - 2 && 
                         timeIndex < coursePos.rowStart - 2 + coursePos.rowSpan
                })

                return (
                  <div
                    key={`${day.id}-${time}`}
                    className="relative transition-colors border-r border-gray-200 last:border-r-0 min-h-10 hover:bg-gray-50"
                  >
                    {/* Course Block */}
                    {courseInSlot && timeIndex === getCoursePosition(courseInSlot).rowStart - 2 && (
                      <button
                        onClick={() => (setSelectedCourse(courseInSlot), setShowCourseDetails(true))}
                        className={`absolute inset-1 ${courseInSlot.color} border rounded-lg p-3 text-left hover:shadow-md transition-all cursor-pointer z-10 overflow-hidden`}
                        style={{
                          height: `calc(${getCoursePosition(courseInSlot).rowSpan * 80}px - 8px)`
                        }}
                      >
                        <div className="mb-1 text-[8px] font-semibold truncate">
                          {courseInSlot.code}
                        </div>
                        <div className="text-[8px] truncate opacity-90">
                          {courseInSlot.title}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[8px]">
                          <MapPin className="w-3 h-3" />
                          {courseInSlot.room.split(',')[0]}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[8px]">
                          <Clock className="w-3 h-3" />
                          {courseInSlot.startTime}
                        </div>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Current Time Indicator */}
          {/* <div 
            className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
            style={{ top: `${(new Date().getHours() - 8) * 80 + (new Date().getMinutes() / 60) * 80}px` }}
          >
            <div className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -left-1"></div>
          </div> */}
        </div>
      </div>
        </div>
    </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        {/* Course Type Legend */}
        <div className="p-5 bg-white border border-gray-200 rounded-xl">
          <h3 className="mb-4 font-bold text-gray-900">Course Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
              <span className="text-sm text-gray-700">Lecture</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span className="text-sm text-gray-700">Lab Session</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
              <span className="text-sm text-gray-700">Tutorial</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border rounded bg-amber-100 border-amber-300"></div>
              <span className="text-sm text-gray-700">Seminar</span>
            </div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="p-5 border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
          <h3 className="mb-4 font-bold text-gray-900">Weekly Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Total Classes</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Total Hours</div>
                  <div className="text-sm text-gray-600">Class time</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {courses.reduce((sum, course) => sum + (course.duration / 60), 0)}h
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Schedule