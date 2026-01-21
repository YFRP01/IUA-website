import React, { useState } from 'react';
import { FileText, Download, Search, Filter } from 'lucide-react';
import PDFViewer from './PDFViewer';

const PDFResourcesSection = ({ pdfs, title = "Academic Documents", description = "Access and download your academic files" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(pdfs.map(pdf => pdf.category))];

  // Filter PDFs based on search and category
  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pdf.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pdf.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category) => {
    const labels = {
      'transcript': 'Transcript',
      'grade_report': 'Grade Report',
      'policy': 'Policy',
      'calendar': 'Calendar',
      'all': 'All Documents'
    };
    return labels[category] || category;
  };

  const handleBatchDownload = () => {
    // Create a zip file or download all PDFs individually
    alert('Batch download feature would be implemented here. For now, download files individually.');
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl">
      {/* Header */}
      <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <button
          onClick={handleBatchDownload}
          className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2 pb-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center gap-2">
                {category === 'all' && <Filter className="w-3 h-3" />}
                {getCategoryLabel(category)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PDF Grid */}
      {filteredPdfs.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPdfs.map(pdf => (
            <PDFViewer key={pdf.id} pdf={pdf} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center border-2 border-gray-300 border-dashed rounded-xl">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h4 className="mb-2 text-lg font-semibold text-gray-700">No documents found</h4>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between pt-6 mt-6 text-sm text-gray-600 border-t border-gray-200">
        <span>Showing {filteredPdfs.length} of {pdfs.length} documents</span>
        <span className="font-medium text-blue-600">
          {pdfs.filter(p => p.category === 'transcript').length} transcripts available
        </span>
      </div>
    </div>
  );
};

export default PDFResourcesSection;