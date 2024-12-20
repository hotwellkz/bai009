import React from 'react';
import { Brain } from 'lucide-react';
import ProgramModule from '../components/ProgramModule';
import AIChat from '../components/AIChat';
import { useAuth } from '../contexts/AuthContext';

const programData = [
  {
    title: 'Модуль 1: Введение в профессию бизнес-аналитика',
    lessons: [
      {
        title: 'Урок 1.1: Кто такой бизнес-аналитик?',
        content: [
          'Основные роли и обязанности.',
          'Ключевые навыки и инструменты.',
          'Примеры задач.',
          'Тест: Понимание роли бизнес-аналитика.'
        ]
      },
      {
        title: 'Урок 1.2: Жизненный цикл разработки (SDLC)',
        content: [
          'Основные этапы SDLC.',
          'Роль бизнес-аналитика на каждом этапе.',
          'Agile vs. Waterfall.',
          'Тест: Основы SDLC и роль аналитика.'
        ]
      }
    ]
  },
  {
    title: 'Модуль 2: Основы анализа требований',
    lessons: [
      {
        title: 'Урок 2.1: Сбор требований',
        content: [
          'Методы сбора требований (интервью, опросы, мозговые штурмы).',
          'Работа с ключевыми заинтересованными сторонами (stakeholders).',
          'Тест: Методы сбора требований.'
        ]
      },
      {
        title: 'Урок 2.2: Документирование требований',
        content: [
          'Создание BRD (Business Requirements Document).',
          'User stories и Acceptance criteria.',
          'Тест: Форматы и структура требований.'
        ]
      },
      {
        title: 'Урок 2.3: Управление изменениями требований',
        content: [
          'Как отслеживать изменения.',
          'Управление версиями и согласования.',
          'Тест: Управление изменениями требований.'
        ]
      }
    ]
  },
  {
    title: 'Модуль 3: Методы и инструменты анализа',
    lessons: [
      {
        title: 'Урок 3.1: SWOT, PESTEL и другие методы анализа',
        content: [
          'Описание методов.',
          'Примеры применения.',
          'Тест: Методы анализа и их практическое применение.'
        ]
      },
      {
        title: 'Урок 3.2: Моделирование процессов',
        content: [
          'Основы BPMN (Business Process Model and Notation).',
          'Построение диаграмм процессов.',
          'Тест: Понимание BPMN.'
        ]
      },
      {
        title: 'Урок 3.3: Инструменты аналитика',
        content: [
          'Обзор инструментов (Jira, Confluence, MS Visio).',
          'Практика работы с одним из инструментов.',
          'Тест: Навыки работы с инструментами.'
        ]
      }
    ]
  },
  {
    title: 'Модуль 4: Управление проектами',
    lessons: [
      {
        title: 'Урок 4.1: Основы проектного менеджмента',
        content: [
          'Основные понятия (scope, schedule, budget).',
          'Взаимодействие с командой проекта.',
          'Тест: Понимание основ управления проектами.'
        ]
      },
      {
        title: 'Урок 4.2: Agile и Scrum',
        content: [
          'Основы Agile.',
          'Роль бизнес-аналитика в Scrum-команде.',
          'Тест: Основы Agile.'
        ]
      }
    ]
  },
  {
    title: 'Модуль 5: Практическое применение знаний',
    lessons: [
      {
        title: 'Урок 5.1: Кейсы реального мира',
        content: [
          'Работа с примером реального проекта.',
          'Анализ требований и создание документации.',
          'Тест: Кейсы и практика.'
        ]
      },
      {
        title: 'Урок 5.2: Финальный проект',
        content: [
          'Разработка полного набора документации для вымышленного проекта.',
          'Презентация проекта.',
          'Оценка: Завершение проекта.'
        ]
      }
    ]
  }
];

const Program = () => {
  const { user } = useAuth();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Brain className="text-red-500" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Программа курса</h1>
          </div>
          
          <p className="text-gray-400 text-lg mb-12">
            Полная программа обучения, разработанная экспертами и адаптированная под ваш темп с помощью ИИ. 
            Каждый модуль включает теорию, практику и тесты для закрепления материала.
          </p>

          <div className="space-y-6">
            <AIChat />
            
            {programData.map((module, index) => (
              <ProgramModule
                key={index}
                title={module.title}
                lessons={module.lessons}
              />
            ))}
          </div>

          <div className="mt-12 p-6 bg-red-500/10 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Готовы начать обучение?
            </h2>
            {!user ? (
              <p className="text-gray-300 mb-6">
                Зарегистрируйтесь, чтобы начать обучение с поддержкой ИИ-учителя 24/7.
              </p>
            ) : !user.email_confirmed_at ? (
              <p className="text-yellow-500 mb-6">
                Для доступа к урокам необходимо подтвердить email. Проверьте почту или запросите письмо повторно в профиле.
              </p>
            ) : (
              <p className="text-gray-300 mb-6">
                Присоединяйтесь к курсу и станьте востребованным бизнес-аналитиком с поддержкой ИИ-учителя 24/7.
              </p>
            )}
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
              Начать обучение
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;