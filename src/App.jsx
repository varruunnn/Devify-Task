import React from 'react';
import AudioUploader from './components/AudioUploader';
import ChapterEditor from './components/ChapterEditor';
import ChapterList from './components/ChapterList';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Audiobook Chapter Player
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              Upload, organize, and play your audiobooks with precision chapter navigation
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-20 left-10 w-16 h-16 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full font-semibold text-sm">
                1
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Upload Audio</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 hidden sm:block max-w-16"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full font-semibold text-sm">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Define Chapters</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 hidden sm:block max-w-16"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-semibold text-sm">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">Play & Navigate</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <div className="transform hover:scale-[1.02] transition-transform duration-200">
              <AudioUploader />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform duration-200">
              <ChapterEditor />
            </div>
          </div>
          <div className="space-y-8">
            <div className="transform hover:scale-[1.02] transition-transform duration-200">
              <ChapterList />
            </div>
          </div>
        </div>
        <div className="transform hover:scale-[1.01] transition-transform duration-200">
          <AudioPlayer />
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Built with React & WaveSurfer.js
            </p>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center text-xs text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Upload Audio Files
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Define Chapters
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Navigate Seamlessly
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}