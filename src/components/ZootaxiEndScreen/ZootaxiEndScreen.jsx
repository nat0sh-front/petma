import styles from './ZootaxiEndScreen.module.scss';

const ZootaxiEndScreen = ({ onFinish }) => {
  return (
    <div className={styles.endScreen}>
        <h2 className={styles.title}>Спасибо, что выбрали нас!</h2>
        <p className={styles.subtitle}>
            Мы надеемся, что ваш опыт был приятным.<br /> Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нашей службой поддержки.
        </p>
        <button className={styles.button} onClick={onFinish}>
            Начать заново
        </button>
    </div>
  )
}

export default ZootaxiEndScreen