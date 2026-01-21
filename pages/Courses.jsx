import React, { useState, useRef, useEffect } from 'react'
import { 
  FileText, Users, Info, User, Bell, CheckCircle, XCircle, 
  BarChart3, Video, Calendar, BookOpen, Search, Clock, 
  ChevronDown, ChevronUp, Check, Upload, Menu, X,
  Download, Eye, Send, Paperclip, ExternalLink
} from 'lucide-react'
import { courses } from '../src/assets/assets'

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [showCourseDropdown, setShowCourseDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileName, setFileName] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  
  const courseDropdownRef = useRef(null)
  const mobileSidebarRef = useRef(null)
  const fileInputRef = useRef(null)

  // PDF file paths for course materials
  const courseFiles = {
    lecture1: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    week1Slides: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    assignment1: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    syllabus: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf"
  };

  // PDF file paths for assignments
  const assignmentFiles = {
    binarySearch: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    sortingAlgorithms: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    linkedList: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf",
    algorithmQuiz: "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf"
  };

  // Function to handle file download
  const handleDownloadFile = (fileName, filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName || 'course_file.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle file preview (opens in new tab)
  const handlePreviewFile = (filePath) => {
    window.open(filePath, '_blank');
  };

  // Function to handle file selection for upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  // Function to handle file upload
  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    if (!fileName.trim()) {
      alert('Please enter a file name');
      return;
    }

    // Create a mock uploaded file object
    const newFile = {
      id: uploadedFiles.length + 1,
      name: fileName || selectedFile.name,
      type: selectedFile.type.split('/').pop() || 'file',
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
      description: fileDescription,
      studentName: 'You',
      status: 'submitted'
    };

    // Add to uploaded files
    setUploadedFiles(prev => [newFile, ...prev]);
    
    // Reset form
    setFileName('');
    setFileDescription('');
    setSelectedFile(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    alert('File submitted successfully!');
  };

  // Function to trigger file input click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Mock courses data
  const tabs = [
    { id: 'info', label: 'Course Info', icon: <Info className="w-4 h-4" /> },
    { id: 'files', label: 'Files & Notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckCircle className="w-4 h-4" /> },
  ]
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
        setShowCourseDropdown(false)
      }
      if (mobileSidebarRef.current && !mobileSidebarRef.current.contains(event.target) && 
          !event.target.closest('[data-mobile-toggle]')) {
        setShowMobileSidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter courses based on search
  const filteredCourses = courses[0].additional.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCourseSelect = (course) => {
    setSelectedCourse(course)
    setActiveTab('info')
    setShowCourseDropdown(false)
    setShowMobileSidebar(false)
    setSearchTerm('')
  }

  // Mock data for selected course with assignment file paths
  const courseDetails = selectedCourse ? {
    ...selectedCourse,
    files: [
      { 
        id: 1, 
        name: 'Lecture 1 - Introduction.pdf', 
        type: 'pdf', 
        size: '2.4 MB', 
        date: '2024-11-15',
        downloadName: 'Lecture_1_Introduction.pdf',
        previewPath: courseFiles.lecture1,
        downloadPath: courseFiles.lecture1
      },
      { 
        id: 2, 
        name: 'Week 1 Slides.pptx', 
        type: 'ppt', 
        size: '3.1 MB', 
        date: '2024-11-16',
        downloadName: 'Week_1_Slides.pptx',
        previewPath: courseFiles.week1Slides,
        downloadPath: courseFiles.week1Slides
      },
      { 
        id: 3, 
        name: 'Reading Assignment 1.docx', 
        type: 'doc', 
        size: '1.2 MB', 
        date: '2024-11-18',
        downloadName: 'Reading_Assignment_1.docx',
        previewPath: courseFiles.assignment1,
        downloadPath: courseFiles.assignment1
      },
      { 
        id: 4, 
        name: 'Course Syllabus.pdf', 
        type: 'pdf', 
        size: '0.8 MB', 
        date: '2024-11-14',
        downloadName: 'Data_Structures_Syllabus.pdf',
        previewPath: courseFiles.syllabus,
        downloadPath: courseFiles.syllabus
      }
    ],
    assignments: [
      { 
        id: 1, 
        title: 'Binary Search Implementation', 
        due: '2024-12-10', 
        status: 'pending', 
        points: 100,
        description: 'Implement binary search algorithm with test cases',
        downloadName: 'Binary_Search_Assignment.pdf',
        previewPath: assignmentFiles.binarySearch,
        downloadPath: assignmentFiles.binarySearch,
        instructions: 'Complete the binary search implementation with edge cases'
      },
      { 
        id: 2, 
        title: 'Sorting Algorithms Analysis', 
        due: '2024-12-17', 
        status: 'pending', 
        points: 150,
        description: 'Compare time complexity of different sorting algorithms',
        downloadName: 'Sorting_Algorithms_Analysis.pdf',
        previewPath: assignmentFiles.sortingAlgorithms,
        downloadPath: assignmentFiles.sortingAlgorithms,
        instructions: 'Analyze and compare bubble sort, merge sort, and quick sort'
      },
      { 
        id: 3, 
        title: 'Linked List Project', 
        due: '2024-12-03', 
        status: 'submitted', 
        points: 200,
        description: 'Implement singly linked list with various operations',
        downloadName: 'Linked_List_Project.pdf',
        previewPath: assignmentFiles.linkedList,
        downloadPath: assignmentFiles.linkedList,
        instructions: 'Create a linked list with insert, delete, and search functions'
      },
      { 
        id: 4, 
        title: 'Algorithm Complexity Quiz', 
        due: '2024-11-30', 
        status: 'completed', 
        points: 50,
        description: 'Time and space complexity assessment',
        downloadName: 'Algorithm_Complexity_Quiz.pdf',
        previewPath: assignmentFiles.algorithmQuiz,
        downloadPath: assignmentFiles.algorithmQuiz,
        instructions: 'Complete the quiz on algorithm complexity analysis'
      }
    ],
    announcements: [
      { id: 1, title: 'Office Hours Changed', content: 'Office hours moved to Wednesday 3-5 PM', date: '2024-11-22', urgent: true },
      { id: 2, title: 'Extra Credit Opportunity', content: 'Complete optional project for +10%', date: '2024-11-20', urgent: false },
      { id: 3, title: 'Textbook Update', content: 'New edition available in library', date: '2024-11-18', urgent: false }
    ],
    instructors: [
      { id: 1, name: 'Prof. Michael Chen', role: 'Lead Instructor', email: 'mchen@university.edu', office: 'Room 304, CS Building', hours: 'Tue/Thu 1-3 PM' },
      { id: 2, name: 'Dr. Lisa Wang', role: 'Teaching Assistant', email: 'lwang@university.edu', office: 'Room 210, CS Building', hours: 'Mon/Wed 10-12 PM' }
    ]
  } : null

  // Function to view assignment details
  const viewAssignmentDetails = (assignment) => {
    alert(`Assignment Details:\n\nTitle: ${assignment.title}\nDue: ${assignment.due}\nPoints: ${assignment.points}\nStatus: ${assignment.status}\n\nInstructions:\n${assignment.instructions}`);
  };

  // Function to submit assignment
  const submitAssignment = (assignmentId) => {
    // Trigger file input for assignment submission
    const assignmentFileInput = document.createElement('input');
    assignmentFileInput.type = 'file';
    assignmentFileInput.accept = '.pdf,.doc,.docx,.zip';
    assignmentFileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Assignment "${courseDetails.assignments.find(a => a.id === assignmentId).title}" submitted successfully!\n\nFile: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB`);
      }
    };
    assignmentFileInput.click();
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    if (!courseDetails) return null

    switch (activeTab) {
      case 'files':
        return (
          <div className="space-y-6">
            {/* Course Files Grid - Original Card Styling */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-gray-900">Course Materials</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courseDetails.files.map((file) => (
                  <div key={file.id} className="p-5 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group rounded-xl hover:border-blue-300 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-sm font-semibold text-gray-800 truncate">{file.name}</h4>
                          <p className="text-xs text-gray-500">{file.type.toUpperCase()} • {file.size}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Uploaded: {file.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <button 
                        onClick={() => handlePreviewFile(file.previewPath)}
                        className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button 
                        onClick={() => handleDownloadFile(file.downloadName, file.downloadPath)}
                        className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Upload Section */}
            <div className="p-6 border border-gray-200 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Submit Your Work</h3>
                  <p className="text-sm text-gray-600">Upload assignments, notes, or other course materials</p>
                </div>
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              
              {/* File Selection */}
              <div className="mb-6">
                <div 
                  onClick={handleBrowseClick}
                  className="p-8 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                >
                  <Paperclip className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <p className="mb-2 text-gray-600">
                    {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to select a file'}
                  </p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, PPT, ZIP, TXT (Max 25MB)</p>
                  <button className="px-6 py-2 mt-4 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                    Browse Files
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.txt"
                />
              </div>

              {/* File Details Form */}
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    File Name *
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Enter a descriptive name for your file"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    value={fileDescription}
                    onChange={(e) => setFileDescription(e.target.value)}
                    placeholder="Add a brief description of your submission..."
                    rows="3"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile || !fileName.trim()}
                className={`flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white rounded-lg transition-colors ${
                  !selectedFile || !fileName.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                <Send className="w-5 h-5" />
                Submit File
              </button>
            </div>

            {/* Submitted Files Section */}
            {uploadedFiles.length > 0 && (
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Your Submitted Files</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">File Name</th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type</th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Size</th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {uploadedFiles.map((file) => (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            </div>
                            {file.description && (
                              <p className="mt-1 text-xs text-gray-500">{file.description}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{file.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{file.size}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{file.date}</td>
                          <td className="px-4 py-3">
                            <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              {file.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
              <h4 className="mb-2 font-semibold text-blue-800">File Guidelines:</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Preview: View files in browser without downloading</span>
                </li>
                <li className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download: Save course materials to your device</span>
                </li>
                <li className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Submit: Upload your assignments and notes for review</span>
                </li>
                <li className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>Maximum file size: 25MB per upload</span>
                </li>
              </ul>
            </div>
          </div>
        )

      case 'assignments':
        return (
          <div className="space-y-6">
            {/* Assignments List with Download/Preview */}
            <div className="space-y-4">
              {courseDetails.assignments.map((assignment) => (
                <div key={assignment.id} className="p-5 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        assignment.status === 'completed' ? 'bg-green-100' :
                        assignment.status === 'submitted' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {assignment.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : assignment.status === 'submitted' ? (
                          <Clock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 text-lg font-semibold text-gray-900">{assignment.title}</h4>
                        <p className="mb-2 text-sm text-gray-500">{assignment.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {assignment.due}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                            {assignment.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                        assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Assignment File Actions */}
                  <div className="p-4 mb-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Assignment File</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handlePreviewFile(assignment.previewPath)}
                          className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                          Preview
                        </button>
                        <button 
                          onClick={() => handleDownloadFile(assignment.downloadName, assignment.downloadPath)}
                          className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Instructions:</strong> {assignment.instructions}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => viewAssignmentDetails(assignment)}
                      className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </button>
                    <button 
                      onClick={() => submitAssignment(assignment.id)}
                      className={`flex-1 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg flex items-center justify-center gap-2 ${
                        assignment.status === 'completed' || assignment.status === 'submitted'
                          ? 'bg-gray-500 hover:bg-gray-600'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      {assignment.status === 'pending' ? 'Submit Assignment' : 
                       assignment.status === 'submitted' ? 'Resubmit' : 'Completed'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Assignment Instructions Section */}
            <div className="p-6 border border-blue-200 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">How to Submit Assignments</h3>
                  <p className="text-sm text-gray-600">Follow these steps to complete and submit your work</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">1. Download Assignment</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Click the "Download" button to get the assignment file with instructions and requirements.
                  </p>
                </div>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">2. Preview Instructions</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Use the "Preview" button to view assignment details directly in your browser.
                  </p>
                </div>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">3. Complete Your Work</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Work on the assignment following the provided instructions and requirements.
                  </p>
                </div>
                
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Upload className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">4. Submit Your Work</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Click "Submit Assignment" to upload your completed work before the deadline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'info':
        return (
          <div className="space-y-6">
            {/* Course Information - Original Card Styling */}
            <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Course Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Course Code</span>
                  <span className="font-semibold text-gray-900">{courseDetails.code}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Credits</span>
                  <span className="font-semibold text-gray-900">{courseDetails.credits}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Semester</span>
                  <span className="font-semibold text-gray-900">{courseDetails.semester}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Schedule</span>
                  <span className="font-semibold text-gray-900">{courseDetails.schedule}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium text-gray-600">Classroom</span>
                  <span className="font-semibold text-gray-900">Room 304, CS Building</span>
                </div>
              </div>
            </div>

            {/* Instructors - Original Card Styling */}
            <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-lg">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Instructors & TAs</h3>
              <div className="space-y-4">
                {courseDetails.instructors.map((instructor) => (
                  <div key={instructor.id} className="p-4 transition-all duration-300 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 text-lg font-semibold text-gray-900">{instructor.name}</h4>
                        <p className="mb-3 text-sm text-gray-600">{instructor.role}</p>
                        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                          <p className="text-gray-500">📧 {instructor.email}</p>
                          <p className="text-gray-500">🏢 {instructor.office}</p>
                          <p className="text-gray-500 md:col-span-2">⏰ Office Hours: {instructor.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex w-full h-full">
      {/* Mobile Toggle Button */}
      <button
        data-mobile-toggle
        onClick={() => setShowMobileSidebar(true)}
        className="fixed z-30 p-2 bg-white border border-gray-300 rounded-lg shadow-md top-4 left-4 lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" />
      )}

      {/* Sidebar - Visible on Desktop, Hidden on Mobile */}
      <div 
        ref={mobileSidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 lg:relative lg:transform-none lg:z-0 ${
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="font-bold text-gray-900">Courses</h2>
          <button
            onClick={() => setShowMobileSidebar(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="h-full p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">All Courses</h2>
            <span className="text-sm text-gray-500">{courses.length} total</span>
          </div>

          {/* Search Input */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Course List */}
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseSelect(course)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedCourse?.id === course.id
                    ? 'bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{course.id}</span>
                  {course.enrolled && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      Enrolled
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 truncate">{course.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{course.instructor}</span>
                  {course.progress > 0 && (
                    <span className="text-xs font-medium text-blue-600">{course.progress}%</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <div className="md:px-2">
          {/* Top Navigation Bar */}
          <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-center">
            {/* Header */}
            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">My Courses</h1>
              <p className="text-gray-600">Manage your courses, assignments, and learning materials</p>
            </div>

            {/* Course Selection Dropdown for Mobile/Desktop */}
            <div className="relative" ref={courseDropdownRef}>
              <button
                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 transition-all bg-white border border-gray-300 rounded-lg md:w-auto hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {selectedCourse ? (
                    <>
                      <span className="font-semibold text-gray-900">{selectedCourse.id}</span>
                      <span className="text-gray-600 truncate">: {selectedCourse.title}</span>
                    </>
                  ) : (
                    <span className="text-gray-500">Select a course</span>
                  )}
                </div>
                {showCourseDropdown ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                )}
              </button>

              {showCourseDropdown && (
                <div className="absolute left-0 right-0 z-50 mt-1 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                  <div className="p-3 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-64">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseSelect(course)}
                          className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                            selectedCourse?.id === course.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{course.id}</span>
                              {course.enrolled && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                  Enrolled
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{course.title}</p>
                          </div>
                          {selectedCourse?.id === course.id && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        No courses found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 overflow-x-auto border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => (selectedCourse && setActiveTab(tab.id))}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    !selectedCourse? 'text-gray-300':
                    activeTab  === tab.id
                      ? 'border-blue-500 text-blue-600 border-b-2'
                      : 'border-transparent border-b-2 text-black-500 hover:text-gray-700'
                  } `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content - Course Details */}
          <div>
            {selectedCourse ? (
              <>
                {/* Tab Content */}
                <div className="min-h-100">
                  {renderTabContent()}
                </div>
              </>
            ) : (
              /* Empty State - No Course Selected */
              <div className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-linear-to-br from-blue-100 to-indigo-100 rounded-2xl">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">Select a Course</h3>
                <p className="max-w-md mx-auto mb-8 text-gray-600">
                  Choose a course from the sidebar or dropdown to view materials, assignments, announcements, and more.
                </p>
                <div className="grid max-w-2xl grid-cols-1 gap-4 mx-auto md:grid-cols-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium text-gray-900">Files & Notes</p>
                    <p className="text-sm text-gray-500">Access course materials</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="font-medium text-gray-900">Assignments</p>
                    <p className="text-sm text-gray-500">Submit and track work</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses

