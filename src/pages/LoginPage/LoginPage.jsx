import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.overlay}></div>
      <LoginForm />
    </div>
  );
};

export default LoginPage