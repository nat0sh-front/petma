import styles from "./OrderCard.module.scss";
import zootaxi from '../../assets/icons/zootaxi.svg';
import phone from '../../assets/icons/phone.svg';

const OrderCard = ({ order }) => {
function formatFullDateTime(datetimeString) {
  const date = new Date(datetimeString);

  const day = String(date.getDate()).padStart(2, "0");

  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const monthName = months[date.getMonth()];

  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${monthName} ${year}, ${hours}:${minutes}`;
}


  return (
    <div className={styles.orderCard}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img className={styles.zootaxiIcon} src={zootaxi} alt="" />
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Заказ №{order.id}</h3>
            <p className={styles.datetime}>{formatFullDateTime(order.datetime)}</p>
          </div>
        </div>
        <p className={styles.title}>{order.price} ₸</p>
      </div>
      <div className={styles.footer}>
        <p className={styles.fromTo}>{order.from} → {order.to}</p>
        <button className={styles.button}>
          <p className={styles.buttonText}>Поддержка</p>
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
