import { Link } from 'react-router-dom';
import './Product.css';

function Product(props) {
  const today = new Date();
  const uploadedDate = new Date(props.product.createdAt);
  let timeGap = today.getTime() - uploadedDate.getTime();

  const sec = 1000;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  
  let date;
  if (timeGap < min) {
    date = timeGap / sec;
    date = date.toFixed(0);
    date = date + '초';
  } else if (timeGap < hour) {
    date = timeGap / min; 
    date = date.toFixed(0);
    date = date + '분';
  } else if (timeGap < day) {
    date = timeGap / hour;
    date = date.toFixed(0);
    date = date + '시간';
  } else if (timeGap < week) {
    date = timeGap / day;
    date = date.toFixed(0);
    date = date + '일';
  } else if (timeGap < month) {
    date = timeGap / week;
    date = date.toFixed(0)
    date = date + '주';
  } 

  return (
    <div className="product">
      <Link to={'/detail/' + props.product.id}>
        <div className='product-image-wrapper'>
          {
            props.product.imagePath ? 
            <img className="product-image" src={props.product.imagePath} alt="product" /> :
            "이미지가 없어요."
          }
        </div>
        <h3 className="product-title">{props.product.title}</h3>
        <h2 className="product-price">{Number(props.product.price).toLocaleString()}원</h2>
        <div className="product-subinfo">
          <h4 className="product-user">{props.product.userName}</h4>
          <span className="product-date">{date} 전</span>
        </div>
      </Link>
    </div>
  )
}

export default Product;