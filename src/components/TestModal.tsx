import React, { useState } from 'react';
import { X, ChevronRight, Award } from 'lucide-react';

const questions = [
  {
    question: 'Какова основная роль бизнес-аналитика?',
    options: [
      'Разработка программного обеспечения',
      'Анализ и оптимизация бизнес-процессов',
      'Управление персоналом',
      'Продажи продуктов'
    ],
    correct: 1
  },
  {
    question: 'Какой навык НЕ является ключевым для бизнес-аналитика?',
    options: [
      'Аналитическое мышление',
      'Коммуникативные навыки',
      'Программирование на C++',
      'Документирование требований'
    ],
    correct: 2
  },
  {
    question: 'Что из перечисленного является инструментом бизнес-аналитика?',
    options: [
      'Photoshop',
      'JIRA',
      'AutoCAD',
      'Final Cut Pro'
    ],
    correct: 1
  }
];

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correct ? 1 : 0);
      }, 0);
      setScore((correctAnswers / questions.length) * 10);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full mx-4 animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {showResult ? (
          <div className="text-center">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-4">Ваш результат</h2>
            <div className="text-6xl font-bold text-yellow-500 mb-6">
              {score.toFixed(1)}/10
            </div>
            <button
              onClick={resetTest}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              Пройти тест заново
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Вопрос {currentQuestion + 1} из {questions.length}</h2>
                <span className="text-gray-400">
                  {Math.round((currentQuestion / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl mb-6">{questions[currentQuestion].question}</h3>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition-colors flex justify-between items-center group"
                >
                  <span>{option}</span>
                  <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestModal;