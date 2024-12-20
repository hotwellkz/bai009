import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const plans = [
  {
    name: 'AI Старт',
    price: '3,250',
    tokens: 100,
    description: 'Достаточно для знакомства с платформой и изучения основ бизнес-анализа',
    gradient: 'from-blue-500 to-purple-500',
    buttonGradient: 'from-blue-500 via-purple-500 to-purple-600',
    features: ['100 токенов', 'Доступ к базовым урокам', 'Поддержка ИИ-ассистента', 'Базовые тесты']
  },
  {
    name: 'AI Прорыв',
    price: '5,500',
    tokens: 300,
    description: 'Оптимальный набор для полноценного изучения бизнес-анализа с помощью ИИ',
    gradient: 'from-blue-600 to-purple-600',
    buttonGradient: 'from-blue-600 via-purple-600 to-purple-700',
    popular: true,
    features: [
      '300 токенов',
      'Полный доступ к урокам',
      'Расширенная поддержка ИИ',
      'Все тесты и практические задания',
      'Премиум озвучка уроков'
    ]
  },
  {
    name: 'AI Эксперт',
    price: '12,250',
    tokens: 1000,
    description: 'Максимальный набор для полного курса и будущих обновлений',
    gradient: 'from-purple-500 to-pink-500',
    buttonGradient: 'from-purple-500 via-pink-500 to-pink-600',
    features: [
      '1000 токенов',
      'Пожизненный доступ ко всем урокам',
      'Приоритетная поддержка ИИ 24/7',
      'Все текущие и будущие материалы',
      'Премиум озвучка уроков',
      'Персональные рекомендации от ИИ'
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePurchase = (tokens: number) => {
    if (!user) {
      navigate('/auth');
    } else {
      // Here you would implement payment processing
      console.log(`Purchase ${tokens} tokens`);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-950 via-black to-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="text-red-500" size={20} />
            <span className="text-red-500">Тарифные планы</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Выберите подходящий тарифный план
          </h1>
          <p className="text-xl text-gray-400">
            Начните обучение с персональным ИИ-учителем уже сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-800 transition-transform duration-300 hover:scale-105 ${
                plan.popular ? 'transform scale-105 lg:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный выбор
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-2xl text-gray-400">₸</span>
                  </div>
                  <p className="mt-2 text-gray-400">{plan.description}</p>
                </div>

                <button
                  onClick={() => handlePurchase(plan.tokens)}
                  className={`w-full bg-gradient-to-r ${plan.buttonGradient} hover:opacity-90 text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/20`}
                >
                  Начать обучение
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-gray-400 mb-8">
            Наш ИИ-ассистент готов ответить на все ваши вопросы о тарифах и обучении
          </p>
          <button 
            onClick={() => navigate('/program')}
            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
          >
            Задать вопрос ИИ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;