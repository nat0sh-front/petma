import styles from "./OrderInfo.module.scss";
import defaultAvatar from "../../assets/images/avatar.png";
import phone from "../../assets/icons/phone.svg";

const OrderInfo = ({ order, driver, distance, price, onCancel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.driverInfo}>
        <div className={styles.header}>
          <img
            className={styles.avatar}
            src={driver.avatar || defaultAvatar}
            alt="Аватарка водителя"
          />
          <div className={styles.driver}>
            <h3 className={styles.title}>{driver.name}</h3>
            <p className={styles.subtitle}>Опытный перевозчик</p>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.car}>
            <p className={styles.title}>{driver.carModel}</p>
            <p className={styles.subtitle}>{driver.carColor}</p>
          </div>
          <p className={styles.title}>{driver.licensePlate}</p>
        </div>
        <button className={styles.phoneButton}>
          <a href={`tel:${driver.phone}`} className={styles.phoneLink}>
            <img
              className={styles.phoneIcon}
              src={phone}
              alt="Иконка телефона"
            />
          </a>
        </button>
      </div>
      <div className={styles.orderInfo}>
        <p className={styles.subtitle}>Откуда:</p>
        <p className={styles.title}>{order.from}</p>
        <p className={styles.subtitle}>Куда:</p>
        <p className={styles.title}>{order.to}</p>
        <p className={styles.subtitle} style={{marginTop:'10px'}}>Цена:</p>
        <p className={styles.price}>{price} ₸</p>
        <button className={styles.cancelButton} onClick={onCancel}>Отменить заказ</button>    
      </div>
    </div>
  );
};

export default OrderInfo;
