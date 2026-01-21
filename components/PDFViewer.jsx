import React, { useState } from 'react';
import { Download, Eye, X, ExternalLink, FileText, Clock, Calendar, FileDown } from 'lucide-react';

const PDFViewer = ({ pdf }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdf.filePath;
    link.download = pdf.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdf.filePath, '_blank');
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'transcript': 'Transcript',
      'grade_report': 'Grade Report',
      'policy': 'Policy Document',
      'calendar': 'Academic Calendar'
    };
    return labels[category] || category;
  };

  return (
    <>
      {/* PDF Card */}
      <div className="relative p-4 transition-all duration-300 bg-white border border-gray-200 group rounded-xl hover:border-blue-300 hover:shadow-md">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start flex-1 gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">{pdf.title}</h4>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{pdf.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {pdf.uploadDate}
                </span>
                <span>•</span>
                <span>{pdf.fileSize}</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded whitespace-nowrap">
            {getCategoryLabel(pdf.category)}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pdf.title}</h3>
                  <p className="text-gray-600">{pdf.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenInNewTab}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 rounded-lg hover:bg-blue-50"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Open</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  title="Download PDF"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 ml-2 rounded-lg hover:bg-gray-100"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="w-full h-full overflow-hidden border border-gray-300 rounded-lg">
                <iframe
                  src={`${pdf.filePath}#view=FitH`}
                  className="w-full h-full min-h-125"
                  title={`PDF viewer for ${pdf.title}`}
                  loading="lazy"
                >
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <FileText className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="mb-4 text-gray-600">Unable to display PDF preview</p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleOpenInNewTab}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Open PDF in New Tab
                      </button>
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Download Instead
                      </button>
                    </div>
                  </div>
                </iframe>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm text-gray-500 border-t">
              <div className="flex items-center gap-4">
                <span>Size: {pdf.fileSize}</span>
                <span>Uploaded: {pdf.uploadDate}</span>
              </div>
              <div className="px-3 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                {getCategoryLabel(pdf.category)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewer;