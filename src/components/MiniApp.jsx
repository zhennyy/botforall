export default function MiniApp() {
  return (
    <div className="ma-wrap rise" style={{ '--d': '460ms' }} aria-hidden="true">
      <div className="ma">
        <div className="ma-top"><span>Оформление</span><em>×</em></div>
        <div className="ma-prog"><i></i><i></i><i></i><i></i></div>
        <div className="ma-win">
          <div className="ma-tr">
            <div className="ma-sc"><h6>Корзина</h6><div className="ma-opt on">Эфиопия, 250 г</div><div className="ma-opt">Кения, 500 г</div></div>
            <div className="ma-sc"><h6>Доставка</h6><div className="ma-opt on">СДЭК</div><div className="ma-opt">Почта</div></div>
            <div className="ma-sc"><h6>Оплата</h6><div className="ma-opt on">Картой</div><div className="ma-pay">Оплатить</div></div>
            <div className="ma-sc"><div className="ma-done">✓</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
