export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <div className="contact-box">
          <div>
            <h2>Нужен свой бот в Telegram?</h2>
            <p>Магазин, ассистент, бронирование, заявки: опишите задачу, ответим и прикинем сроки.</p>
          </div>
          <div>
            <div className="composer">
              <span>Написать: zhennyy@gmail.com</span>
              <a className="send" href="mailto:zhennyy@gmail.com?subject=Хочу%20бота%20в%20Telegram" aria-label="Написать письмо">
                ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
