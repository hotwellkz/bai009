import { useState, useEffect } from 'react';

export function useLessonState(lessonId: string) {
  const [lessonContent, setLessonContent] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(`lesson_${lessonId}`);
    if (savedState) {
      const { content, response } = JSON.parse(savedState);
      setLessonContent(content || '');
      setAiResponse(response || '');
    }
  }, [lessonId]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (lessonContent || aiResponse) {
      localStorage.setItem(`lesson_${lessonId}`, JSON.stringify({
        content: lessonContent,
        response: aiResponse
      }));
    }
  }, [lessonId, lessonContent, aiResponse]);

  const clearLessonState = () => {
    localStorage.removeItem(`lesson_${lessonId}`);
    setLessonContent('');
    setAiResponse('');
  };

  return {
    lessonContent,
    setLessonContent,
    aiResponse,
    setAiResponse,
    clearLessonState
  };
}