import styles from "./OrderCard.module.scss";
import zootaxi from "../../assets/icons/zootaxi.svg";
import phone from "../../assets/icons/phone.svg";

const OrderCard = ({ order }) => {
  function formatFullDateTime(datetimeString) {
    const date = new Date(datetimeString);

    const day = String(date.getDate()).padStart(2, "0");

    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const monthName = months[date.getMonth()];

    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${monthName} ${year}, ${hours}:${minutes}`;
  }

  return (
    <div className={styles.orderCard}>
      <div className={styles.сontent}>
        <div className={styles.wrapper}>
          <img className={styles.zootaxiIcon} src={zootaxi} alt="" />
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Заявка №{order.id}</h3>
            <p className={styles.datetime}>
              {formatFullDateTime(order.datetime)}
            </p>
            <p className={styles.fromTo}>
              {order.from} → {order.to}
            </p>
          </div>
        </div>
        <button className={styles.button}>Поддержка</button>
      </div>
    </div>
  );
};

export default OrderCard;
