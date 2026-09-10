import ProjectCard from './ProjectCard'

const shopBubbles = [
  { dir: 'in', text: 'Спасибо за заказ! 🔥', time: '17:37' },
  { dir: 'in', text: 'Итого: 18 200 ₽', time: '17:37' },
  { dir: 'in', text: 'Ссылка для оплаты заказа 7K9M:', time: '17:37' },
  { dir: 'out', text: '💳 Оплатить', time: '17:38' },
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
          <h2>Что уже собрано</h2>
          <p>Персональный ассистент для себя и полноценный магазин, который можно поставить готовым клиенту хоть завтра.</p>
        </div>

        <ProjectCard
          num="01"
          label="интернет-магазин"
          title="RadiatorPro: магазин отопительного оборудования"
          desc="Полный цикл покупки прямо в Telegram: каталог, корзина, доставка по городам, оплата и веб-админка для владельца."
          features={[
            'Каталог, корзина и оформление заказа с доставкой по городам',
            'Приём оплаты через ЮKassa с подтверждением по вебхуку',
            'AI-подбор товара: Claude предлагает вариант по описанию задачи',
            'Веб-админка: заказы, товары, промокоды, доставка, аналитика, CSV-выгрузка',
          ]}
          stack={['Node.js', 'Telegraf', 'Express', 'SQLite', 'ЮKassa API', 'Claude API']}
          botLink="https://t.me/RadiatorBZ_bot"
          codeLink="https://github.com/zhennyy/radiatorbot"
          phoneName="RadiatorBZ_bot"
          bubbles={shopBubbles}
        />

        <ProjectCard
          reverse
          num="02"
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
