import React from 'react';
import { Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Политика конфиденциальности
          </h1>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">1. Определения</h2>
            <p className="text-white/90 leading-relaxed">
              Интернет проект <span className="text-white font-medium">b-ai.ru</span> (далее – URL, «мы») серьезно относится к вопросу конфиденциальности информации своих клиентов и посетителей сайта <span className="text-white font-medium">b-ai.ru</span> (далее – «вы», «посетители сайта»). Персонифицированной мы называем информацию, содержащую персональные данные (например: ФИО, логин или название компании) посетителя сайта, а также информацию о действиях, совершаемых вами на сайте URL (например: заказ посетителя сайта с его контактной информацией). Анонимными мы называем данные, которые невозможно однозначно идентифицировать с конкретным посетителем сайта (например: статистика посещаемости сайта).
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">2. Использование информации</h2>
            <p className="text-white/90 leading-relaxed">
              Мы используем персонифицированную информацию конкретного посетителя сайта исключительно для обеспечения ему качественного оказания услуг и их учета. Мы не раскрываем персонифицированных данных одних посетителей сайта URL другим посетителям сайта. Мы никогда не публикуем персонифицированную информацию в открытом доступе и не передаем ее третьим лицам. Исключением являются лишь ситуации, когда предоставление такой информации уполномоченным государственным органам предписано действующим законодательством Республики Казахстан. Мы публикуем и распространяем только отчеты, построенные на основании собранных анонимных данных. При этом отчеты не содержат информацию, по которой было бы возможным идентифицировать персонифицированные данные пользователей услуг. Мы также используем анонимные данные для внутреннего анализа, целью которого является развитие продуктов и услуг URL.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">3. Ссылки</h2>
            <p className="text-white/90 leading-relaxed">
              Сайт <span className="text-white font-medium">b-ai.ru</span> может содержать ссылки на другие сайты, не имеющие отношения к нашей компании и принадлежащие третьим лицам. Мы не несем ответственности за точность, полноту и достоверность сведений, размещенных на сайтах третьих лиц, и не берем на себя никаких обязательств по сохранению конфиденциальности информации, оставленной вами на таких сайтах.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">4. Ограничение ответственности</h2>
            <p className="text-white/90 leading-relaxed">
              Мы делаем все возможное для соблюдения настоящей политики конфиденциальности, однако, мы не можем гарантировать сохранность информации в случае воздействия факторов находящихся вне нашего влияния, результатом действия которых станет раскрытие информации. Сайт <span className="text-white font-medium">b-ai.ru</span> и вся размещенная на нем информация представлены по принципу "как есть" без каких-либо гарантий. Мы не несем ответственности за неблагоприятные последствия, а также за любые убытки, причиненные вследствие ограничения доступа к сайту URL или вследствие посещения сайта и использования размещенной на нем информации.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">5. Контакты</h2>
            <p className="text-white/90 leading-relaxed">
              По вопросам, касающимся настоящей политики, просьба обращаться по адресу{' '}
              <a href="mailto:b-ai@gmail.com" className="text-red-500 hover:text-red-400 transition-colors">
                b-ai@gmail.com
              </a>
            </p>

            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4 mt-8">
              <h3 className="text-xl font-semibold">Юридическое лицо</h3>
              <div className="space-y-2 text-white/90">
                <p>ИП "Vitvix"</p>
                <p>БИН: 840713302106</p>
                <p>Банковские реквизиты: АО "Банк ЦентрКредит" КОД 19, ИИК KZ738562204140586741, KCJBKZKX</p>
                <div className="flex items-center space-x-2">
                  <Mail className="text-red-500" size={20} />
                  <a href="mailto:b-ai@gmail.com" className="text-red-500 hover:text-red-400 transition-colors">
                    b-ai@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;