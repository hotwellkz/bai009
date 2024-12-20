import React from 'react';
import { Mail } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12 text-white">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Публичная оферта
          </h1>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">1. Общие положения</h2>
            <p className="text-white/90 leading-relaxed">
              ИП "VitVix", именуемое в дальнейшем «Продавец», предлагает любому физическому или юридическому лицу (именуемому в дальнейшем «Покупатель») приобрести услуги по предоставлению онлайн-курсов на платформе b-ai.ru на условиях настоящей публичной оферты. Настоящая оферта составлена в соответствии с требованиями законодательства Республики Казахстан, в частности с учетом положений Гражданского кодекса Республики Казахстан, Закона «О защите прав потребителей» и других нормативно-правовых актов.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">2. Предмет договора</h2>
            <p className="text-white/90 leading-relaxed">
              2.1. Продавец обязуется предоставить Покупателю доступ к онлайн-курсу, выбранному на сайте b-ai.ru, после оплаты. 2.2. Услуга считается оказанной с момента предоставления доступа к обучающему материалу Покупателю.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">3. Права и обязанности сторон</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">3.1. Продавец обязуется:</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/90">
                <li>Предоставить Покупателю доступ к онлайн-курсам в течение 24 часов после получения оплаты;</li>
                <li>Обеспечить техническую возможность для использования курса на платформе.</li>
              </ul>
              
              <h3 className="text-xl font-semibold">3.2. Покупатель обязуется:</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/90">
                <li>Оплатить услугу в полном объеме;</li>
                <li>Использовать приобретенные курсы исключительно в личных целях, не нарушая авторских прав Продавца.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">4. Стоимость услуг и порядок расчетов</h2>
            <p className="text-white/90 leading-relaxed">
              4.1. Стоимость онлайн-курсов указана на сайте b-ai.ru и может изменяться Продавцом в одностороннем порядке. Однако, цена, установленная на момент оплаты, является окончательной для конкретной покупки. 4.2. Оплата услуг осуществляется путем перечисления денежных средств на расчетный счет Продавца, указанный на сайте, либо иным способом, указанным на сайте.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">5. Ответственность сторон</h2>
            <p className="text-white/90 leading-relaxed">
              5.1. Продавец несет ответственность за качество предоставляемых услуг в соответствии с законодательством Республики Казахстан. 5.2. Покупатель несет ответственность за правильность данных, предоставленных при регистрации на платформе и при оплате услуг.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">6. Возврат средств</h2>
            <p className="text-white/90 leading-relaxed">
              6.1. Возврат денежных средств возможен только в случаях, предусмотренных Законом Республики Казахстан «О защите прав потребителей». Покупатель имеет право на возврат, если услуга оказана ненадлежащим образом. 6.2. В случае возникновения споров относительно качества услуг, Покупатель может обратиться к Продавцу с письменной претензией. Продавец обязан рассмотреть претензию в течение 10 рабочих дней.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">7. Конфиденциальность и персональные данные</h2>
            <p className="text-white/90 leading-relaxed">
              7.1. Продавец обязуется обеспечить конфиденциальность всех данных Покупателя и использовать их исключительно для исполнения своих обязательств по настоящему договору, в соответствии с Законом Республики Казахстан «О персональных данных и их защите». 7.2. Покупатель дает согласие на обработку своих персональных данных при акцепте данной оферты.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">8. Заключительные положения</h2>
            <p className="text-white/90 leading-relaxed">
              8.1. Все споры и разногласия, возникающие в процессе исполнения договора, разрешаются путем переговоров, а при невозможности урегулирования – в суде, в соответствии с законодательством Республики Казахстан. 8.2. Продавец имеет право вносить изменения в текст данной оферты в одностороннем порядке. Изменения вступают в силу с момента их публикации на сайте b-ai.ru.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-red-500">9. Реквизиты Продавца</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="space-y-2 text-white/90">
                <p>ИП "VitVix"</p>
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

export default Terms;