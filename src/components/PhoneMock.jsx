export default function PhoneMock({ name, bubbles, small, showTyping, badge, floatIn }) {
  return (
    <div className={`phone${small ? ' small' : ''}${floatIn ? ' hero-phone' : ''}`} aria-hidden="true">
      {badge && <div className="float-badge">{badge}</div>}
      <div className="phone-head">
        <div className="phone-avatar" />
        <div>
          <div className="name">{name}</div>
          <div className="status">
            <span className="dot" />
            online
          </div>
        </div>
      </div>
      <div className={`bubbles${small ? ' compact' : ''}`}>
        {bubbles.map((b, i) => (
          <div className={`bubble ${b.dir}`} key={i}>
            {b.text}
            <span className="time">{b.time}</span>
          </div>
        ))}
        {showTyping && (
          <div className="typing">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>
    </div>
  )
}
