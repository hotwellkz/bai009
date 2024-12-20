import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 px-4 py-2 rounded-full">
            <Sparkles className="text-red-500" size={20} />
            <span className="text-red-500">Искусственный интеллект в обучении</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Стань востребованным бизнес-аналитиком с персональным{' '}
            <span className="text-red-500">ИИ учителем</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Освойте профессию бизнес-аналитика с поддержкой искусственного интеллекта 24/7. 
            Практические навыки, реальные проекты и персональная адаптация под ваш темп обучения.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/program" className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors text-center">
              Начать обучение
            </Link>
            <Link to="/program" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors text-center">
              Узнать программу
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
              <Brain className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">ИИ адаптация</h3>
              <p className="text-gray-400">Персональная настройка программы под ваш уровень и темп обучения</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
              <Brain className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">24/7 поддержка</h3>
              <p className="text-gray-400">Мгновенные ответы на вопросы от ИИ-ассистента в любое время</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm">
              <Brain className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Практика</h3>
              <p className="text-gray-400">Работа над реальными проектами с анализом от ИИ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;