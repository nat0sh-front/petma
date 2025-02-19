import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.scss'
import logo from '../../assets/icons/logo.svg'


const LoginForm = () => {
  return (
    <div className={styles.loginForm}>
        <img className={styles.logo} src={logo} alt="Логотип Petma" />
        <div className={styles.form}>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Логин</h4>
                <input className={styles.input} type="text" id="email" placeholder="username" />
            </div>
            <div className={styles.inputWrapper}>
                <h4 className={styles.label}>Пароль</h4>
                <input className={styles.input} type="password" id="password" placeholder="********" />
            </div>
            <button className={styles.button} type="submit"><Link to={"/"}>Войти</Link></button>
        </div>
        <hr/>
        <p className={styles.registerText}>У вас еще нет аккаунта?  <Link className={styles.link} to={"/register"}>Зарегистрируйтесь</Link></p>
    </div>
  )
}

export default LoginForm