import './AlarmItem.css'

function AlarmItem(props) {
  return (
    <li className="alarm-item">
      <span className="alarm-date">14분 전</span>
      <span className="alarm-title">한승규님이 구매요청했어요!</span>
      <div className="alarm-product">
        <div className="alarm-image">

        </div>
        <div className="alarm-product-content">
          <span className="alarm-product-title">
            먹다 남은 까불이 팔아요
          </span>
          <span className="alarm-product-price">
            912,800,000원
          </span>
          <span className="alarm-product-date">
            1년 전
          </span>
        </div>
      </div>
    </li>
  )
}

export default AlarmItem;