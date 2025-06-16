import React, { createContext, useState, useEffect } from 'react';

export const ChapterContext = createContext();

export function ChapterProvider({ children }) {
  const [audioSrc, setAudioSrc] = useState(null);
  const [chapters, setChapters] = useState(() => {
    const saved = localStorage.getItem('chapters');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentChapter, setCurrentChapter] = useState(null);
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  return (
    <ChapterContext.Provider
      value={{ audioSrc, setAudioSrc, chapters, setChapters, currentChapter, setCurrentChapter, progress, setProgress }}>
      {children}
    </ChapterContext.Provider>
  );
}
