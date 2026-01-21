import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import { results, semesters, user } from '../src/assets/assets'
import { CheckCircle, TrendingUp, TrendingDown, Award, Download, Filter, BarChart3, Eye } from 'lucide-react'
import GradeFunc from '../components/GradeFunc'

const Grades = () => {
  const [selectedSemester, setSelectedSemester] = useState(0)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [selectedGrade,setGrade] = useState(3.41);
  
  // PDF file path - adjust this path as needed
  const transcriptPDF = "/pdfs/transcripts/Alex_David_Semester_1_Transcript_IUA_University-2.pdf";
  
  // Function to handle PDF download
  const handleDownloadPDF = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = transcriptPDF;
    link.download = 'Alex_David_Semester_1_Transcript.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Function to handle PDF preview (opens in new tab)
  const handlePreviewPDF = () => {
    window.open(transcriptPDF, '_blank');
  };
  
  const calculateGPA = (coursesMAp) => {
    var temp = 0;
    coursesMAp.map((course) => {
      temp = temp + course.score;
    })
    return ((temp / coursesMAp.length)/25).toFixed(2);
  }

  
  // Grade color based on score
  const getGradeColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeIcon = (score) => {
    if (score >= 90) return <Award className="w-4 h-4" />;
    if (score >= 80) return <TrendingUp className="w-4 h-4" />;
    if (score >= 60) return <CheckCircle className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div className='w-full mx-auto'>
      <PageTitle title='Academic Performance' subtitle="Track your grades and progress" />
      {/* Header Section */}
      <div className='flex flex-col justify-between gap-4 mb-2 md:flex-row md:items-center'>
        
        {/* Action Buttons */}
        <div className='flex items-center justify-end w-full gap-3 px-2'>
          <div className="relative group">
            <button 
              onClick={handleDownloadPDF}
              className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
            >
              <Download className='w-4 h-4' />
              Export Transcript
            </button>
            {/* Dropdown for download options */}
            <div className="absolute right-0 hidden w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full group-hover:block">
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center w-full gap-2 px-4 py-3 text-left hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                <div>
                  <p className="text-sm font-medium">Download PDF</p>
                  <p className="text-xs text-gray-500">Save to your device</p>
                </div>
              </button>
              <button 
                onClick={handlePreviewPDF}
                className="flex items-center w-full gap-2 px-4 py-3 text-left border-t hover:bg-gray-50"
              >
                <Eye className="w-4 h-4" />
                <div>
                  <p className="text-sm font-medium">Preview</p>
                  <p className="text-xs text-gray-500">View in browser</p>
                </div>
              </button>
            </div>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className='items-center hidden gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg xl:flex hover:bg-gray-50'
          >
            <Filter className='w-4 h-4' />
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Student Info Card */}
      <div className='mb-8'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Student Profile Card */}
          <div className='p-6 lg:p-4 w-full border border-blue-100 /*bg-gradient-to-br from-blue-50 to-indigo-50*/ rounded-xl'>
            <h3 className='mb-4 text-lg font-semibold text-gray-800'>Student Profile</h3>
            <div className='space-y-4'>
              {user.map((u) => (
                <div key={u.label} className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-600 lg:text-xs'>{u.label}</span>
                  <span className='text-sm font-semibold text-gray-800'>{u.value}</span>
                </div>
              ))}
              <div className='pt-4 border-t border-blue-200'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-600'>Current GPA</span>
                  <span className='text-lg font-bold text-blue-600'>{selectedGrade ? selectedGrade : '_ _' }</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className='p-4 bg-white border border-gray-200 shadow-sm md:col-span-2 rounded-xl'>
            <div className='flex items-center justify-between mb-2 md:mb-6'>
              <h3 className='text-lg font-semibold text-gray-800'>Semester Overview</h3>
              <div className='flex items-center gap-2'>
                <BarChart3 className='w-5 h-5 text-gray-400' />
                <span className='text-sm text-gray-600'>Performance Trends</span>
              </div>
            </div>
            
            <div className='grid flex-wrap grid-cols-2 gap-4 mb-6 lg:grid-cols-4 md:grid-cols-3 justify-cente md:justify-start'>
              {semesters.map((sem) => (
                <button
                  key={sem.id}
                  onClick={() => (setSelectedSemester(sem.id), setGrade(calculateGPA(results[sem.id].data)))}
                  className={`flex flex-col items-center w-full justify-center px-4 py-3 rounded-lg border transition-all ${
                    selectedSemester === sem.id
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className='text-sm font-medium'>Semester {sem.id + 1}</span>
                  <span className='mt-1 text-lg font-bold'>{calculateGPA(results[sem.id].data)}</span>
                  <span className='text-xs text-gray-500'>GPA</span>
                </button>
              ))}
            </div>

            
          </div>
        </div>
      </div>

      {/* Grades Grid/List */}
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-gray-800'>
            Course Grades
          </h3>
          <div className='text-sm text-gray-500'>
            Showing {results[selectedSemester].data.length} courses
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {results[selectedSemester].data.map((res) => {
              const gradeColor = getGradeColor(14);
              return (
                <div 
                  key={res.id} 
                  className='p-5 transition-all duration-300 bg-white border border-gray-200 cursor-pointer group rounded-xl hover:border-blue-300 hover:shadow-lg'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h4 className='mb-1 text-sm font-semibold text-gray-800'>{res.title}</h4>
                      <span className='text-xs text-gray-500'>Course Code: {res.code || 'CS101'}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${gradeColor} flex items-center gap-1`}>
                      {getGradeIcon(res.score)}
                      <span className='font-bold'>{res.score}%</span>
                    </div>
                  </div>
                  
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>Credit Hours: {res.credits || 3}</span>
                    <span>Grade: { GradeFunc(res.score) }</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className='mt-4'>
                    <div className='flex justify-between mb-1 text-xs text-gray-500'>
                      <span>Progress</span>
                      <span>{res.score}%</span>
                    </div>
                    <div className='h-2 overflow-hidden bg-gray-200 rounded-full'>
                      <div 
                        className={`h-full rounded-full ${
                          res.score >= 90 ? 'bg-emerald-500' :
                          res.score >= 80 ? 'bg-green-500' :
                          res.score >= 70 ? 'bg-amber-500' :
                          res.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${res.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className='overflow-hidden bg-white border border-gray-200 rounded-xl'>
            <table className='w-full'>
              <thead className='border-b border-gray-200 bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Course</th>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Code</th>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Credits</th>
                  <th className='py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase px6'>Score</th>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Grade</th>
                  <th className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {results.map((res) => {
                  const gradeColor = getGradeColor(res.score);
                  return (
                    <tr key={res.id} className='transition-colors hover:bg-gray-50'>
                      <td className='px-6 py-4 text-sm font-medium text-gray-900'>{res.title}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{res.code || 'CS101'}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{res.credits || 3}</td>
                      <td className='px-6 py-4'>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${gradeColor} font-bold`}>
                          {res.score}%
                        </div>
                      </td>
                      <td className='px-6 py-4 text-sm font-semibold text-gray-700'>{ GradeFunc(res.score)}</td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-2'>
                          {getGradeIcon(res.score)}
                          <span className='text-xs text-gray-600'>
                            {res.score >= 70 ? 'Passed' : 'Needs Improvement'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Final Score Card */}
      <div className='w-full p-6 text-white shadow-lg bg-linear-to-r from-blue-500 to-indigo-600 rounded-xl'>
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
          <div>
            <h3 className='mb-2 text-xl font-bold'>Overall Performance</h3>
            <p className='text-blue-100'>Average score across all courses</p>
          </div>
          <div className='flex items-center gap-6 mt-4 overflow-x-auto md:mt-0'>
            <div className='text-center'>
              <div className='text-4xl font-bold'>{selectedGrade*25}%</div>
              <div className='mt-1 text-sm text-blue-200'>Average Score</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold'>3.45</div>
              <div className='mt-1 text-sm text-blue-200'>Cumulative GPA</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl font-bold'>
                {results[selectedSemester].data.filter(r => r.score >= 60).length}/{results[selectedSemester].data.length}
              </div>
              <div className='mt-1 text-sm text-blue-200'>Courses Passed</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Grades
