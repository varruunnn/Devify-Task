import React, { useContext, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { ChapterContext } from '../context/ChapterContext';

export default function ChapterList() {
  const { chapters, audioSrc, setCurrentChapter } = useContext(ChapterContext);
  const waveRefs = useRef({});  
  const waves = useRef({});

  const playChapter = ch => {
    setCurrentChapter(ch);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (duration) => {
    if (duration < 60) {
      return `${duration.toFixed(1)}s`;
    }
    const mins = Math.floor(duration / 60);
    const secs = Math.floor(duration % 60);
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        Chapters
        {chapters.length > 0 && (
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {chapters.length} chapter{chapters.length !== 1 ? 's' : ''}
          </span>
        )}
      </h2>
      
      {chapters.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <p className="text-gray-500 text-lg">No chapters defined yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first chapter to get started</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {chapters.map((ch, index) => (
            <li key={ch.id} className="group border border-gray-200 hover:border-indigo-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-gray-800 text-lg truncate group-hover:text-indigo-700 transition-colors">
                      {ch.title || `Chapter ${index + 1}`}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 ml-11">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatTime(ch.start)} - {formatTime(ch.end)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{formatDuration(ch.end - ch.start)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => playChapter(ch)}
                  className="flex-shrink-0 ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}