import React, { useEffect } from 'react'; 
import styles from './ZootaxiWaiting.module.scss';
import loader from '../../assets/icons/loader.svg'; 

const ZootaxiWaiting = ({ onFinish }) => {
    useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 10000); // 10 секунд

    return () => clearTimeout(timer); // очищаем при размонтировании
  }, [onFinish]);

  return (
    <div className={styles.waiting}>
      <h3 className={styles.title}>
        Ваш водитель скоро свяжется с вами <br />
        для подтверждения заказа.
      </h3>
      <p className={styles.subtitle}>
        Обычно это занимает не более 10 минут. <br />
        Если звонка не будет — мы вам поможем.
      </p>
      <img
        className={styles.loader}
        width={50}
        height={50}
        src={loader}
        alt="Индикатор загрузки"
      />
    </div>
  );
};

export default ZootaxiWaiting;
