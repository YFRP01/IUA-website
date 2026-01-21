import React from 'react'
import { TrendingUp, BookOpen, Calendar, Award, Clock, Users, BarChart3, Bell,FileText,Video,MessageSquare,Download,ChevronRight,Target,CheckCircle,AlertCircle,Star,Clock3,GraduationCap,ExternalLink,Filter,MoreVertical, RefreshCw} from 'lucide-react'
import { Link } from 'react-router-dom'
import {courses, user} from '../src/assets/assets'
import GradeFunc from '../components/GradeFunc'
import GradingFunc from '../components/GradingFunc'
const Dashboard = () => {


  // Recent activities
  const recentActivities = [
    {
      id: 1,
      title: 'Submitted Database Assignment',
      course: 'DB301 - Database Systems',
      time: '2 hours ago',
      status: 'completed',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />
    },
    {
      id: 2,
      title: 'Attended ML Lecture',
      course: 'ML201 - Machine Learning',
      time: 'Yesterday, 2:00 PM',
      status: 'attended',
      icon: <Video className="w-5 h-5 text-blue-500" />
    },
    {
      id: 3,
      title: 'Grade Updated: Web Development',
      course: 'WD101 - Web Development',
      time: '2 days ago',
      status: 'updated',
      score: 'A- (92%)',
      icon: <Award className="w-5 h-5 text-amber-500" />
    },
    {
      id: 4,
      title: 'Study Group Created',
      course: 'CS201 - Data Structures',
      time: '3 days ago',
      status: 'created',
      icon: <Users className="w-5 h-5 text-purple-500" />
    },
    {
      id: 5,
      title: 'Assignment Reminder',
      course: 'CS101 - Computer Science',
      time: '4 days ago',
      status: 'pending',
      icon: <AlertCircle className="w-5 h-5 text-orange-500" />
    }
  ]


  return (
    <div className="w-full mx-auto md:p-2">


      {/* Header */}
      <div className="flex flex-col justify-between gap-4 mb-8 lg:flex-row lg:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome back, { user[0].value.student?.full_name?.split(' ')[0] || 'Alex'}!</h1>
          <p className="text-gray-600">Here's your academic overview for today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        {/* Left Column - Quick Actions & Recent Activity */}
        <div className="space-y-6 lg:col-span-2">

          {/* Recent Activity */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-600">Your latest academic updates</p>
              </div>
              <Link 
                to="/dashboard/notifications" 
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentActivities.slice(0,10).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-500">{activity.course}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                    </div>
                    {activity.score && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                          {activity.score}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid w-full gap-6">

        {/* Quick Stats */}
        <div className="p-6 text-white bg-linear-to-br from-gray-900 to-gray-800 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-700 rounded-lg">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Quick Stats</h3>
              <p className="text-gray-300">This term performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="mt-1 text-xs text-gray-300">Avg. Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">18</div>
              <div className="mt-1 text-xs text-gray-300">Assignments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="mt-1 text-xs text-gray-300">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="mt-1 text-xs text-gray-300">Active Groups</div>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-gray-700">
            <Link 
              to="/dashboard/grades"
              className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-100"
            >
              View All Statistics
            </Link>
          </div>
        </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Course Performance</h2>
            <p className="text-gray-600">Your academic progress across courses</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-500">Course</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-500">Title</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-500">Grade</th>
                <th className="px-4 py-3 text-sm font-medium text-left text-gray-500">Score</th>
              </tr>
            </thead>
            <tbody>
              {courses[0].additional.map((course) => (
                <tr key={course.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{course.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-700">{course.title}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      GradingFunc(course.score) === 'A' ? 'bg-green-100 text-green-700' :
                      GradingFunc(course.score) === 'A-' ? 'bg-green-50 text-green-600' :
                      GradingFunc(course.score) === 'B+' ? 'bg-blue-100 text-blue-700' :
                      GradingFunc(course.score) === 'B' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {GradingFunc(course.score)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-bold text-gray-900">{course.score}%</div>
                  </td>
                  <td className="px-4 py-4">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pt-6 mt-6 border-t border-gray-200">
          <Link 
            to="/dashboard/grades"
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-blue-600 transition-colors rounded-lg hover:text-blue-700 hover:bg-blue-50"
          >
            View Detailed Academic Report
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Dashboard