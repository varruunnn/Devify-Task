import React, { useContext } from 'react';
import { ChapterContext } from '../context/ChapterContext';

export default function AudioUploader() {
  const { setAudioSrc, setChapters, setCurrentChapter } = useContext(ChapterContext);

  const handleUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setChapters([]);
      setCurrentChapter(null);
    }
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        Upload Audio
      </h2>
      
      <div className="relative">
        <input
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="mt-2 text-xs text-gray-400">
          Supported formats: MP3, WAV, M4A, OGG
        </div>
      </div>
    </div>
  );
}