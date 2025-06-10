import { useState } from "react";
import ZootaxiForm from "../ZootaxiForm/ZootaxiForm";
import styles from "./Zootaxi.module.scss";
import { useNavigate } from "react-router-dom";

const Zootaxi = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.zootaxi}>
      {success ? (
        <div className={styles.successMessage}>
          <h3 className={styles.title}>Спасибо! Ваша заявка принята.</h3>
          <p className={styles.subtitle}>
            Оператор свяжется с вами для подтверждения поездки.
          </p>
          <button className={styles.button} onClick={() => navigate("/zootaxi/history")}>Просмотреть историю заявок</button>
        </div>
      ) : (
        <ZootaxiForm onSuccess={() => setSuccess(true)} />
      )}
    </div>
  );
};

export default Zootaxi;
