import ProjectCard from './ProjectCard'

const flowerBubbles = [
  { dir: 'in', text: 'Здравствуйте! Это «Флёр» 🌷 Нажмите «Открыть магазин», чтобы выбрать букет', time: '10:12' },
  { dir: 'out', text: '🛍 Открыть магазин', time: '10:12' },
  { dir: 'in', text: 'Заказ принят! Букет «Нежность» M, доставка завтра в 14:00. Итого: 4 800 ₽', time: '10:15' },
  { dir: 'in', text: '📸 Фото вашего букета готово. Согласуйте, пожалуйста', time: '13:20' },
]

const shopBubbles = [
  { dir: 'in', text: 'Добро пожаловать в RadiatorPro 🔥 Нажмите «Открыть магазин»', time: '17:35' },
  { dir: 'in', text: 'Итого: 18 200 ₽ (доставка бесплатно от 15 000 ₽)', time: '17:37' },
  { dir: 'out', text: '💳 Оплатить', time: '17:38' },
  { dir: 'in', text: '📦 Заказ 7K9M передан в доставку. Трек-номер: RB123456', time: '09:10' },
]

const assistantBubbles = [
  { dir: 'out', text: 'напомни завтра в 10 про созвон', time: '21:02' },
  { dir: 'in', text: 'Записала ⏰ напомню 25 сентября в 10:00', time: '21:02' },
  { dir: 'out', text: 'а что я тебе писала вчера про отпуск?', time: '21:03' },
  { dir: 'in', text: 'Вчера ты спрашивала про билеты в Сочи на майские ✈️', time: '21:03' },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">портфолио</span>
          <h2>Что уже работает в проде</h2>
          <p>Два магазина с оплатой, доставкой и админкой в самом Telegram, плюс личный ассистент. Всё настоящее, можно открыть и потрогать.</p>
        </div>

        <ProjectCard
          num="01"
          label="магазин · цветы"
          title="«Флёр»: цветочный магазин с витриной в Telegram"
          desc="Покупатель выбирает букет в красивой витрине прямо в чате, оплачивает онлайн и получает фото готового букета на согласование. Флорист управляет всем из Telegram."
          features={[
            'Витрина Mini App: фото, размеры S/M/L, поштучные цветы, допы к заказу',
            'Доставка по расстоянию от точки, слоты времени, оплата ЮKassa',
            'Фото букета на согласование, отзывы и напоминания о важных датах',
            'Админка для флориста: заказы, статистика, чат с клиентом, резервные копии',
          ]}
          stack={['Node.js', 'Telegraf', 'Mini App', 'SQLite', 'ЮKassa API', 'Railway']}
          codeLink="https://github.com/zhennyy/flowerbot"
          phoneName="Флёр"
          bubbles={flowerBubbles}
        />

        <ProjectCard
          reverse
          num="02"
          label="магазин · оборудование"
          title="RadiatorPro: магазин отопительного оборудования"
          desc="Полный цикл покупки в Telegram: витрина, корзина, доставка по городам, оплата и отслеживание заказа. Для владельца есть админка со статистикой, прямо внутри бота."
          features={[
            'Витрина Mini App и большая кнопка «Открыть магазин» в приветствии',
            'Оплата ЮKassa с проверкой платежа, промокоды, бесплатная доставка от суммы',
            'Покупатель видит статус заказа и трек-номер, потом ставит оценку',
            'Админка в Telegram: статистика продаж, чаты с клиентами, тарифы доставки, остатки',
            'AI-подбор товара: Claude предлагает вариант по описанию задачи',
          ]}
          stack={['Node.js', 'Telegraf', 'Express', 'SQLite', 'ЮKassa API', 'Claude API']}
          botLink="https://t.me/RadiatorBZ_bot"
          codeLink="https://github.com/zhennyy/radiatorbot"
          phoneName="RadiatorBZ_bot"
          bubbles={shopBubbles}
        />

        <ProjectCard
          num="03"
          label="личный ассистент"
          title="Персональный ассистент в Telegram"
          desc="Бот-ассистент на базе Claude API: помнит историю переписки, ставит напоминания и работает круглосуточно в облаке, как секретарь, который никогда не спит."
          features={[
            'Диалог с памятью: Claude помнит контекст переписки, а не только последнее сообщение',
            'Напоминания по времени, которые бот сам присылает в чат',
            'Развёрнут на Railway, работает 24/7 и не зависит от чужого компьютера',
          ]}
          stack={['Node.js', 'Telegraf', 'Claude API', 'Railway']}
          codeLink="https://github.com/zhennyy/telegram-assistant-bot"
          phoneName="Ассистент"
          bubbles={assistantBubbles}
        />
      </div>
    </section>
  )
}
