import React, { useEffect, useRef, useContext, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { ChapterContext } from '../context/ChapterContext';

export default function AudioPlayer() {
  const { audioSrc, currentChapter, progress, setProgress } = useContext(ChapterContext);
  const audioRef = useRef();
  const waveRef = useRef();
  const wavesurfer = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (waveRef.current && audioSrc) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
      
      wavesurfer.current = WaveSurfer.create({
        container: waveRef.current,
        waveColor: '#e0e7ff',
        progressColor: '#4f46e5',
        cursorColor: '#6366f1',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 80,
        normalize: true,
        backend: 'WebAudio',
        mediaControls: false
      });
      
      wavesurfer.current.load(audioSrc);
      
      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current.getDuration());
      });
      
      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current.getCurrentTime());
      });
    }
    
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current && currentChapter) {
      audioRef.current.currentTime = currentChapter.start;
      audioRef.current.play();
      setIsPlaying(true);
      
      if (wavesurfer.current) {
        wavesurfer.current.seekTo(currentChapter.start / wavesurfer.current.getDuration());
      }
    }
  }, [currentChapter]);

  const handleTimeUpdate = () => {
    const chap = currentChapter;
    if (!chap) return;
    const t = audioRef.current.currentTime;
    setCurrentTime(t);
    
    if (t >= chap.end) {
      audioRef.current.pause();
      setIsPlaying(false);
      setProgress(prev => ({ ...prev, [chap.id]: t }));
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (wavesurfer.current) wavesurfer.current.pause();
      } else {
        audioRef.current.play();
        if (wavesurfer.current) wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!currentChapter || !duration) return 0;
    const chapterDuration = currentChapter.end - currentChapter.start;
    const chapterProgress = Math.max(0, currentTime - currentChapter.start);
    return Math.min(100, (chapterProgress / chapterDuration) * 100);
  };

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343a9 9 0 000 12.728M9.172 9.172a5 5 0 000 5.656" />
        </svg>
        Audio Player
        {currentChapter && (
          <span className="text-sm font-normal text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Playing: {currentChapter.title}
          </span>
        )}
      </h2>

      {!audioSrc ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343a9 9 0 000 12.728M9.172 9.172a5 5 0 000 5.656" />
          </svg>
          <p className="text-gray-500 text-lg">No audio loaded</p>
          <p className="text-gray-400 text-sm mt-1">Upload an audio file to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100">
            <div ref={waveRef} className="mb-2" />
            {currentChapter && (
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                disabled={!audioSrc}
                className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4v16h4V4H6zM14 4v16h4V4h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="text-sm text-gray-600 font-mono">
                <span className="text-indigo-600 font-semibold">{formatTime(currentTime)}</span>
                <span className="mx-2">/</span>
                <span>{formatTime(currentChapter ? currentChapter.end : duration)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142" />
              </svg>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-xs text-gray-500 w-8 text-right">{volume}%</span>
            </div>
          </div>
          {currentChapter && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{currentChapter.title}</h3>
                  <p className="text-sm text-gray-600">
                    {formatTime(currentChapter.start)} - {formatTime(currentChapter.end)} 
                    <span className="mx-2">•</span>
                    Duration: {formatTime(currentChapter.end - currentChapter.start)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-indigo-600">
                    {getProgressPercentage().toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
            </div>
          )}
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            className="hidden"
          />
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}