import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, Pause, Gift, Volume2, Volume1, Loader2, ChevronRight } from 'lucide-react';
import { askOpenAI, generateSpeech } from '../lib/ai';
import { useAuth } from '../contexts/AuthContext';
import { db, deductTokens, markLessonComplete } from '../lib/supabase';
import { formatAIResponse } from '../utils/textFormatting';
import TestModal from '../components/TestModal';
import AIChat from '../components/AIChat';
import { useLessonState } from '../hooks/useLessonState';

const LESSON_PROMPT = `Расскажи подробно как будто ты преподаватель и преподаеш урок на тему: Кто такой бизнес-аналитик? Основные роли и обязанности, Ключевые навыки и инструменты, Примеры задач`;

const TOP_QUESTIONS = [
  'Какие основные навыки нужны бизнес-аналитику?',
  'Как стать бизнес-аналитиком с нуля?',
  'Сколько зарабатывает бизнес-аналитик?',
  'Какие инструменты использует бизнес-аналитик?',
  'В чем разница между системным и бизнес-аналитиком?'
];

const Lesson = () => {
  const { user } = useAuth();
  const [loadingQuestions, setLoadingQuestions] = useState<{ [key: string]: boolean }>({});
  const { 
    lessonContent, 
    setLessonContent,
    aiResponse,
    setAiResponse,
    clearLessonState 
  } = useLessonState('1.1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVoiceGenerating, setIsVoiceGenerating] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { tokens } = useAuth();
  const navigate = useNavigate();

  // Redirect to program page if user is not authenticated
  React.useEffect(() => {
    if (!user || !user.email_confirmed_at) {
      if (!user) {
        alert('Для доступа к урокам необходимо войти в систему');
      } else if (!user.email_confirmed_at) {
        alert('Для доступа к урокам необходимо подтвердить email');
      }
      window.location.href = '/program';
    }
  }, [user, navigate]);

  const startButtonRef = useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (startButtonRef.current) {
        startButtonRef.current.classList.add('animate-bounce');
        setTimeout(() => {
          if (startButtonRef.current) {
            startButtonRef.current.classList.remove('animate-bounce');
          }
        }, 1000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const generateLesson = async () => {
    if (tokens < 5) {
      alert('Недостаточно токенов. Стоимость урока: 5 токенов');
      return;
    }

    setIsGenerating(true);
    try {
      const success = await deductTokens(user.uid, 5);

      if (!success) {
        alert('Недостаточно токенов. Стоимость урока: 5 токенов');
        setIsGenerating(false);
        return;
      }

      const response = await askOpenAI(LESSON_PROMPT);
      if (!response.error) {
        setLessonContent(formatAIResponse(response.text));
        setShowStartButton(false);
      }
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudio = async (text: string, isPremium: boolean = false) => {
    if (isPremium && tokens < 45) {
      alert('Недостаточно токенов для премиум озвучки');
      return;
    }

    setIsVoiceGenerating(true);
    try {
      if (isPremium) {
        const cleanText = text.replace(/<[^>]*>/g, '');
        const url = await generateSpeech(cleanText);
        setAudioUrl(url);
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.play();
        setIsPlaying(true);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlaying(false);
        utterance.lang = 'ru-RU';
        speechSynthesis.cancel(); // Stop any previous speech
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsVoiceGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
        } else {
          speechSynthesis.pause();
        }
      } else {
        if (audioRef.current) {
          audioRef.current.play();
        } else {
          speechSynthesis.resume();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleQuestionClick = async (question: string) => {
    setUserPrompt(question);
    setLoadingQuestions(prev => ({ ...prev, [question]: true }));
    if (tokens < 5) {
      alert('Недостаточно токенов. Стоимость вопроса: 5 токенов');
      setLoadingQuestions(prev => ({ ...prev, [question]: false }));
      return;
    }

    try {
      const success = await deductTokens(user.uid, 5);

      if (!success) {
        alert('Недостаточно токенов. Стоимость вопроса: 5 токенов');
        setLoadingQuestions(prev => ({ ...prev, [question]: false }));
        return;
      }

      const response = await askOpenAI(question);
      if (!response.error) {
        setAiResponse(formatAIResponse(response.text));
      }
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setLoadingQuestions(prev => ({ ...prev, [question]: false }));
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const finishLesson = async () => {
    if (user) {
      clearLessonState();
      await markLessonComplete(user.uid, '1.1');
      navigate('/program');
    } else {
      navigate('/program');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-950 via-black to-gray-900 overflow-x-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <Brain className="text-red-500" size={32} />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
                Урок 1.1: Кто такой бизнес-аналитик?
              </h1>
            </div>
            {showStartButton ? (
              <button
                ref={startButtonRef}
                onClick={generateLesson}
                disabled={isGenerating || tokens < 5}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-red-500/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Готовлю урок...</span>
                  </>
                ) : (
                  <span>Начать урок</span>
                )}
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={() => playAudio(lessonContent)}
                  disabled={isVoiceGenerating}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 border border-gray-700 hover:border-gray-600"
                >
                  <Volume1 size={20} />
                  <span>Озвучить бесплатно</span>
                </button>
                <button
                  onClick={() => playAudio(lessonContent, true)}
                  disabled={isVoiceGenerating || tokens < 45}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-red-500/20"
                >
                  <Volume2 size={20} />
                  <span>Премиум озвучка (45 токенов)</span>
                </button>
                {isPlaying && (
                  <button
                    onClick={togglePlayPause}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700 hover:border-gray-600"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                )}
              </div>
            )}
          </div>

          {lessonContent && (
            <div className="space-y-8">
              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-800/50 shadow-lg">
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: lessonContent }} />
              </div>

              <AIChat />

              <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-800/50">
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Популярные вопросы
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TOP_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      disabled={tokens < 5}
                      onClick={() => handleQuestionClick(question)}
                      className="text-left bg-gray-800/50 hover:bg-gray-700/50 disabled:bg-gray-900/50 disabled:cursor-not-allowed p-6 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 shadow-md hover:shadow-lg relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span>{question}</span>
                        {loadingQuestions[question] ? (
                          <Loader2 className="animate-spin text-red-500" size={20} />
                        ) : (
                          <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {tokens < 5 && (
                  <p className="text-red-500 text-sm mt-4 text-center">
                    Недостаточно токенов. Стоимость вопроса: 5 токенов
                  </p>
                )}
              </div>

              {aiResponse && (
                <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-800/50 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-red-500">{userPrompt}</h3>
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: aiResponse }} />
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
                <button
                  onClick={() => setShowTest(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                >
                  Пройти тест
                </button>
                <button
                  onClick={finishLesson}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  Завершить урок
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <TestModal isOpen={showTest} onClose={() => setShowTest(false)} />
    </div>
  );
};

export default Lesson;