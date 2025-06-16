import React, { useState, useContext } from 'react';
import { ChapterContext } from '../context/ChapterContext';

export default function ChapterEditor() {
  const { chapters, setChapters } = useContext(ChapterContext);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const addChapter = () => {
    if (start < end) {
      setChapters([...chapters, { id: Date.now(), title, start, end }]);
      setTitle(''); setStart(0); setEnd(0);
    }
  };

  const exportJson = () => {
    const data = JSON.stringify(chapters, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'chapters.json'; a.click();
  };

  const importJson = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => setChapters(JSON.parse(evt.target.result));
      reader.readAsText(file);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Define Chapter
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Chapter Title</label>
          <input
            placeholder="Enter chapter title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Start Time (seconds)</label>
          <input
            type="number"
            placeholder="0"
            value={start}
            onChange={e => setStart(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
          {start > 0 && (
            <div className="text-xs text-gray-500">{formatTime(start)}</div>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">End Time (seconds)</label>
          <input
            type="number"
            placeholder="0"
            value={end}
            onChange={e => setEnd(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
          {end > 0 && (
            <div className="text-xs text-gray-500">{formatTime(end)}</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={addChapter}
          disabled={!title || start >= end}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Chapter
        </button>
        
        <button
          onClick={exportJson}
          disabled={chapters.length === 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export JSON ({chapters.length})
        </button>
        
        <div className="relative">
          <input
            type="file"
            accept="application/json"
            onChange={importJson}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="import-file"
          />
          <label
            htmlFor="import-file"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            Import JSON
          </label>
        </div>
      </div>

      {start >= end && start > 0 && end > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            End time must be greater than start time
          </div>
        </div>
      )}
    </div>
  );
}