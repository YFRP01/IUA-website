import React, { useState } from 'react'
import { Bell, CheckCircle, Clock, Users, Video, MessageSquare, FileText, Calendar, AlertCircle,TrendingUp,X,Check,Filter,Settings,Download,ExternalLink,Star,Award,BookOpen,UserPlus,ThumbsUp,MessageCircle
} from 'lucide-react'
import PageTitle from '../components/PageTitle'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all')
  const [readNotifications, setReadNotifications] = useState(new Set())
  const [notificationStates, setNotificationStates] = useState({
    assignments: new Map([
      [1, { submitted: false, downloaded: false, previewed: false }],
      [2, { submitted: true, downloaded: false, previewed: false }],
      [3, { submitted: false, downloaded: false, previewed: false }]
    ]),
    classes: new Map([
      [4, { joined: false, downloaded: false, previewed: false }],
      [5, { downloaded: false, previewed: false }]
    ]),
    announcements: new Map([
      [8, { downloaded: false, previewed: false }]
    ])
  })

  const filters = [
    { id: 'all', label: 'All', count: 42 },
    { id: 'unread', label: 'Unread', count: 8 },
    { id: 'assignments', label: 'Assignments', count: 12 },
    { id: 'classes', label: 'Classes', count: 6 },
    { id: 'announcements', label: 'Announcements', count: 15 }
  ]

  // Mock notifications data
  const notifications = {
    assignments: [
      {
        id: 1,
        title: 'Data Structures Assignment Due',
        course: 'CS201 - Data Structures',
        type: 'assignment',
        priority: 'high',
        time: '2 hours ago',
        dueDate: 'Tomorrow, 11:59 PM',
        points: 100,
        submitted: false,
        unread: true,
        fileUrl: '/assignments/ds_assignment.pdf',
        assignmentDetails: 'Implement various data structures including Linked Lists, Trees, and Hash Tables.'
      },
      {
        id: 2,
        title: 'Web Development Project Review',
        course: 'WD101 - Web Development',
        type: 'assignment',
        priority: 'medium',
        time: '5 hours ago',
        dueDate: 'Dec 15, 5:00 PM',
        points: 150,
        submitted: true,
        unread: true,
        fileUrl: '/assignments/web_project.pdf',
        submissionUrl: '/submissions/web_project.zip',
        assignmentDetails: 'Build a responsive e-commerce website with React and Node.js.'
      },
      {
        id: 3,
        title: 'Database Design Quiz',
        course: 'DB301 - Database Systems',
        type: 'quiz',
        priority: 'medium',
        time: '1 day ago',
        dueDate: 'Dec 12, 10:00 AM',
        points: 50,
        submitted: false,
        unread: false,
        fileUrl: '/quizzes/db_quiz.pdf',
        assignmentDetails: 'Quiz covering SQL queries, normalization, and database design patterns.'
      }
    ],
    classes: [
      {
        id: 4,
        title: 'Live Session: Machine Learning Basics',
        course: 'ML201 - Machine Learning',
        type: 'live-class',
        priority: 'high',
        time: '30 minutes from now',
        startTime: '2:00 PM',
        duration: '1.5 hours',
        instructor: 'Prof. Alex Johnson',
        link: '#',
        unread: true,
        recordingUrl: '/recordings/ml_basics.mp4',
        slidesUrl: '/slides/ml_basics.pdf'
      },
      {
        id: 5,
        title: 'Recorded Lecture Available',
        course: 'CS101 - Computer Science',
        type: 'recording',
        priority: 'low',
        time: '3 hours ago',
        duration: '45 minutes',
        instructor: 'Dr. Sarah Miller',
        link: '#',
        unread: false,
        recordingUrl: '/recordings/cs101_lecture.mp4',
        slidesUrl: '/slides/cs101_lecture.pdf'
      }
    ],
    announcements: [
      {
        id: 8,
        title: 'Important: Exam Schedule Update',
        course: 'All Courses',
        type: 'announcement',
        priority: 'high',
        time: '2 days ago',
        content: 'Final exam dates have been rescheduled. Please check the updated timetable.',
        urgent: true,
        unread: true,
        attachmentUrl: '/announcements/exam_schedule.pdf',
        fullAnnouncement: 'Due to unforeseen circumstances, the final exam schedule has been revised. All exams will now take place one week later than originally scheduled. Please download the updated timetable for complete details.'
      },
    ]
  }

  const allNotifications = [
    ...notifications.assignments,
    ...notifications.classes,
    ...notifications.announcements
  ]

  const filteredNotifications = allNotifications.filter(notification => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'unread') return notification.unread
    if (activeFilter === 'assignments') return notification.type.includes('assignment') || notification.type === 'quiz'
    if (activeFilter === 'classes') return notification.type.includes('class') || notification.type === 'recording'
    if (activeFilter === 'announcements') return notification.type === 'announcement' || notification.type === 'resource'
    return true
  })

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'medium':
        return <Clock className="w-5 h-5 text-amber-500" />
      case 'low':
        return <Bell className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'assignment':
      case 'quiz':
        return <FileText className="w-5 h-5 text-purple-600" />
      case 'live-class':
        return <Video className="w-5 h-5 text-red-600" />
      case 'recording':
        return <Video className="w-5 h-5 text-blue-600" />
      case 'group-meeting':
        return <Users className="w-5 h-5 text-green-600" />
      case 'announcement':
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case 'resource':
        return <Download className="w-5 h-5 text-indigo-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  // Handle assignment submission
  const handleAssignmentSubmit = (notificationId) => {
    setNotificationStates(prev => {
      const newStates = new Map(prev.assignments)
      const currentState = newStates.get(notificationId) || { submitted: false, downloaded: false, previewed: false }
      newStates.set(notificationId, { ...currentState, submitted: true })
      return { ...prev, assignments: newStates }
    })
    
    // In a real app, you would make an API call here
    console.log(`Submitting assignment for notification ${notificationId}`)
    
    // Mark as read
    setReadNotifications(prev => new Set(prev.add(notificationId)))
  }

  // Handle file download
  const handleDownload = (notificationId, fileType) => {
    const notification = allNotifications.find(n => n.id === notificationId)
    let fileUrl = ''
    
    if (fileType === 'assignment') {
      fileUrl = notification.fileUrl
      setNotificationStates(prev => {
        const newStates = new Map(prev.assignments)
        const currentState = newStates.get(notificationId) || { submitted: false, downloaded: false, previewed: false }
        newStates.set(notificationId, { ...currentState, downloaded: true })
        return { ...prev, assignments: newStates }
      })
    } else if (fileType === 'recording') {
      fileUrl = notification.recordingUrl
      setNotificationStates(prev => {
        const newStates = new Map(prev.classes)
        const currentState = newStates.get(notificationId) || { downloaded: false, previewed: false }
        newStates.set(notificationId, { ...currentState, downloaded: true })
        return { ...prev, classes: newStates }
      })
    } else if (fileType === 'announcement') {
      fileUrl = notification.attachmentUrl
      setNotificationStates(prev => {
        const newStates = new Map(prev.announcements)
        const currentState = newStates.get(notificationId) || { downloaded: false, previewed: false }
        newStates.set(notificationId, { ...currentState, downloaded: true })
        return { ...prev, announcements: newStates }
      })
    }
    
    // Simulate download
    console.log(`Downloading ${fileType} from ${fileUrl}`)
    
    // In a real app, you would trigger a download
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileUrl.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Mark as read
    setReadNotifications(prev => new Set(prev.add(notificationId)))
  }

  // Handle preview
  const handlePreview = (notificationId, previewType) => {
    const notification = allNotifications.find(n => n.id === notificationId)
    
    if (previewType === 'assignment') {
      setNotificationStates(prev => {
        const newStates = new Map(prev.assignments)
        const currentState = newStates.get(notificationId) || { submitted: false, downloaded: false, previewed: false }
        newStates.set(notificationId, { ...currentState, previewed: true })
        return { ...prev, assignments: newStates }
      })
      
      // Open assignment details in a modal or new page
      console.log(`Previewing assignment: ${notification.title}`)
      alert(`Assignment Details:\n\n${notification.assignmentDetails}`)
    } else if (previewType === 'announcement') {
      setNotificationStates(prev => {
        const newStates = new Map(prev.announcements)
        const currentState = newStates.get(notificationId) || { downloaded: false, previewed: false }
        newStates.set(notificationId, { ...currentState, previewed: true })
        return { ...prev, announcements: newStates }
      })
      
      // Show full announcement
      console.log(`Previewing announcement: ${notification.title}`)
      alert(`Full Announcement:\n\n${notification.fullAnnouncement}`)
    }
    
    // Mark as read
    setReadNotifications(prev => new Set(prev.add(notificationId)))
  }

  // Generate calendar dates (moved outside JSX to fix purity error)
  const getCalendarDates = () => {
    const now = new Date()
    const start = now.toISOString().replace(/[-:]/g, '').split('.')[0]
    const end = new Date(now.getTime() + 90 * 60000).toISOString().replace(/[-:]/g, '').split('.')[0]
    return { start, end }
  }

  const renderNotificationContent = (notification) => {
    // Declare variables outside switch to fix no-case-declarations error
    let assignmentState, classState, announcementState, isSubmitted, isDownloaded, isJoined, isRecordingDownloaded, isAnnouncementDownloaded, isAnnouncementPreviewed
    
    switch (notification.type) {
      case 'assignment':
      case 'quiz':
        assignmentState = notificationStates.assignments.get(notification.id)
        isSubmitted = assignmentState?.submitted || notification.submitted
        isDownloaded = assignmentState?.downloaded || false
        
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{notification.time}</span>
              <span>•</span>
              <span>{notification.course}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{notification.course}</span>
              <span className="text-sm font-semibold text-purple-600">{notification.points} points</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Due: {notification.dueDate}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isSubmitted 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isSubmitted ? 'Submitted' : 'Pending'}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAssignmentSubmit(notification.id)}
                disabled={isSubmitted}
                className={`flex-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg ${
                  isSubmitted 
                    ? 'bg-green-600 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isSubmitted ? 'Submitted ✓' : 'Submit'}
              </button>
              <button 
                onClick={() => handleDownload(notification.id, 'assignment')}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 transition-colors border border-purple-200 rounded-lg hover:bg-purple-50"
              >
                <Download className="w-4 h-4" />
                {isDownloaded ? 'Downloaded' : 'Download'}
              </button>
              <button 
                onClick={() => handlePreview(notification.id, 'assignment')}
                className="px-3 py-2 text-sm font-medium text-purple-600 transition-colors border border-purple-200 rounded-lg hover:bg-purple-50"
              >
                Details
              </button>
            </div>
          </div>
        )

      case 'live-class':
        classState = notificationStates.classes.get(notification.id)
        isJoined = classState?.joined || false
        isRecordingDownloaded = classState?.downloaded || false
        
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{notification.course}</span>
              <span className="text-sm text-gray-500">Starting {notification.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Video className="w-4 h-4" />
              <span>Instructor: {notification.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Duration: {notification.duration}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setNotificationStates(prev => {
                    const newStates = new Map(prev.classes)
                    newStates.set(notification.id, { ...(newStates.get(notification.id) || {}), joined: true })
                    return { ...prev, classes: newStates }
                  })
                  window.open("https://meeting.tencent.com/dm/FC4kjaHFiwFs", "_blank")
                }}
                className={`flex-1 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg ${
                  isJoined ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isJoined ? 'Joined ✓' : 'Join Class'}
              </button>
              <button 
                onClick={() => handleDownload(notification.id, 'recording')}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 transition-colors border border-red-200 rounded-lg hover:bg-red-50"
              >
                <Download className="w-4 h-4" />
                {isRecordingDownloaded ? 'Slides Downloaded' : 'Get Slides'}
              </button>
              {/* Hidden calendar link */}
              <a 
                id={`calendar-add-${notification.id}`}
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(notification.title)}&dates=${getCalendarDates().start}/${getCalendarDates().end}&details=${encodeURIComponent(notification.course)}&location=Online`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden"
              >
                Add to Google Calendar
              </a>
            </div>
          </div>
        )

      case 'announcement':
        announcementState = notificationStates.announcements.get(notification.id)
        isAnnouncementDownloaded = announcementState?.downloaded || false
        isAnnouncementPreviewed = announcementState?.previewed || false
        
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{notification.course}</span>
              {notification.urgent && (
                <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                  Urgent
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{notification.content}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handlePreview(notification.id, 'announcement')}
                className={`flex-1 px-3 py-2 text-sm font-medium text-orange-600 transition-colors border border-orange-200 rounded-lg hover:bg-orange-50 ${
                  isAnnouncementPreviewed ? 'bg-orange-50' : ''
                }`}
              >
                {isAnnouncementPreviewed ? 'Viewed Full Announcement' : 'View Full Announcement'}
              </button>
              {notification.attachmentUrl && (
                <button 
                  onClick={() => handleDownload(notification.id, 'announcement')}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-orange-600 transition-colors border border-orange-200 rounded-lg hover:bg-orange-50"
                >
                  <Download className="w-4 h-4" />
                  {isAnnouncementDownloaded ? 'Downloaded' : 'Download'}
                </button>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Mark all as read
  const markAllAsRead = () => {
    const allIds = allNotifications.map(n => n.id)
    setReadNotifications(new Set(allIds))
  }

  // Download all attachments
  const downloadAllAttachments = () => {
    allNotifications.forEach(notification => {
      if (notification.fileUrl || notification.attachmentUrl) {
        handleDownload(notification.id, 
          notification.type === 'assignment' ? 'assignment' : 
          notification.type === 'announcement' ? 'announcement' : 'recording'
        )
      }
    })
  }

  return (
    <div className="w-full mx-auto md:p-2">
      {/* Header */}
      <PageTitle title='Notifications' subtitle='Stay updated with assignments, classes, groups, and announcements'/>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column - Stats & Filters */}
        <div className="space-y-6 lg:col-span-1">
          {/* Statistics Card */}
          <div className="p-5 border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Notifications Summary</h3>
                <p className="text-sm text-gray-600">Your recent activity</p>
              </div>
            </div>
            

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unread</span>
                <span className="text-lg font-bold text-blue-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Today</span>
                <span className="text-lg font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-lg font-bold text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priority</span>
                <span className="text-lg font-bold text-red-600">3</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-5 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Filter By</h3>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => (setActiveFilter(filter.id))}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      filter.id === 'unread' ? 'bg-blue-500' :
                      filter.id === 'assignments' ? 'bg-purple-500' :
                      filter.id === 'classes' ? 'bg-red-500' :
                      filter.id === 'announcements' ? 'bg-orange-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5 bg-white border border-gray-200 rounded-xl">
            <h3 className="mb-4 font-bold text-gray-900">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={() => navigate('/dashboard/schedule')} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>View Calendar</span>
              </button>
              <button onClick={markAllAsRead} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Mark All as Read</span>
              </button>
              <button onClick={downloadAllAttachments} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Download className="w-4 h-4 text-purple-600" />
                <span>Download All Attachments</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Notifications List */}
        <div className="lg:col-span-3">
          {/* Notifications Header */}
          <div className="p-4 mb-6 bg-white border border-gray-200 rounded-xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {activeFilter === 'all' ? 'All Notifications' : 
                   activeFilter === 'unread' ? 'Unread Notifications' :
                   `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredNotifications.length} notifications found
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Today
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  This Week
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                  All Time
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => {
                const isRead = readNotifications.has(notification.id) || !notification.unread
                
                return (
                  <div
                    key={notification.id}
                    className={`bg-white border rounded-xl p-4 transition-all ${
                      isRead 
                        ? 'border-gray-200' 
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex flex-col items-start gap-3">
                      {/* Notification Icon */}
                      <div className="items-center gap-2 /*max-md:w-full*/ /*max-md:*/ relative flex w-full /*max-md:flex*/">
                        <div className='/*max-md:*/ flex w-fit'>
                          <div className="p-2 bg-white border border-gray-200 rounded-lg">
                              {getTypeIcon(notification.type)}
                            </div>
                            {!isRead && (
                              <div className="absolute w-3 h-3 bg-blue-500 border-2 border-white rounded-full -top-1 -right-1" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {notification.title}
                              </h3>
                              {getPriorityIcon(notification.priority)}
                            </div>
                          </div>
                        </div>


                      {/* Notification Content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between mb-2">
                        </div>
                        {/* Dynamic Content */}
                        {renderNotificationContent(notification)}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="py-12 text-center bg-white border border-gray-200 rounded-xl">
                <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-bold text-gray-900">No Notifications</h3>
                <p className="max-w-md mx-auto text-gray-600">
                  {activeFilter === 'unread' 
                    ? 'All notifications have been read.' 
                    : 'No notifications match your current filter.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications

